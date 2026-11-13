/* Lightweight technical SVG illustrations used when a project has no photo. */
const bg = (
  <>
    <defs>
      <linearGradient id="ilg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#101d36" /><stop offset="1" stopColor="#0b2a4a" /></linearGradient>
      <linearGradient id="ila" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2563eb" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
      <pattern id="ilgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(148,163,184,.10)" /></pattern>
    </defs>
    <rect width="320" height="180" fill="url(#ilg)" />
    <rect width="320" height="180" fill="url(#ilgrid)" />
  </>
);
const S = { stroke: '#67e8f9', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
const S2 = { ...S, stroke: '#93c5fd' };

const art = {
  battery: (
    <g>
      <rect x="40" y="60" width="110" height="60" rx="8" {...S} /><rect x="150" y="78" width="8" height="24" rx="2" fill="#67e8f9" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={50 + i * 24} y="70" width="18" height="40" rx="3" fill="url(#ila)" opacity={0.35 + i * 0.18} />)}
      <path d="M180 90h20m0 0v-22h22m-22 22v22h22" {...S2} />
      <rect x="222" y="60" width="34" height="16" rx="3" {...S2} /><path d="M256 68h18M222 112h12l4-8 6 16 6-16 4 8h10" {...S2} />
      <text x="40" y="150" fill="#94a3b8" fontSize="11" fontFamily="monospace">V = OCV(SOC) − I·R0 − V1</text>
    </g>
  ),
  neural: (
    <g>
      {[[60, [50, 90, 130]], [140, [40, 75, 110, 145]], [220, [60, 100, 140]], [280, [100]]].map(([x, ys], li, arr) => (
        <g key={x}>
          {li < arr.length - 1 && ys.flatMap((y) => arr[li + 1][1].map((y2) => <line key={`${y}-${y2}`} x1={x} y1={y} x2={arr[li + 1][0]} y2={y2} stroke="rgba(103,232,249,.25)" />))}
          {ys.map((y) => <circle key={y} cx={x} cy={y} r="8" fill="#0b1220" stroke="#67e8f9" strokeWidth="2" />)}
        </g>
      ))}
      <text x="250" y="160" fill="#94a3b8" fontSize="11" fontFamily="monospace">SOH</text>
    </g>
  ),
  thermal: (
    <g>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={50 + i * 42} y="55" width="30" height="70" rx="6" fill={['#2563eb', '#0891b2', '#f59e0b', '#ef4444', '#0891b2'][i]} opacity=".75" />)}
      <path d="M40 140c30-12 60 12 90 0s60 12 90 0 40 8 60 0" {...S} /><path d="M40 40c30-12 60 12 90 0s60 12 90 0 40 8 60 0" {...S2} />
    </g>
  ),
  powertrain: (
    <g>
      <rect x="30" y="70" width="60" height="40" rx="6" {...S} /><text x="42" y="95" fill="#67e8f9" fontSize="11" fontFamily="monospace">BATT</text>
      <rect x="120" y="70" width="60" height="40" rx="6" {...S2} /><text x="128" y="95" fill="#93c5fd" fontSize="11" fontFamily="monospace">INV</text>
      <circle cx="235" cy="90" r="22" {...S} /><text x="223" y="94" fill="#67e8f9" fontSize="11" fontFamily="monospace">M</text>
      <circle cx="295" cy="90" r="14" {...S2} />
      <path d="M90 90h30M180 90h33M257 90h24" stroke="url(#ila)" strokeWidth="3" strokeDasharray="6 6"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" /></path>
    </g>
  ),
  swap: (
    <g>
      <rect x="40" y="95" width="120" height="40" rx="10" {...S2} /><circle cx="70" cy="140" r="10" {...S2} /><circle cx="130" cy="140" r="10" {...S2} />
      <rect x="200" y="60" width="70" height="40" rx="6" {...S} /><path d="M150 60c20-25 50-25 60 0" {...S} /><path d="m205 55 5 5-7 3" {...S} />
      <rect x="210" y="70" width="14" height="20" fill="url(#ila)" /><rect x="230" y="70" width="14" height="20" fill="url(#ila)" opacity=".6" />
    </g>
  ),
  robot: (
    <g>
      <rect x="110" y="140" width="100" height="14" rx="4" {...S2} />
      <path d="M160 140v-30" {...S} /><circle cx="160" cy="108" r="7" {...S} />
      <path d="m160 108 50-40" {...S} /><circle cx="212" cy="66" r="6" {...S} /><path d="m212 66 40 20" {...S} /><path d="m252 86 10-8m-10 8 10 8" {...S2} />
      <path d="M60 50h40M60 62h28" stroke="rgba(148,163,184,.5)" strokeWidth="2" />
    </g>
  ),
  solar: (
    <g>
      <circle cx="60" cy="50" r="16" {...S} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1={60 + 22 * Math.cos(a * Math.PI / 180)} y1={50 + 22 * Math.sin(a * Math.PI / 180)} x2={60 + 30 * Math.cos(a * Math.PI / 180)} y2={50 + 30 * Math.sin(a * Math.PI / 180)} {...S} />)}
      <path d="M40 140l20-40h60l-20 40z" {...S2} /><path d="M60 100l-10 40M90 100l-10 40" {...S2} />
      <path d="M200 150v-70" {...S} /><path d="M200 80l-20-24M200 80l28-8M200 80l-6 28" {...S} />
      <rect x="240" y="120" width="50" height="22" rx="4" {...S2} /><path d="M248 150h34" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 4" />
    </g>
  ),
  ev: (
    <g>
      <path d="M40 120h240l-14-28-34-12H108l-34 14z" {...S2} /><circle cx="95" cy="124" r="14" {...S} /><circle cx="225" cy="124" r="14" {...S} />
      <rect x="120" y="106" width="80" height="10" rx="3" fill="url(#ila)" />
      <path d="M160 70V40m0 0-8 8m8-8 8 8" {...S} />
    </g>
  ),
};

export default function Illustration({ kind = 'battery', className = 'illus', label }) {
  return (
    <svg className={className} viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
      {bg}{art[kind] || art.battery}
    </svg>
  );
}
