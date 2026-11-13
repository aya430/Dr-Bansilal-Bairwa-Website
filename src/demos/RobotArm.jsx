import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, RotateCcw, Move3d } from 'lucide-react';

/*
 * 4-DOF articulated arm (base yaw + shoulder + elbow + wrist pitch) with a simple gripper.
 * Forward kinematics (base frame, metres):
 *   r = L2·cos(θ2) + L3·cos(θ2+θ3) + L4·cos(θ2+θ3+θ4)
 *   z = L1 + L2·sin(θ2) + L3·sin(θ2+θ3) + L4·sin(θ2+θ3+θ4)
 *   x = r·cos(θ1),  y = r·sin(θ1)
 */
const L = { L1: 0.32, L2: 0.42, L3: 0.36, L4: 0.14 };
const rad = (d) => (d * Math.PI) / 180;
const JOINTS = [
  { k: 'q1', label: 'θ1 Base yaw', min: -180, max: 180 },
  { k: 'q2', label: 'θ2 Shoulder', min: -10, max: 170 },
  { k: 'q3', label: 'θ3 Elbow', min: -150, max: 150 },
  { k: 'q4', label: 'θ4 Wrist pitch', min: -120, max: 120 },
];
const PRESETS = {
  Home: { q1: 0, q2: 90, q3: -90, q4: 0, g: 30 },
  Reach: { q1: 35, q2: 30, q3: -20, q4: -10, g: 60 },
  Pick: { q1: -50, q2: 20, q3: -70, q4: -40, g: 10 },
  Overhead: { q1: 90, q2: 110, q3: -40, q4: 20, g: 40 },
};

function fk({ q1, q2, q3, q4 }) {
  const a = rad(q2), b = rad(q2 + q3), c = rad(q2 + q3 + q4);
  const r = L.L2 * Math.cos(a) + L.L3 * Math.cos(b) + L.L4 * Math.cos(c);
  const z = L.L1 + L.L2 * Math.sin(a) + L.L3 * Math.sin(b) + L.L4 * Math.sin(c);
  return { x: r * Math.cos(rad(q1)), y: r * Math.sin(rad(q1)), z, pitch: q2 + q3 + q4 };
}

