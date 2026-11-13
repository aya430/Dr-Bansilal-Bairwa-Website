import { useState } from 'react';
import { ZoomIn, ExternalLink, Trophy, BadgeCheck } from 'lucide-react';
import { achievements, certifications } from '../data/achievements';
import { SectionHead, Reveal, useApp } from '../components/ui';
import { formatDate, img } from '../utils/helpers';

export default function Achievements() {
  const { openLightbox } = useApp();
  const [cat, setCat] = useState('');
  const cats = [...new Set(achievements.map((a) => a.category))];
  const list = achievements.filter((a) => !cat || a.category === cat).sort((a, b) => b.date.localeCompare(a.date));
  const gal = list.filter((a) => a.image).map((a) => ({ image: a.image, caption: `${a.title} — ${a.by}` }));
  const certGal = certifications.filter((c) => c.image).map((c) => ({ image: c.image, caption: `${c.title} — ${c.issuer}` }));

  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHead title={<>Honours & <span className="grad-text">Awards</span></>}
          sub="Click any certificate for a full-screen preview; use the download button there to save it." />
        <Reveal className="filters" role="group" aria-label="Filter awards" style={{ marginBottom: 20 }}>
          <button className="filter-chip" aria-pressed={!cat} onClick={() => setCat('')}>All<span className="count">{achievements.length}</span></button>
          {cats.map((c) => <button key={c} className="filter-chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>{c}</button>)}
        </Reveal>
        <div className="grid grid-3">
          {list.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.05} className="card hover award-card">
              {a.image ? (
                <button className={`award-thumb${a.fit === 'contain' ? ' contain' : ''}`} onClick={() => openLightbox(gal, gal.findIndex((g) => g.image === a.image))} aria-label={`View certificate: ${a.title}, ${a.by}`}>
                  <img src={img(a.image, true)} alt="" loading="lazy" width="560" height="420" />
                  <span className="zoom" aria-hidden="true"><ZoomIn size={16} /></span>
                </button>
              ) : (
                <div className="award-ph" aria-hidden="true"><Trophy size={44} /><span>{a.date}</span></div>
              )}
              <div className="award-body">
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="chip gold"><Trophy size={12} /> {a.category}</span>
                  <span className="small muted tnum">{formatDate(a.date)}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="small" style={{ fontWeight: 550, color: 'var(--text-strong)' }}>{a.by}</p>
                <p className="small muted">{a.description}</p>
                {a.certificateUrl && <a className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start', marginTop: 'auto' }} href={a.certificateUrl} target="_blank" rel="noopener noreferrer">Certificate PDF <ExternalLink size={14} /></a>}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: 56 }}>
          <h3 style={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}><BadgeCheck size={20} /> Professional certifications</h3>
        </Reveal>
        <div className="grid grid-3">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.04} className="card hover" style={{ display: 'flex', gap: 14, padding: 14, alignItems: 'center' }}>
              {c.image ? (
                <button className="act-thumb" onClick={() => openLightbox(certGal, certGal.findIndex((g) => g.image === c.image))} aria-label={`View certificate: ${c.title}`}>
                  <img src={img(c.image, true)} alt="" loading="lazy" width="88" height="66" />
                </button>
              ) : <span className="act-thumb ph" aria-hidden="true"><BadgeCheck size={24} /></span>}
              <div style={{ minWidth: 0 }}>
                <div className="act-title">{c.title}</div>
                <div className="act-meta"><span>{c.issuer}</span><span className="tnum">{c.date}</span></div>
                {c.url && <a className="small" href={c.url} target="_blank" rel="noopener noreferrer">Certificate <ExternalLink size={12} /></a>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
