import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

/*
 * First-order Thevenin equivalent-circuit model of a Li-ion cell:
 *   Vt = OCV(SOC) − I·R0 − V1,   dV1/dt = −V1/(R1·C1) + I/C1,   dSOC/dt = −I/(3600·Q)
 * Discharge current is positive. Illustrative NMC-like OCV curve (not fitted to a specific cell).
 */
const OCV = (s) => 3.2 + 0.7 * s - 0.45 * s * s + 0.75 * s * s * s - 0.35 * Math.exp(-20 * s);
const VMIN = 2.8;

function current(profile, t, crate, Q) {
  const I = crate * Q;
  if (profile === 'cc') return I;
  if (profile === 'pulse') return t % 90 < 30 ? I : 0; // 30 s pulse, 60 s rest
  // synthetic urban-style drive profile (A), regen as negative current
  const c = t % 60;
  if (c < 10) return 2.0 * I;
  if (c < 30) return 0.6 * I;
  if (c < 38) return -0.8 * I;
  if (c < 48) return 0;
  return 1.2 * I;
}

function simulate({ Q, R0, R1, C1, soc0, crate, profile }) {
  const tau = R1 * C1, a = Math.exp(-1 / tau);
  let soc = soc0, v1 = 0, t = 0, Wh = 0, heat = 0, vmin = 9;
  const tMax = profile === 'cc' ? (3600 * soc0) / crate + 120 : 3600;
  const out = [];
  const every = Math.max(1, Math.round(tMax / 360));
  while (t < tMax) {
    const I = current(profile, t, crate, Q);
    v1 = v1 * a + R1 * (1 - a) * I;
    soc = Math.min(1, soc - I / (3600 * Q));
    const vt = OCV(Math.max(soc, 0)) - I * R0 - v1;
    Wh += (vt * I) / 3600; heat += (I * I * R0 + (v1 * v1) / R1) / 3600; vmin = Math.min(vmin, vt);
    if (t % every === 0) out.push({ t, I, soc, vt, ocv: OCV(Math.max(soc, 0)) });
    if (soc <= 0 || vt < VMIN) { out.push({ t, I, soc: Math.max(soc, 0), vt, ocv: OCV(Math.max(soc, 0)) }); break; }
    t += 1;
  }
  return { out, Wh, heat, vmin, tEnd: t, socEnd: Math.max(soc, 0), cutoff: soc <= 0 || vmin < VMIN };
}

function Plot({ data, k, k2, yMin, yMax, label, unit, cursor, color = '#2563eb', step }) {
  const W = 560, H = 170, p = { l: 42, r: 12, t: 14, b: 26 };
  const tMax = data[data.length - 1]?.t || 1;
  const X = (t) => p.l + ((W - p.l - p.r) * t) / tMax;
  const Y = (v) => p.t + (H - p.t - p.b) * (1 - (v - yMin) / (yMax - yMin));
  const path = (key) => data.map((d, i) => `${i ? 'L' : 'M'}${X(d.t).toFixed(1)},${Y(d[key]).toFixed(1)}`).join('');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => yMin + f * (yMax - yMin));
  const c = cursor != null ? data[Math.min(cursor, data.length - 1)] : null;
  return (
    <svg className="plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {ticks.map((v) => (
        <g key={v}><line className="gridl" x1={p.l} x2={W - p.r} y1={Y(v)} y2={Y(v)} /><text x={p.l - 6} y={Y(v) + 4} textAnchor="end">{v.toFixed(step ?? 1)}</text></g>
      ))}
      <text x={W - p.r} y={H - 8} textAnchor="end">time (min) · {Math.round(tMax / 60)} min</text>
      <text x={p.l} y={H - 8}>0</text>
      <text x={p.l + 4} y={p.t + 10} style={{ fontWeight: 700, fill: 'var(--text-strong)' }}>{label} ({unit})</text>
      {k2 && <path d={path(k2)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />}
      <path d={path(k)} fill="none" stroke={color} strokeWidth="2.2" />
      {c && (<g><line x1={X(c.t)} x2={X(c.t)} y1={p.t} y2={H - p.b} stroke="var(--accent-2)" strokeWidth="1.5" /><circle cx={X(c.t)} cy={Y(c[k])} r="4.5" fill={color} stroke="#fff" strokeWidth="1.5" /></g>)}
    </svg>
  );
}

function Circuit({ I, R0, R1, C1, vt, soc }) {
  return (
    <svg viewBox="0 0 560 120" className="plot" role="img" aria-label="Thevenin equivalent circuit">
      <g stroke="var(--text-strong)" strokeWidth="2" fill="none">
        <circle cx="50" cy="60" r="20" /><path d="M50 40V20h80M50 80v20h470V80" />
        <path d="M130 20l6-8 8 16 8-16 8 16 8-16 6 8h30" />
        <path d="M232 20h28v-12h70v12h40M260 20v14h70V20" />
        <path d="M268 8l6-6 8 12 8-12 8 12 8-12 6 6M280 34v10m30-10v10M276 44h8m22 0h8" />
        <path d="M370 20h150v20" />
      </g>
      <text x="50" y="64" textAnchor="middle" style={{ fontWeight: 700, fill: 'var(--text-strong)' }}>OCV</text>
      <text x="168" y="44" textAnchor="middle">R0 = {(R0 * 1000).toFixed(0)} mΩ</text>
      <text x="295" y="64" textAnchor="middle">R1 = {(R1 * 1000).toFixed(0)} mΩ · C1 = {C1} F</text>
      <text x="520" y="58" textAnchor="middle" style={{ fontWeight: 700, fill: 'var(--accent-text)' }}>Vt</text>
      <text x="520" y="74" textAnchor="middle" style={{ fill: 'var(--text-strong)' }}>{vt.toFixed(3)} V</text>
      <text x="80" y="114">I = {I.toFixed(2)} A {I < 0 ? '(charging / regen)' : I > 0 ? '(discharge)' : '(rest)'} · SOC = {(soc * 100).toFixed(1)} %</text>
    </svg>
  );
}

