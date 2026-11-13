import { useEffect, useMemo, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Search, Copy, ExternalLink, ChevronDown, Award, X, Download, FileText } from 'lucide-react';
import { publications, publicationTypes, publicationSummary } from '../data/publications';
import { researchAreas } from '../data/research';
import { profile } from '../data/profile';
import { SectionHead, Reveal, useApp, Hl } from '../components/ui';
import { citationText, bibtex, copyText, norm, scholarSearch, isSelf, downloadText, asset } from '../utils/helpers';

const PAGE = 8;

function PubCard({ p, q }) {
  const [open, setOpen] = useState(false);
  const [fmt, setFmt] = useState('text');
  const { toast } = useApp();
  const cite = fmt === 'text' ? citationText(p) : bibtex(p);
  const copy = async () => { const ok = await copyText(cite); toast(ok ? 'Citation copied to clipboard' : 'Copy failed — select the text manually'); };
  return (
    <m.article layout="position" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card hover pub-card">
      <div className="pub-year" aria-label={`Year ${p.year}`}>{p.year}</div>
      <div className="pub-body">
        <h3 className="pub-title"><Hl text={p.title} q={q} /></h3>
        <p className="pub-authors">
          {p.authors.map((a, i) => <span key={a + i}>{i > 0 && ', '}{isSelf(a) ? <b>{a}</b> : a}</span>)}
          {!p.authorsComplete && <span className="muted"> + co-authors</span>}
        </p>
        <p className="pub-venue"><Hl text={p.venue} q={q} />{p.details && <span>, {p.details}</span>}</p>
        <div className="pub-meta">
          <span className="chip">{publicationTypes[p.type]}</span>
          {p.indexing.map((ix) => <span key={ix} className="chip cyan">{ix}</span>)}
          {p.publisher && !p.indexing.some((ix) => ix.includes(p.publisher)) && <span className="chip neutral">{p.publisher}</span>}
          {p.award && <span className="chip gold"><Award size={13} /> {p.award}</span>}
        </div>
        <div className="pub-actions">
          {p.doi && <a className="btn btn-ghost btn-sm" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">DOI <ExternalLink size={14} /></a>}
          {p.url && <a className="btn btn-ghost btn-sm" href={p.url} target="_blank" rel="noopener noreferrer">Publisher page <ExternalLink size={14} /></a>}
          {!p.url && !p.doi && p.type !== 'other' && <a className="btn btn-ghost btn-sm" href={scholarSearch(p.title)} target="_blank" rel="noopener noreferrer">Find on Google Scholar <ExternalLink size={14} /></a>}
          <button className="btn btn-ghost btn-sm" onClick={copy}><Copy size={14} /> Copy citation</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            Details <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
              <div className="pub-extra">
                <div className="filters" role="group" aria-label="Citation format" style={{ marginBottom: 10 }}>
                  <button className="filter-chip" aria-pressed={fmt === 'text'} onClick={() => setFmt('text')}>IEEE-style text</button>
                  <button className="filter-chip" aria-pressed={fmt === 'bib'} onClick={() => setFmt('bib')}>BibTeX</button>
                </div>
                <code>{cite}</code>
                <p className="small muted" style={{ marginTop: 10 }}>
                  Research areas: {researchAreas.filter((a) => a.tags.some((t) => p.tags.includes(t))).map((a) => a.title).join(' · ') || '—'}
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.article>
  );
}

export default function Publications() {
  const { pubQuery, setPubQuery, toast } = useApp();
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [idx, setIdx] = useState('');
  const [sort, setSort] = useState('new');
  const [limit, setLimit] = useState(PAGE);

  // external requests (research cards, site search)
  useEffect(() => {
    if (!pubQuery) return;
    if (pubQuery.startsWith('area:')) { setArea(pubQuery.slice(5)); setQ(''); }
    else { setQ(pubQuery); setArea(''); }
    setYear(''); setType(''); setIdx(''); setLimit(PAGE);
    setPubQuery('');
  }, [pubQuery, setPubQuery]);

  const years = useMemo(() => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a), []);
  const indexes = useMemo(() => {
    const c = {};
    publications.forEach((p) => p.indexing.forEach((i) => { c[i] = (c[i] || 0) + 1; }));
    return Object.entries(c);
  }, []);
  const typeCounts = useMemo(() => Object.keys(publicationTypes).map((k) => [k, publications.filter((p) => p.type === k).length]).filter(([, n]) => n), []);

  const list = useMemo(() => {
    const nq = norm(q);
    let r = publications.filter((p) =>
      (!nq || norm(`${p.title} ${p.venue} ${p.authors.join(' ')} ${p.publisher}`).includes(nq)) &&
      (!area || p.tags.some((t) => (researchAreas.find((a) => a.key === area)?.tags || []).includes(t))) && (!year || p.year === +year) && (!type || p.type === type) && (!idx || p.indexing.includes(idx)));
    r = [...r].sort((a, b) => (sort === 'new' ? b.year - a.year : sort === 'old' ? a.year - b.year : a.title.localeCompare(b.title)));
    return r;
  }, [q, area, year, type, idx, sort]);

  const reset = () => { setQ(''); setArea(''); setYear(''); setType(''); setIdx(''); setSort('new'); setLimit(PAGE); };
  const active = q || area || year || type || idx;
  const areaName = researchAreas.find((a) => a.key === area)?.title;

  const exportBib = () => { downloadText('bansilal-bairwa-publications.bib', list.map(bibtex).join('\n\n'), 'application/x-bibtex'); toast(`Exported ${list.length} BibTeX entries`); };

  return (
    <section id="publications" className="section alt">
      <div className="container">
        <SectionHead title={<>Research <span className="grad-text">Publications</span></>}
          sub={publicationSummary} />
        <Reveal>
          <div className="pub-toolbar" role="search">
            <div className="input-wrap">
              <Search size={18} />
              <input className="input" type="search" placeholder="Search title, journal, conference or author…" value={q} onChange={(e) => { setQ(e.target.value); setLimit(PAGE); }} aria-label="Search publications" />
            </div>
            <select className="select" value={type} onChange={(e) => { setType(e.target.value); setLimit(PAGE); }} aria-label="Filter by publication type">
              <option value="">All types</option>
              {typeCounts.map(([k, n]) => <option key={k} value={k}>{publicationTypes[k]} ({n})</option>)}
            </select>
            <select className="select" value={year} onChange={(e) => { setYear(e.target.value); setLimit(PAGE); }} aria-label="Filter by year">
              <option value="">All years</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort publications">
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
              <option value="az">Title A–Z</option>
            </select>
          </div>
          <div className="filters" role="group" aria-label="Filter by indexing">
            <button className="filter-chip" aria-pressed={!idx} onClick={() => setIdx('')}>All indexing</button>
            {indexes.map(([k, n]) => <button key={k} className="filter-chip" aria-pressed={idx === k} onClick={() => { setIdx(idx === k ? '' : k); setLimit(PAGE); }}>{k}<span className="count">{n}</span></button>)}
            {area && <button className="filter-chip" aria-pressed="true" onClick={() => setArea('')}>Area: {areaName} <X size={13} /></button>}
          </div>
        </Reveal>
        <div className="results-line" aria-live="polite">
          <span>Showing <b className="tnum">{Math.min(limit, list.length)}</b> of <b className="tnum">{list.length}</b> publications{active ? ' (filtered)' : ''}</span>
          <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {active && <button className="btn btn-ghost btn-sm" onClick={reset}><X size={14} /> Clear filters</button>}
            <button className="btn btn-ghost btn-sm" onClick={exportBib} disabled={!list.length}><Download size={14} /> Export BibTeX</button>
            {profile.documents.publicationList && <a className="btn btn-ghost btn-sm" href={asset(profile.documents.publicationList)} download><FileText size={14} /> Publication list (PDF)</a>}
          </span>
        </div>
        <div className="grid" style={{ gap: 14 }}>
          <AnimatePresence mode="popLayout">
            {list.slice(0, limit).map((p) => <PubCard key={p.id} p={p} q={q} />)}
          </AnimatePresence>
        </div>
        {!list.length && <div className="empty-state">No publications match these filters. <button className="tile-link" onClick={reset}>Clear filters</button></div>}
        {limit < list.length && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={() => setLimit((l) => l + PAGE)}>Load more ({list.length - limit} remaining)</button>
          </div>
        )}
      </div>
    </section>
  );
}
