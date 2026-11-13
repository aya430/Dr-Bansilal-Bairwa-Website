import { ArrowRight } from 'lucide-react';
import { researchAreas } from '../data/research';
import { publications } from '../data/publications';
import { SectionHead, Reveal, useApp } from '../components/ui';
import Icon from '../components/Icon';
import { scrollToId } from '../utils/helpers';

export const areaCount = (a) => publications.filter((p) => p.tags.some((t) => a.tags.includes(t))).length;

export default function Research() {
  const { setPubQuery } = useApp();
  return (
    <section id="research" className="section glass-section">
      <div className="container">
        <SectionHead title={<>Research <span className="grad-text">Areas</span></>}
          sub="Battery modelling, battery management, AI for battery health, thermal management, EV powertrains and robotics." />
        <div className="glass-grid">
          {researchAreas.map((a, i) => {
            const n = areaCount(a);
            return (
              <Reveal key={a.key} delay={(i % 4) * 0.05} className="glass-card">
                <span className="gc-ic"><Icon name={a.icon} size={26} /></span>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <div className="gc-tags">{a.tech.slice(0, 3).map((t) => <span key={t} className="chip neutral">{t}</span>)}</div>
                {n > 0 && <button className="tile-link" onClick={() => { setPubQuery(`area:${a.key}`); scrollToId('publications'); }}>{n} publication{n > 1 ? 's' : ''} <ArrowRight size={14} /></button>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
