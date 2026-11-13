import { useMemo, useState } from 'react';
import { ExternalLink, Mic, Users, Gavel, ClipboardCheck, Presentation, GraduationCap, Wrench, Search } from 'lucide-react';
import { events, eventTypes } from '../data/events';
import { SectionHead, Reveal, useApp } from '../components/ui';
import { formatDate, img, norm, yearOf } from '../utils/helpers';

const TYPE_ICON = { 'Expert Talk': Mic, Organised: Users, 'Session Chair': Gavel, Reviewer: ClipboardCheck, Conference: Presentation, 'FDP Attended': GraduationCap, Workshop: Wrench };
const PAGE = 12;

export default function Activities() {
  const { openLightbox } = useApp();
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const years = [...new Set(events.map((e) => yearOf(e.date)))].sort((a, b) => b - a);
  const list = useMemo(() => events
    .filter((e) => (!type || e.type === type) && (!year || yearOf(e.date) === +year) && (!q || norm(`${e.title} ${e.host} ${e.role}`).includes(norm(q))))
    .sort((a, b) => b.date.localeCompare(a.date)), [type, year, q]);
  const shown = list.slice(0, limit);
  const gal = shown.filter((e) => e.image).map((e) => ({ image: e.image, caption: `${e.title} — ${e.host}` }));
  const counts = Object.fromEntries(eventTypes.map((t) => [t, events.filter((e) => e.type === t).length]));

  let lastYear = null;
  return (
    <section id="activities" className="section alt">
      <div className="container">
        <SectionHead title={<>Talks, FDPs & <span className="grad-text">Conferences</span></>}
          sub="Invited talks and FDP sessions, events organised, session-chair and reviewer roles, conference presentations and programmes attended." />
        <Reveal>
          <div className="filters" role="group" aria-label="Filter by activity type" style={{ marginBottom: 12 }}>
            <button className="filter-chip" aria-pressed={!type} onClick={() => { setType(''); setLimit(PAGE); }}>All<span className="count">{events.length}</span></button>
            {eventTypes.map((t) => <button key={t} className="filter-chip" aria-pressed={type === t} onClick={() => { setType(type === t ? '' : t); setLimit(PAGE); }}>{t}<span className="count">{counts[t]}</span></button>)}
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', maxWidth: 640 }}>
            <div className="input-wrap"><Search size={18} /><input className="input" type="search" placeholder="Search activities…" value={q} onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }} aria-label="Search activities" /></div>
            <select className="select" value={year} onChange={(e) => { setYear(e.target.value); setLimit(PAGE); }} aria-label="Filter by year">
              <option value="">All years</option>{years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </Reveal>
        <p className="results-line" aria-live="polite"><span>{list.length} activit{list.length === 1 ? 'y' : 'ies'}</span></p>
        <div className="act-list">
          {shown.map((e) => {
            const I = TYPE_ICON[e.type] || Mic;
            const y = yearOf(e.date);
            const sep = y !== lastYear; lastYear = y;
            return (
              <div key={e.type + e.date + e.title}>
                {sep && <div className="year-sep">{y}</div>}
                <div className="card hover act-item">
                  {e.image ? (
                    <button className="act-thumb" onClick={() => openLightbox(gal, gal.findIndex((g) => g.image === e.image))} aria-label={`View image: ${e.title}`}>
                      <img src={img(e.image, true)} alt="" loading="lazy" width="88" height="66" />
                    </button>
                  ) : <span className="act-thumb ph" aria-hidden="true"><I size={24} /></span>}
                  <div style={{ minWidth: 0 }}>
                    <div className="act-title">{e.title}</div>
                    <div className="act-meta">
                      <span className="chip"><I size={12} /> {e.type}</span>
                      <span className="tnum">{formatDate(e.date)}</span>
                      <span>{e.role}</span>
                      {e.level && <span className="chip neutral">{e.level}</span>}
                    </div>
                    <div className="small muted" style={{ marginTop: 4 }}>{e.host}</div>
                    {(e.certificateUrl || e.brochureUrl) && (
                      <div style={{ display: 'flex', gap: 12, marginTop: 6 }} className="small">
                        {e.certificateUrl && <a href={e.certificateUrl} target="_blank" rel="noopener noreferrer">Certificate <ExternalLink size={12} /></a>}
                        {e.brochureUrl && <a href={e.brochureUrl} target="_blank" rel="noopener noreferrer">Brochure <ExternalLink size={12} /></a>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!list.length && <div className="empty-state">No activities match these filters.</div>}
        {limit < list.length && <div style={{ textAlign: 'center', marginTop: 24 }}><button className="btn btn-ghost" onClick={() => setLimit((l) => l + PAGE)}>Show more ({list.length - limit} remaining)</button></div>}
      </div>
    </section>
  );
}
