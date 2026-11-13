import { useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/*
 * Simple longitudinal EV model:
 *   F = m·g·Crr·cos(θ) + ½·ρ·Cd·A·v² + m·g·sin(θ) + m·a
 *   P_wheel = F·v ; traction: P_batt = P_wheel / (η_motor·η_inv) + P_aux ; regen: P_batt = P_wheel·η_motor·η_inv + P_aux
 * Parameters are typical compact-EV values, for illustration only.
 */
const P = { m: 1500, g: 9.81, Crr: 0.011, rho: 1.2, CdA: 0.62, etaM: 0.92, etaI: 0.96, aux: 0.6, battKWh: 40, ac: 7.2, etaCh: 0.93 };

const MODES = [
  { k: 'accel', label: 'Accelerate', a: 1.2 },
  { k: 'cruise', label: 'Cruise', a: 0 },
  { k: 'regen', label: 'Regenerative braking', a: -1.5 },
  { k: 'charge', label: 'Charging (AC)', a: 0 },
];

function compute(mode, kmh, grade) {
  const v = kmh / 3.6, th = Math.atan(grade / 100);
  if (mode === 'charge') {
    const grid = P.ac, batt = P.ac * P.etaCh;
    return { grid, charger: grid, batt: -batt, inv: 0, motor: 0, wheel: 0, F: 0, loss: grid - batt, dir: 'charge' };
  }
  const a = MODES.find((x) => x.k === mode).a;
  const Fr = P.m * P.g * P.Crr * Math.cos(th), Fa = 0.5 * P.rho * P.CdA * v * v, Fg = P.m * P.g * Math.sin(th), Fi = P.m * a;
  const F = Fr + Fa + Fg + Fi;
  const wheel = (F * v) / 1000; // kW
  let motor, inv, batt;
  if (wheel >= 0) { motor = wheel / P.etaM; inv = motor / P.etaI; batt = inv + P.aux; }
  else { motor = wheel * P.etaM; inv = motor * P.etaI; batt = inv + P.aux; }
  return { wheel, motor, inv, batt, F, Fr, Fa, Fg, Fi, loss: Math.abs(batt - wheel - P.aux), dir: wheel >= 0 ? 'drive' : 'regen' };
}

function Flow({ x1, x2, y, kw, rev, reduce, color }) {
  const w = Math.min(14, 2 + Math.abs(kw) / 6);
  const dur = Math.max(0.35, 2.4 - Math.abs(kw) / 40);
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--border-strong)" strokeWidth={w + 4} strokeLinecap="round" opacity=".35" />
      {Math.abs(kw) > 0.05 && (
        <line x1={rev ? x2 : x1} y1={y} x2={rev ? x1 : x2} y2={y} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray="10 12">
          {!reduce && <animate attributeName="stroke-dashoffset" from="44" to="0" dur={`${dur}s`} repeatCount="indefinite" />}
        </line>
      )}
    </g>
  );
}

function Node({ x, y, title, kw, icon, active }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-56" y="-38" width="112" height="76" rx="14" fill="var(--surface)" stroke={active ? 'var(--accent)' : 'var(--border-strong)'} strokeWidth={active ? 2 : 1.2} />
      <text y="-12" textAnchor="middle" style={{ fontSize: 18 }}>{icon}</text>
      <text y="8" textAnchor="middle" style={{ fontWeight: 700, fill: 'var(--text-strong)', fontSize: 12 }}>{title}</text>
      <text y="25" textAnchor="middle" style={{ fill: 'var(--accent-text)', fontSize: 12, fontWeight: 600 }} className="tnum">{kw == null ? '—' : `${kw.toFixed(1)} kW`}</text>
    </g>
  );
}

