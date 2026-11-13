import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, Briefcase, Target, BadgeCheck } from 'lucide-react';
import { profile } from '../data/profile';
import { education, experience, memberships } from '../data/experience';
import { SectionHead, Reveal } from '../components/ui';
import { img } from '../utils/helpers';

function TimelineItem({ title, sub, period, detail, points, logo, link, i }) {
  const [open, setOpen] = useState(i === 0);
  const hasMore = detail || (points && points.length);
  return (
    <Reveal className="tl-item" delay={i * 0.06}>
      <span className="tl-dot" aria-hidden="true" />
      <div className="card hover tl-card">
        <div className={`logo${logo ? '' : ' ph'}`}>
          {logo ? <img src={img(logo, true)} alt="" loading="lazy" width="40" height="40" /> : <GraduationCap size={22} />}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          {period && <div className="tl-period">{period}</div>}
          <h3 className="tl-title">{title}</h3>
          <div className="tl-org">{link ? <a href={link} target="_blank" rel="noopener noreferrer">{sub}</a> : sub}</div>
          {hasMore && (
            <>
              <AnimatePresence initial={false}>
                {open && (
                  <m.div className="tl-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    {detail && <p>{detail}</p>}
                    {points && <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>{points.map((p) => <li key={p}>{p}</li>)}</ul>}
                  </m.div>
                )}
              </AnimatePresence>
              <button className="tl-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                {open ? 'Less' : 'Details'} <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </button>
            </>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead title={<>About <span className="grad-text">Me</span></>} sub={profile.careerObjective} />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 40 }}>
          <div>
            <Reveal style={{ display: 'grid', gap: 16, fontSize: 16.5 }}>
              {profile.bio.map((p, k) => <p key={k}>{p}</p>)}
            </Reveal>
            <Reveal className="card card-pad" delay={0.1} style={{ marginTop: 24, display: 'flex', gap: 14, background: 'var(--grad-soft)' }}>
              <Target size={22} style={{ color: 'var(--accent-text)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
              <div><b style={{ color: 'var(--text-strong)' }}>Career objective</b><p className="muted" style={{ marginTop: 4 }}>{profile.careerObjective}</p></div>
            </Reveal>
            <Reveal delay={0.15} style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 16, display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}><BadgeCheck size={18} /> Professional memberships</h3>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {memberships.map((mb) => (
                  <div key={mb.name} className="card" style={{ padding: 14 }}>
                    <b style={{ color: 'var(--text-strong)', fontSize: 14.5 }}>{mb.name}</b>
                    <div className="small muted">{mb.detail} · since {mb.since}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gap: 36 }}>
            <div>
              <h3 style={{ fontSize: 18, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}><GraduationCap size={20} /> Academic qualifications</h3>
              <div className="timeline">
                {education.map((e, i) => <TimelineItem key={e.degree} i={i} title={`${e.degree} — ${e.field}`} sub={`${e.institution}${e.place ? ' · ' + e.place : ''}`} period={e.period} detail={e.detail} logo={e.logo} link={e.link} />)}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 18, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}><Briefcase size={20} /> Professional experience</h3>
              <div className="timeline">
                {experience.map((e, i) => <TimelineItem key={e.role} i={i} title={e.role} sub={`${e.org}${e.place ? ' · ' + e.place : ''}`} period={e.period} points={e.points} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
