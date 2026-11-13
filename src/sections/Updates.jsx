import { useMemo, useState } from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { updates, linkedinUrl } from '../data/updates';
import { SectionHead, Reveal } from '../components/ui';
import { formatDate } from '../utils/helpers';
import Icon from '../components/Icon';

const TAG_ICON = { Talk: 'mic', Research: 'book', Award: 'trophy', Students: 'users', Event: 'calendar', Teaching: 'school', Milestone: 'rocket', Service: 'badge' };
const PAGE = 9;

export default function Updates() {
  const [tag, setTag] = useState('');
  const [year, setYear] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const tags = [...new Set(updates.map((u) => u.tag))];
  const years = [...new Set(updates.map((u) => u.date.slice(0, 4)))].sort().reverse();
  const list = useMemo(() => updates.filter((u) => (!tag || u.tag === tag) && (!year || u.date.startsWith(year))).sort((a, b) => b.date.localeCompare(a.date)), [tag, year]);
  return (
    <section id="updates" className="section">
      <div className="container">
        <SectionHead title={<>News & <span className="grad-text">Updates</span></>} sub="Highlights from my LinkedIn activity — talks, publications, awards, student achievements and events." />
        <Reveal className="results-line" style={{ marginTop: 0 }}>
          <div className="filters" role="group" aria-label="Filter updates by type">
            <button className="filter-chip" aria-pressed={!tag} onClick={() => { setTag(''); setLimit(PAGE); }}>All<span className="count">{updates.length}</span></button>
            {tags.map((t) => <button key={t} className="filter-chip" aria-pressed={tag === t} onClick={() => { setTag(tag === t ? '' : t); setLimit(PAGE); }}>{t}</button>)}
          </div>
          <select className="select" style={{ width: 'auto', minWidth: 140 }} value={year} onChange={(e) => { setYear(e.target.value); setLimit(PAGE); }} aria-label="Filter updates by year">
            <option value="">All years</option>{years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </Reveal>
        <div className="grid grid-3">
          {list.slice(0, limit).map((u, i) => (
            <Reveal key={u.date + u.title} delay={(i % 3) * 0.04} className="card hover update-card">
              <div className="uc-head">
                <span className="uc-ic"><Icon name={TAG_ICON[u.tag] || 'idea'} size={17} /></span>
                <span className="chip">{u.tag}</span>
                <span className="small muted tnum" style={{ marginLeft: 'auto' }}>{formatDate(u.date)}</span>
              </div>
              <h3>{u.title}</h3>
              <p className="small muted">{u.text}</p>
            </Reveal>
          ))}
        </div>
        {!list.length && <div className="empty-state">No updates for this filter.</div>}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
          {limit < list.length && <button className="btn btn-ghost" onClick={() => setLimit((l) => l + PAGE)}>Load more ({list.length - limit})</button>}
          <a className="btn btn-primary" href={linkedinUrl} target="_blank" rel="noopener noreferrer"><Newspaper size={16} /> All posts on LinkedIn <ExternalLink size={14} /></a>
        </div>
      </div>
    </section>
  );
}