export default function EnergyFlow() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState('cruise');
  const [kmh, setKmh] = useState(60);
  const [grade, setGrade] = useState(0);
  const r = useMemo(() => compute(mode, kmh, grade), [mode, kmh, grade]);
  const charge = mode === 'charge';
  const regen = r.dir === 'regen';
  const blue = '#2563eb', cyan = '#06b6d4', green = '#10b981';
  const col = charge ? green : regen ? green : blue;
  const rangeKm = !charge && r.batt > 0.1 ? (P.battKWh / r.batt) * kmh : null;
  const whkm = !charge && kmh > 0 ? (r.batt * 1000) / kmh : null;

  return (
    <div className="demo-grid">
      <div>
        <div className="ctrl">
          <div className="ctrl-head"><span>Operating mode</span></div>
          <div className="seg" role="group" aria-label="Operating mode">
            {MODES.map((m) => <button key={m.k} className="filter-chip" aria-pressed={mode === m.k} onClick={() => setMode(m.k)}>{m.label}</button>)}
          </div>
        </div>
        <div className="ctrl" style={{ opacity: charge ? 0.45 : 1 }}>
          <div className="ctrl-head"><label htmlFor="ef-v">Vehicle speed</label><output htmlFor="ef-v">{kmh} km/h</output></div>
          <input id="ef-v" type="range" min="5" max="130" step="5" value={kmh} disabled={charge} onChange={(e) => setKmh(+e.target.value)} />
        </div>
        <div className="ctrl" style={{ opacity: charge ? 0.45 : 1 }}>
          <div className="ctrl-head"><label htmlFor="ef-g">Road gradient</label><output htmlFor="ef-g">{grade} %</output></div>
          <input id="ef-g" type="range" min="-8" max="8" step="1" value={grade} disabled={charge} onChange={(e) => setGrade(+e.target.value)} />
        </div>
        {!charge && (
          <div className="card" style={{ padding: 14, fontSize: 13.5 }}>
            <b style={{ color: 'var(--text-strong)' }}>Tractive force breakdown</b>
            <dl className="kv" style={{ marginTop: 8 }}>
              <dt>Rolling</dt><dd>{r.Fr.toFixed(0)} N</dd>
              <dt>Aerodynamic</dt><dd>{r.Fa.toFixed(0)} N</dd>
              <dt>Gradient</dt><dd>{r.Fg.toFixed(0)} N</dd>
              <dt>Inertial</dt><dd>{r.Fi.toFixed(0)} N</dd>
              <dt>Total</dt><dd>{r.F.toFixed(0)} N</dd>
            </dl>
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gap: 12, minWidth: 0 }}>
        <svg viewBox="0 0 700 250" className="plot" role="img" aria-label={`Energy flow in ${mode} mode`}>
          {charge ? (
            <>
              <Flow x1={126} x2={244} y={125} kw={r.grid} reduce={reduce} color={col} />
              <Flow x1={356} x2={474} y={125} kw={-r.batt} reduce={reduce} color={col} />
              <Node x={70} y={125} title="AC grid" kw={r.grid} icon="🔌" active />
              <Node x={300} y={125} title="On-board charger" kw={r.charger} icon="⚡" active />
              <Node x={530} y={125} title="Battery pack" kw={-r.batt} icon="🔋" active />
              <text x="350" y="230" textAnchor="middle">≈ {(P.battKWh / (-r.batt)).toFixed(1)} h for a full 40 kWh charge (charger efficiency {P.etaCh * 100}%)</text>
            </>
          ) : (
            <>
              <Flow x1={126} x2={194} y={110} kw={r.batt} rev={regen} reduce={reduce} color={col} />
              <Flow x1={306} x2={374} y={110} kw={r.inv} rev={regen} reduce={reduce} color={col} />
              <Flow x1={486} x2={554} y={110} kw={r.motor} rev={regen} reduce={reduce} color={col} />
              <Node x={70} y={110} title="Battery pack" kw={r.batt} icon="🔋" active={!regen} />
              <Node x={250} y={110} title="Inverter" kw={r.inv} icon="〰️" />
              <Node x={430} y={110} title="Motor" kw={r.motor} icon="⚙️" />
              <Node x={610} y={110} title="Wheels" kw={r.wheel} icon="🛞" active={regen} />
              <line x1="70" y1="148" x2="70" y2="190" stroke={cyan} strokeWidth="2" strokeDasharray="4 5" />
              <text x="80" y="186">Auxiliaries {P.aux} kW</text>
              <text x="350" y="232" textAnchor="middle" style={{ fontWeight: 600, fill: regen ? green : 'var(--muted)' }}>
                {regen ? `Regenerating ${(-r.batt).toFixed(1)} kW back into the pack` : `Drivetrain losses ≈ ${r.loss.toFixed(1)} kW`}
              </text>
            </>
          )}
        </svg>
        <div className="readout" aria-live="polite">
          {charge ? (
            <>
              <div><b>{P.ac} kW</b><span>AC input</span></div>
              <div><b>{(-r.batt).toFixed(2)} kW</b><span>Into battery</span></div>
              <div><b>{r.loss.toFixed(2)} kW</b><span>Charger loss</span></div>
            </>
          ) : (
            <>
              <div><b>{r.wheel.toFixed(1)} kW</b><span>Wheel power</span></div>
              <div><b>{r.batt.toFixed(1)} kW</b><span>{r.batt >= 0 ? 'Battery discharge' : 'Battery charging'}</span></div>
              <div><b>{whkm != null && whkm > 0 ? whkm.toFixed(0) : '—'} Wh/km</b><span>Consumption</span></div>
              <div><b>{rangeKm && mode === 'cruise' ? `${rangeKm.toFixed(0)} km` : '—'}</b><span>Range at this cruise</span></div>
            </>
          )}
        </div>
        <p className="demo-note">Compact-EV assumptions: 1500 kg, CdA 0.62 m², Crr 0.011, motor 92 %, inverter 96 %, 40 kWh pack, 0.6 kW auxiliaries. Try cruising at 60 vs 120 km/h to see aerodynamic drag dominate.</p>
      </div>
    </div>
  );
}
