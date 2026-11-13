import { lazy, Suspense, useState } from 'react';
import { m } from 'framer-motion';
import { ExternalLink, Battery, Bot, Car, Loader2, Eye, X } from 'lucide-react';
import { virtualLabs } from '../data/virtualLabs';
import { SectionHead, Reveal } from '../components/ui';
import Illustration from '../components/Illustration';
import Icon from '../components/Icon';
import BatterySim from '../demos/BatterySim';
import EnergyFlow from '../demos/EnergyFlow';

const RobotArm = lazy(() => import('../demos/RobotArm'));

const DEMOS = [
  { id: 'battery', label: 'Battery ECM simulator', I: Battery, C: BatterySim },
  { id: 'robot', label: '3D robot arm explorer', I: Bot, C: RobotArm },
  { id: 'ev', label: 'EV energy flow', I: Car, C: EnergyFlow },
];

export default function VirtualLabs() {
  const [tab, setTab] = useState('battery');
  const [preview, setPreview] = useState({});
  const D = DEMOS.find((d) => d.id === tab).C;
  const onKey = (e) => {
    const i = DEMOS.findIndex((d) => d.id === tab);
    if (e.key === 'ArrowRight') setTab(DEMOS[(i + 1) % DEMOS.length].id);
    if (e.key === 'ArrowLeft') setTab(DEMOS[(i - 1 + DEMOS.length) % DEMOS.length].id);
  };

  return (
    <section id="virtual-labs" className="section">
      <div className="container">
        <SectionHead title={<>Virtual <span className="grad-text">Laboratories</span></>}
          sub="Open, browser-based laboratories I built for my EV and robotics courses, plus small interactive demonstrations you can try right here." />
        <div className="grid" style={{ gap: 22 }}>
          {virtualLabs.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.06} className="card hover lab-card">
              <div className="lab-visual">
                {preview[l.id]
                  ? <iframe className="lab-preview" src={l.url} title={`${l.title} — live preview`} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups" />
                  : <Illustration kind={l.visual} label={`${l.title} illustration`} />}
                <button className="btn btn-ghost btn-sm lab-preview-btn" onClick={() => setPreview((s) => ({ ...s, [l.id]: !s[l.id] }))} aria-pressed={!!preview[l.id]}>
                  {preview[l.id] ? <><X size={14} /> Close preview</> : <><Eye size={14} /> Preview here</>}
                </button>
              </div>
              <div className="lab-body">
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><span className={`chip${l.accent === 'cyan' ? ' cyan' : ''}`}>{l.course}</span><span className="chip success">Live</span></div>
                <h3>{l.title}</h3>
                <p style={{ fontWeight: 550, color: 'var(--text-strong)' }}>{l.subtitle}</p>
                <p className="muted">{l.description}</p>
                <div className="filters">{l.tags.map((t) => <span key={t} className="chip neutral">{t}</span>)}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
                  <a className="btn btn-primary" href={l.url} target="_blank" rel="noopener noreferrer">Launch live lab <ExternalLink size={16} /></a>
                  {l.sourceUrl && <a className="btn btn-ghost" href={l.sourceUrl} target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /> Source</a>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 22, marginBottom: 6 }}>Try it here</h3>
          <p className="muted" style={{ marginBottom: 16 }}>Three compact, working demonstrations of ideas from my teaching. They are illustrative models for learning, not research results.</p>
          <div className="demo-tabs" role="tablist" aria-label="Interactive demonstrations" onKeyDown={onKey}>
            {DEMOS.map(({ id, label, I }) => (
              <button key={id} role="tab" id={`tab-${id}`} aria-controls={`panel-${id}`} aria-selected={tab === id} tabIndex={tab === id ? 0 : -1} className="demo-tab" onClick={() => setTab(id)}>
                {tab === id && <m.span layoutId="demo-pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <I size={16} /><span>{label}</span>
              </button>
            ))}
          </div>
          <div className="card demo-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            <Suspense fallback={<div style={{ display: 'grid', placeItems: 'center', minHeight: 320 }} className="muted"><Loader2 className="spin" /> Loading 3D engine…</div>}>
              <D />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
