import { useState } from 'react';

/* Vertical bar chart (SVG, responsive via viewBox). data: [{label, value}] */
export function BarChart({ data, height = 220, label = 'Bar chart' }) {
  const [hover, setHover] = useState(null);
  const W = 520, H = height, pad = { l: 30, r: 10, t: 18, b: 28 };
  const max = Math.max(1, ...data.map((d) => d.value));
  const step = Math.ceil(max / 4) || 1;
  const top = step * 4;
  const bw = (W - pad.l - pad.r) / data.length;
  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label}: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#06b6d4" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((k) => {
        const y = pad.t + (H - pad.t - pad.b) * (1 - k / 4);
        return (
          <g key={k}>
            <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="var(--border)" strokeDasharray={k ? '3 4' : ''} />
            <text x={pad.l - 8} y={y + 4} textAnchor="end">{step * k}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = ((H - pad.t - pad.b) * d.value) / top;
        const x = pad.l + i * bw + bw * 0.18, w = bw * 0.64, y = H - pad.b - h;
        return (
          <g key={d.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect className="bar" x={x} y={y} width={w} height={Math.max(h, 0)} rx="5" />
            <text x={x + w / 2} y={H - 10} textAnchor="middle">{d.label}</text>
            {(hover === i || data.length <= 8) && d.value > 0 && <text x={x + w / 2} y={y - 6} textAnchor="middle" style={{ fill: 'var(--text-strong)', fontWeight: 700 }}>{d.value}</text>}
          </g>
        );
      })}
    </svg>
  );
}

const PALETTE = ['#2563eb', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

/* Donut chart. data: [{label, value}] */
export function Donut({ data, size = 180, label = 'Donut chart', center }) {
  const [hover, setHover] = useState(null);
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const r = 70, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <svg viewBox="0 0 180 180" width={size} height={size} role="img" aria-label={`${label}: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`} style={{ flexShrink: 0 }}>
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="22" />
        {data.map((d, i) => {
          const len = (d.value / total) * c;
          const el = (
            <circle key={d.label} cx="90" cy="90" r={r} fill="none" stroke={PALETTE[i % PALETTE.length]} strokeWidth={hover === i ? 26 : 22}
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc} transform="rotate(-90 90 90)" style={{ transition: 'stroke-width .2s' }}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
          );
          acc += len;
          return el;
        })}
        <text x="90" y="86" textAnchor="middle" style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, fill: 'var(--text-strong)' }}>{hover != null ? data[hover].value : total}</text>
        <text x="90" y="108" textAnchor="middle" style={{ fontSize: 11, fill: 'var(--muted)' }}>{hover != null ? data[hover].label : center || 'total'}</text>
      </svg>
      <div className="legend" style={{ flexDirection: 'column', gap: 6 }}>
        {data.map((d, i) => (
          <span key={d.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <i style={{ background: PALETTE[i % PALETTE.length] }} />{d.label} <b className="tnum" style={{ color: 'var(--text-strong)' }}>{d.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Horizontal bars. data: [{label, value}] */
export function HBars({ data, max }) {
  const mx = max || Math.max(1, ...data.map((d) => d.value));
  return (
    <div role="list">
      {data.map((d) => (
        <div className="hbar-row" key={d.label} role="listitem">
          <span>{d.label}</span>
          <b className="tnum" style={{ color: 'var(--text-strong)' }}>{d.value}</b>
          <div className="hbar-track" aria-hidden="true"><div className="hbar-fill" style={{ width: `${(d.value / mx) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