export default function RobotArm() {
  const mount = useRef(null);
  const api = useRef({});
  const [q, setQ] = useState(PRESETS.Home);
  const [anim, setAnim] = useState(false);
  const qRef = useRef(q);
  qRef.current = q;

  useEffect(() => {
    const el = mount.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 50);
    camera.position.set(1.5, 1.1, 1.5);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.45, 0); controls.enableDamping = true; controls.minDistance = 0.8; controls.maxDistance = 4.5;

    scene.add(new THREE.HemisphereLight(0xbfd9ff, 0x0b1220, 1.1));
    const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(2, 3, 1.5); scene.add(dl);
    const grid = new THREE.GridHelper(3, 30, 0x2b3c5c, 0x1a2740); scene.add(grid);

    const mat = (c, m = 0.35, r = 0.4) => new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r });
    const navy = mat(0x1e3a8a), blue = mat(0x2563eb), cyan = mat(0x06b6d4, 0.2, 0.3), steel = mat(0x94a3b8, 0.7, 0.3);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.08, 40), navy); base.position.y = 0.04; scene.add(base);
    const yaw = new THREE.Group(); yaw.position.y = 0.08; scene.add(yaw);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, L.L1 - 0.08, 32), blue); col.position.y = (L.L1 - 0.08) / 2; yaw.add(col);
    const sh = new THREE.Group(); sh.position.y = L.L1 - 0.08; yaw.add(sh);
    const joint = (r) => { const j = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.12, 32), cyan); j.rotation.x = Math.PI / 2; return j; };
    sh.add(joint(0.075));
    const link = (len, w) => { const g = new THREE.Mesh(new THREE.BoxGeometry(len, w, w * 0.8), blue); g.position.x = len / 2; return g; };
    sh.add(link(L.L2, 0.075));
    const el2 = new THREE.Group(); el2.position.x = L.L2; sh.add(el2); el2.add(joint(0.06)); el2.add(link(L.L3, 0.06));
    const wr = new THREE.Group(); wr.position.x = L.L3; el2.add(wr); wr.add(joint(0.045));
    const hand = new THREE.Mesh(new THREE.BoxGeometry(L.L4 * 0.6, 0.05, 0.08), steel); hand.position.x = L.L4 * 0.3; wr.add(hand);
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.012, 0.03), steel), f2 = f1.clone(); wr.add(f1); wr.add(f2);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })); tip.position.x = L.L4; wr.add(tip);

    // trail of end-effector
    const trailN = 120, trailPos = new Float32Array(trailN * 3);
    const trailGeo = new THREE.BufferGeometry(); trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3)); trailGeo.setDrawRange(0, 0);
    scene.add(new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 })));
    let trailCount = 0;

    const apply = (s) => {
      yaw.rotation.y = rad(s.q1); sh.rotation.z = rad(s.q2); el2.rotation.z = rad(s.q3); wr.rotation.z = rad(s.q4);
      const open = 0.012 + (s.g / 100) * 0.04;
      f1.position.set(L.L4 * 0.75, 0, open); f2.position.set(L.L4 * 0.75, 0, -open);
    };
    const pushTrail = () => {
      const v = new THREE.Vector3(); tip.getWorldPosition(v);
      trailPos.copyWithin(0, 3); if (trailCount < trailN) trailCount++;
      trailPos.set([v.x, v.y, v.z], (trailN - 1) * 3);
      trailGeo.setDrawRange(trailN - trailCount, trailCount); trailGeo.attributes.position.needsUpdate = true;
    };

    const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    let raf, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      apply(qRef.current); scene.updateMatrixWorld(); pushTrail();
      controls.update(); renderer.render(scene, camera);
    };
    loop();
    api.current.clearTrail = () => { trailCount = 0; trailGeo.setDrawRange(0, 0); };

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); controls.dispose();
      scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) [].concat(o.material).forEach((m) => m.dispose()); });
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);

  // trajectory animation: cubic (smoothstep) interpolation through the presets
  useEffect(() => {
    if (!anim) return;
    const seq = ['Home', 'Reach', 'Pick', 'Overhead', 'Home'].map((k) => PRESETS[k]);
    const T = 1600; let start, raf;
    const step = (t) => {
      if (!start) start = t;
      const e = (t - start) / T, seg = Math.floor(e);
      if (seg >= seq.length - 1) { setQ(seq[seq.length - 1]); setAnim(false); return; }
      const s = e - seg, w = s * s * (3 - 2 * s), A = seq[seg], B = seq[seg + 1];
      setQ(Object.fromEntries(Object.keys(A).map((k) => [k, A[k] + (B[k] - A[k]) * w])));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [anim]);

  const p = useMemo(() => fk(q), [q]);

  return (
    <div className="demo-grid">
      <div>
        {JOINTS.map((j) => (
          <div className="ctrl" key={j.k}>
            <div className="ctrl-head"><label htmlFor={`ra-${j.k}`}>{j.label}</label><output htmlFor={`ra-${j.k}`}>{Math.round(q[j.k])}°</output></div>
            <input id={`ra-${j.k}`} type="range" min={j.min} max={j.max} value={q[j.k]} disabled={anim} onChange={(e) => setQ({ ...q, [j.k]: +e.target.value })} />
          </div>
        ))}
        <div className="ctrl">
          <div className="ctrl-head"><label htmlFor="ra-g">Gripper opening</label><output htmlFor="ra-g">{Math.round(q.g)} %</output></div>
          <input id="ra-g" type="range" min="0" max="100" value={q.g} disabled={anim} onChange={(e) => setQ({ ...q, g: +e.target.value })} />
        </div>
        <div className="seg" role="group" aria-label="Pose presets" style={{ marginBottom: 10 }}>
          {Object.keys(PRESETS).map((k) => <button key={k} className="filter-chip" disabled={anim} onClick={() => setQ(PRESETS[k])}>{k}</button>)}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={() => { api.current.clearTrail?.(); setAnim(true); }} disabled={anim}><Play size={14} /> Run trajectory</button>
          <button className="btn btn-ghost btn-sm" onClick={() => api.current.clearTrail?.()}><RotateCcw size={14} /> Clear trail</button>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12, minWidth: 0 }}>
        <div className="canvas-3d" ref={mount} role="img" aria-label={`3D robot arm. End-effector at x ${p.x.toFixed(2)}, y ${p.y.toFixed(2)}, z ${p.z.toFixed(2)} metres`}>
          <span className="canvas-hint"><Move3d size={14} /> Drag to orbit · scroll or pinch to zoom</span>
        </div>
        <div className="readout" aria-live="polite">
          <div><b>{p.x.toFixed(3)} m</b><span>End-effector x</span></div>
          <div><b>{p.y.toFixed(3)} m</b><span>End-effector y</span></div>
          <div><b>{p.z.toFixed(3)} m</b><span>End-effector z</span></div>
          <div><b>{Math.round(p.pitch)}°</b><span>Tool pitch</span></div>
          <div><b>{Math.hypot(p.x, p.y).toFixed(3)} m</b><span>Horizontal reach</span></div>
        </div>
        <p className="demo-note">Links: L1 = {L.L1} m, L2 = {L.L2} m, L3 = {L.L3} m, L4 = {L.L4} m. Position follows the closed-form forward kinematics shown in the code; the yellow trail traces the end-effector path.</p>
      </div>
    </div>
  );
}
