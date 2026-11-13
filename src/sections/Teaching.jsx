import { ExternalLink, BookOpen, FileText, PlayCircle, FlaskConical, Clock, Images, Users, Beaker } from 'lucide-react';
import { courses, labs, certCourses } from '../data/courses';
import { SectionHead, Reveal, useApp } from '../components/ui';
import Icon from '../components/Icon';
import { asset } from '../utils/helpers';

// Button definitions — the URLs themselves live only in src/data/courses.js
const ACTIONS = [
  { key: 'courseLink', label: 'View Course', I: ExternalLink, primary: true },
  { key: 'syllabusLink', label: 'Syllabus', I: FileText },
  { key: 'notesLink', label: 'Lecture Notes', I: BookOpen },
  { key: 'videoLink', label: 'Video Lectures', I: PlayCircle },
  { key: 'virtualLabLink', label: 'Virtual Lab', I: FlaskConical },
];

export default function Teaching() {
  const { openLightbox } = useApp();
  return (
    <section id="teaching" className="section alt">
      <div className="container">
        <SectionHead title={<>Teaching & <span className="grad-text">Courses</span></>}
          sub="UG and PG courses taught at REVA University since 2021, laboratories handled, and certification courses offered as instructor." />
        <div className="grid grid-3">
          {courses.map((c, i) => {
            const missing = ACTIONS.filter((a) => !c[a.key]);
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.05} className="card hover course-card">
                <div className="course-head">
                  <span className="course-ic"><Icon name={c.icon} size={22} /></span>
                  <div style={{ minWidth: 0 }}>
                    <div className="small" style={{ color: 'var(--cyan-text)', fontWeight: 650 }}>{c.category}</div>
                    <h3>{c.title}</h3>
                  </div>
                </div>
                <div className="course-meta">
                  {c.code && <span className="chip tnum">{c.code}</span>}
                  {c.semester && <span className="chip neutral"><Clock size={12} /> {c.semester}</span>}
                  {c.credits !== '' && c.credits != null && <span className="chip neutral">{typeof c.credits === 'number' ? `${c.credits} credits` : c.credits}</span>}
                  {c.level && <span className="chip neutral">{c.level}</span>}
                  <span className={`chip ${c.status === 'Active' ? 'success' : 'neutral'}`}>{c.status}</span>
                </div>
                <p className="muted" style={{ fontSize: 14.5 }}>{c.description}</p>
                {c.offerings?.length > 0 && (
                  <div className="small" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {c.offerings.map(([sem, n]) => <span key={sem} className="chip cyan"><Users size={12} /> {sem} · {n} students</span>)}
                  </div>
                )}
                <div className="course-actions">
                  {ACTIONS.filter((a) => c[a.key]).map(({ key, label, I, primary }) => (
                    <a key={key} className={`btn btn-sm ${primary ? 'btn-primary' : 'btn-ghost'}`} href={asset(c[key])} target="_blank" rel="noopener noreferrer"><I size={14} /> {label}</a>
                  ))}
                  {missing.length > 0 && <span className="soon" title={`Coming soon: ${missing.map((a) => a.label).join(', ')}`}>{missing.length === ACTIONS.length ? 'Course links coming soon' : 'More resources coming soon'}</span>}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 22, marginTop: 40 }}>
          <Reveal className="lab-box">
            <h3 style={{ fontSize: 20, marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}><Beaker size={20} /> Laboratories handled</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {labs.map((l) => (
                <li key={l.name} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-strong)' }}>{l.name}</span>{l.role && <span className="chip">{l.role}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 style={{ fontSize: 20, marginBottom: 14 }}>Certification courses & workshops (instructor)</h3>
            <div className="tbl-wrap">
              <table className="tbl" style={{ minWidth: 0 }}>
                <thead><tr><th scope="col">Year</th><th scope="col">Title</th><th scope="col" className="num">Duration</th><th scope="col" className="num">Participants</th></tr></thead>
                <tbody>
                  {certCourses.map((c) => (
                    <tr key={c.title}>
                      <td className="tnum">{c.year}</td>
                      <td>{c.title}{c.gallery && <> · <button className="tile-link" onClick={() => openLightbox(c.gallery.map((g, k) => ({ image: g, caption: `${c.title} — brochure page ${k + 1}` })))}>brochure</button></>}{c.link && <> · <a href={c.link} target="_blank" rel="noopener noreferrer">link</a></>}</td>
                      <td className="num">{c.duration}</td>
                      <td className="num">{c.participants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
