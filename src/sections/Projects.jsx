import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { publications } from '../data/publications';
import { patents } from '../data/patents';
import { SectionHead, Reveal, Modal } from '../components/ui';
import Illustration from '../components/Illustration';
import Icon from '../components/Icon';
import { img } from '../utils/helpers';

export default function Projects() {
  const [cat, setCat] = useState('');
  const [open, setOpen] = useState(null);
  const cats = [...new Set(projects.map((p) => p.category))];
  const list = projects.filter((p) => !cat || p.category === cat);
  const pr = projects.find((p) => p.id === open);

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <SectionHead title={<>Projects & <span className="grad-text">Innovations</span></>}
          sub="Battery modelling, EV systems and robotics work — each linked to the papers and patents that came out of it." />
        <Reveal className="filters" style={{ marginBottom: 22 }} role="group" aria-label="Filter projects by category">
          <button className="filter-chip" aria-pressed={!cat} onClick={() => setCat('')}>All<span className="count">{projects.length}</span></button>
          {cats.map((c) => <button key={c} className="filter-chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>{c}</button>)}
        </Reveal>
        <div className="grid grid-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
              <button className="card hover project-card" onClick={() => setOpen(p.id)} aria-haspopup="dialog" style={{ height: '100%' }}>
                <div className="visual">
                  {p.image ? <img src={img(p.image, true)} alt="" loading="lazy" width="560" height="315" /> : <Illustration kind={p.illustration} />}
                </div>
                <div className="body">
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><span className="chip">{p.category}</span><span className="chip cyan">{p.status}</span></div>
                  <h3>{p.title}</h3>
                  <p className="muted" style={{ fontSize: 14.5 }}>{p.summary}</p>
                  <span className="more">View details <ArrowRight size={15} /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Modal open={!!pr} onClose={() => setOpen(null)} label={pr?.title || 'Project'}>
        {pr && (
          <>
            <div className="modal-hero">{pr.image ? <img src={img(pr.image)} alt={`${pr.title} — related record`} /> : <Illustration kind={pr.illustration} label={`${pr.title} illustration`} />}</div>
            <div className="modal-body">
              <div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}><span className="chip">{pr.category}</span><span className="chip cyan">{pr.status}</span></div>
                <h2>{pr.title}</h2>
                <p className="muted" style={{ marginTop: 8 }}>{pr.summary}</p>
              </div>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                <div><h3 className="mh">Objectives</h3><ul>{pr.objectives.map((o) => <li key={o}>{o}</li>)}</ul></div>
                <div><h3 className="mh">Technical contribution</h3><p>{pr.contribution}</p></div>
              </div>
              <div><h3 className="mh">Technologies</h3><div className="filters">{pr.tech.map((t) => <span key={t} className="chip neutral">{t}</span>)}</div></div>
              {(pr.relatedPublications.length > 0 || pr.relatedPatents.length > 0) && (
                <div>
                  <h3 className="mh">Related outputs</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
                    {pr.relatedPublications.map((id) => publications.find((x) => x.id === id)).filter(Boolean).map((x) => (
                      <li key={x.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Icon name="book" size={16} style={{ marginTop: 4, color: 'var(--accent-text)', flexShrink: 0 }} />
                        <span>{x.url ? <a href={x.url} target="_blank" rel="noopener noreferrer">{x.title} <ExternalLink size={12} /></a> : x.title} <span className="muted small">· {x.venue.split(',')[0]} ({x.year})</span></span>
                      </li>
                    ))}
                    {pr.relatedPatents.map((id) => patents.find((x) => x.id === id)).filter(Boolean).map((x) => (
                      <li key={x.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Icon name="file" size={16} style={{ marginTop: 4, color: 'var(--cyan-text)', flexShrink: 0 }} />
                        <span>Patent: {x.title} <span className="muted small">· App. No. {x.applicationNo}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(pr.githubUrl || pr.demoUrl) && (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {pr.githubUrl && <a className="btn btn-ghost" href={pr.githubUrl} target="_blank" rel="noopener noreferrer"><Icon name="github" size={16} /> Source code</a>}
                  {pr.demoUrl && <a className="btn btn-primary" href={pr.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ExternalLink size={16} /></a>}
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
