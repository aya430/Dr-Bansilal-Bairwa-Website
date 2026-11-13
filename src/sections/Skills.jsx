import { useState } from 'react';
import { skillGroups } from '../data/skills';
import { SectionHead, Reveal } from '../components/ui';
import Icon from '../components/Icon';

export default function Skills() {
  const [g, setG] = useState('');
  const groups = skillGroups.filter((x) => !g || x.id === g);
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <SectionHead title={<>Technical <span className="grad-text">Skills</span></>}
          sub="Grouped by domain. Skills marked with a dot show where they were applied when you hover or focus them." />
        <Reveal className="filters" role="group" aria-label="Filter skills by category" style={{ marginBottom: 20 }}>
          <button className="filter-chip" aria-pressed={!g} onClick={() => setG('')}>All</button>
          {skillGroups.map((x) => <button key={x.id} className="filter-chip" aria-pressed={g === x.id} onClick={() => setG(g === x.id ? '' : x.id)}>{x.title}<span className="count">{x.skills.length}</span></button>)}
        </Reveal>
        <div className="bento">
          {groups.map((x, i) => (
            <Reveal key={x.id} delay={i * 0.05} className={`card skill-group${x.skills.length > 8 ? ' span-2' : ''}${!g ? '' : ' span-2'}`}>
              <h3><span className="gi"><Icon name={x.icon} size={19} /></span>{x.title}</h3>
              <div className="skill-list">
                {x.skills.map((s) => (
                  <span key={s.name} className={`skill${s.evidence ? ' has-ev' : ''}`} tabIndex={s.evidence ? 0 : undefined} aria-label={s.evidence ? `${s.name}: ${s.evidence}` : undefined}>
                    {s.name}
                    {s.evidence && <span className="tip-bubble" role="tooltip">{s.evidence}</span>}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
