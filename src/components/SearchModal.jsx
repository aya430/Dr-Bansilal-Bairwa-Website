import { useEffect, useMemo, useState } from 'react';
import { Search, BookOpen, FileText, Rocket, GraduationCap, Wrench, Trophy, Mic, X } from 'lucide-react';
import { publications } from '../data/publications';
import { patents } from '../data/patents';
import { projects } from '../data/projects';
import { courses } from '../data/courses';
import { skillGroups } from '../data/skills';
import { achievements, certifications } from '../data/achievements';
import { events } from '../data/events';
import { researchAreas } from '../data/research';
import { useApp, useDialog, Hl } from './ui';
import { norm, scrollToId } from '../utils/helpers';
import { AnimatePresence, m } from 'framer-motion';

const GROUPS = [
  { key: 'pub', label: 'Publications', I: BookOpen, section: 'publications' },
  { key: 'proj', label: 'Projects', I: Rocket, section: 'projects' },
  { key: 'course', label: 'Courses', I: GraduationCap, section: 'teaching' },
  { key: 'patent', label: 'Patents', I: FileText, section: 'patents' },
  { key: 'skill', label: 'Skills & research areas', I: Wrench, section: 'skills' },
  { key: 'award', label: 'Achievements', I: Trophy, section: 'achievements' },
  { key: 'event', label: 'Talks & activities', I: Mic, section: 'activities' },
];
const SUGGEST = ['battery', 'state of health', 'BLDC', 'Simulink', 'robot', 'KSCST', 'IEEE', 'patent'];

function buildIndex() {
  const idx = [];
  publications.forEach((p) => idx.push({ g: 'pub', t: p.title, s: `${p.venue.split('(')[0]} · ${p.year}`, text: `${p.title} ${p.venue} ${p.authors.join(' ')}`, pub: p.title }));
  projects.forEach((p) => idx.push({ g: 'proj', t: p.title, s: p.category, text: `${p.title} ${p.summary} ${p.tech.join(' ')}` }));
  courses.forEach((c) => idx.push({ g: 'course', t: c.title, s: [c.code, c.semester].filter(Boolean).join(' · '), text: `${c.title} ${c.code} ${c.category} ${c.description}` }));
  patents.forEach((p) => idx.push({ g: 'patent', t: p.title, s: `App. No. ${p.applicationNo}`, text: `${p.title} ${p.applicationNo} ${p.field}` }));
  skillGroups.forEach((g) => g.skills.forEach((s) => idx.push({ g: 'skill', t: s.name, s: g.title, text: `${s.name} ${g.title}` })));
  researchAreas.forEach((a) => idx.push({ g: 'skill', t: a.title, s: 'Research area', text: `${a.title} ${a.description} ${a.tech.join(' ')}`, section: 'research' }));
  achievements.forEach((a) => idx.push({ g: 'award', t: a.title, s: a.by, text: `${a.title} ${a.by} ${a.description}` }));
  certifications.forEach((c) => idx.push({ g: 'award', t: c.title, s: c.issuer, text: `${c.title} ${c.issuer}` }));
  events.forEach((e) => idx.push({ g: 'event', t: e.title, s: `${e.type} · ${e.host}`, text: `${e.title} ${e.host} ${e.type}` }));
  return idx.map((x) => ({ ...x, n: norm(x.text) }));
}

export default function SearchModal() {
  const { searchOpen, setSearchOpen, setPubQuery } = useApp();
  const [q, setQ] = useState('');
  const [act, setAct] = useState(0);
  const close = () => { setSearchOpen(false); };
  const ref = useDialog(searchOpen, close);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    const k = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); } if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName)) { e.preventDefault(); setSearchOpen(true); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [setSearchOpen]);
  useEffect(() => { if (!searchOpen) { setQ(''); setAct(0); } }, [searchOpen]);

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.filter((x) => terms.every((t) => x.n.includes(t))).slice(0, 40);
  }, [q, index]);
  const flat = GROUPS.flatMap((g) => results.filter((r) => r.g === g.key).slice(0, 6));

  const choose = (r) => {
    const g = GROUPS.find((x) => x.key === r.g);
    close();
    if (r.pub) setPubQuery(r.pub);
    setTimeout(() => scrollToId(r.section || g.section), 60);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setAct((a) => Math.min(flat.length - 1, a + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setAct((a) => Math.max(0, a - 1)); }
    if (e.key === 'Enter' && flat[act]) { e.preventDefault(); choose(flat[act]); }
  };

  let k = -1;
  return (
    <AnimatePresence>
      {searchOpen && (
        <m.div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <m.div ref={ref} className="modal search-modal" role="dialog" aria-modal="true" aria-label="Search the website" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div className="search-input-row">
              <Search size={20} aria-hidden="true" />
              <input data-autofocus value={q} onChange={(e) => { setQ(e.target.value); setAct(0); }} onKeyDown={onKey} placeholder="Search publications, projects, courses, skills…"
                aria-label="Search" role="combobox" aria-expanded={flat.length > 0} aria-controls="search-results" aria-activedescendant={flat[act] ? `sr-${act}` : undefined} />
              <button className="icon-btn" onClick={close} aria-label="Close search"><X size={18} /></button>
            </div>
            <div className="search-results" id="search-results" role="listbox" aria-label="Search results">
              {!q && (
                <>
                  <div className="search-group">Try searching for</div>
                  <div className="search-suggest">{SUGGEST.map((s) => <button key={s} className="filter-chip" onClick={() => setQ(s)}>{s}</button>)}</div>
                </>
              )}
              {q && !flat.length && <div className="empty-state" style={{ margin: 8 }}>No results for “{q}”. Try a broader term such as “battery” or “robot”.</div>}
              {GROUPS.map((g) => {
                const rs = results.filter((r) => r.g === g.key).slice(0, 6);
                if (!rs.length) return null;
                return (
                  <div key={g.key}>
                    <div className="search-group">{g.label}</div>
                    {rs.map((r) => { k++; const i = k; return (
                      <button key={g.key + r.t + i} id={`sr-${i}`} role="option" aria-selected={act === i} data-active={act === i} className="search-item" onMouseEnter={() => setAct(i)} onClick={() => choose(r)}>
                        <span className="si-ic"><g.I size={16} /></span>
                        <span><span className="si-t"><Hl text={r.t} q={q} /></span><br /><span className="si-s">{r.s}</span></span>
                      </button>
                    ); })}
                  </div>
                );
              })}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