export default function BatterySim() {
  const [Q, setQ] = useState(2.6);
  const [R0m, setR0] = useState(40);
  const [R1m, setR1] = useState(20);
  const [C1, setC1] = useState(2000);
  const [soc0, setSoc0] = useState(100);
  const [crate, setCrate] = useState(1);
  const [profile, setProfile] = useState('cc');
  const [cursor, setCursor] = useState(null);
  const [playing, setPlaying] = useState(false);
  const raf = useRef();

  const sim = useMemo(() => simulate({ Q, R0: R0m / 1000, R1: R1m / 1000, C1, soc0: soc0 / 100, crate, profile }), [Q, R0m, R1m, C1, soc0, crate, profile]);
  useEffect(() => { setCursor(null); setPlaying(false); }, [sim]);
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const step = (t) => {
      if (t - last > 16) { last = t; setCursor((c) => { const n = (c ?? 0) + 1; if (n >= sim.out.length) { setPlaying(false); return sim.out.length - 1; } return n; }); }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, sim]);

  const cur = sim.out[cursor ?? sim.out.length - 1];
  const S = (label, val, set, min, max, stp, unit) => (
    <div className="ctrl">
      <div className="ctrl-head"><label htmlFor={`b-${label}`}>{label}</label><output htmlFor={`b-${label}`}>{val} {unit}</output></div>
      <input id={`b-${label}`} type="range" min={min} max={max} step={stp} value={val} onChange={(e) => set(+e.target.value)} />
    </div>
  );

  return (
    <div className="demo-grid">
      <div>
        <div className="ctrl">
          <div className="ctrl-head"><span>Load profile</span></div>
          <div className="seg" role="group" aria-label="Load profile">
            {[['cc', 'Constant current'], ['pulse', 'Pulse (HPPC-style)'], ['drive', 'Drive cycle']].map(([k, l]) => (
              <button key={k} className="filter-chip" aria-pressed={profile === k} onClick={() => setProfile(k)}>{l}</button>
            ))}
          </div>
        </div>
        {S('C-rate', crate, setCrate, 0.2, 3, 0.1, 'C')}
        {S('Capacity Q', Q, setQ, 1, 5, 0.1, 'Ah')}
        {S('R0 (ohmic)', R0m, setR0, 5, 120, 1, 'mΩ')}
        {S('R1 (polarisation)', R1m, setR1, 5, 80, 1, 'mΩ')}
        {S('C1', C1, setC1, 200, 6000, 100, 'F')}
        {S('Initial SOC', soc0, setSoc0, 20, 100, 5, '%')}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => { if (cursor != null && cursor >= sim.out.length - 1) setCursor(0); setPlaying((p) => !p); }}>{playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Animate</>}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setPlaying(false); setCursor(null); }}><RotateCcw size={14} /> Reset</button>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12, minWidth: 0 }}>
        <Circuit I={cur.I} R0={R0m / 1000} R1={R1m / 1000} C1={C1} vt={cur.vt} soc={cur.soc} />
        <Plot data={sim.out} k="vt" k2="ocv" yMin={2.6} yMax={4.3} label="Terminal voltage vs OCV" unit="V" cursor={cursor} step={2} />
        <Plot data={sim.out.map((d) => ({ ...d, s: d.soc * 100 }))} k="s" yMin={0} yMax={100} label="State of charge" unit="%" cursor={cursor} color="#06b6d4" step={0} />
        <div className="readout" aria-live="polite">
          <div><b>{Math.round(sim.tEnd / 60)} min</b><span>{sim.cutoff ? 'Runtime to cut-off' : 'Simulated time'}</span></div>
          <div><b>{(sim.socEnd * 100).toFixed(1)} %</b><span>Final SOC</span></div>
          <div><b>{sim.vmin.toFixed(2)} V</b><span>Minimum voltage</span></div>
          <div><b>{sim.Wh.toFixed(2)} Wh</b><span>Energy delivered</span></div>
          <div><b>{sim.heat.toFixed(3)} Wh</b><span>Resistive loss</span></div>
          <div><b>{((R1m / 1000) * C1).toFixed(0)} s</b><span>Time constant τ</span></div>
        </div>
        <p className="demo-note">First-order Thevenin model with an illustrative NMC-type OCV curve and 2.8 V cut-off. Raise R0 or the C-rate to see the IR drop and shorter runtime; raise C1 to slow the polarisation response.</p>
      </div>
    </div>
  );
}
