import { useMemo, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ZoomIn, ExternalLink, Download, FileText } from 'lucide-react';
import { patents } from '../data/patents';
import { profile } from '../data/profile';
import { SectionHead, Reveal, useApp } from '../components/ui';
import { formatDate, asset } from '../utils/helpers';

export default function Patents() {
  const { openLightbox } = useApp();
  const [status, setStatus] = useState('');
  const [year, setYear] = useState('');
  const statuses = [...new Set(patents.map((p) => p.status))];
  const years = [...new Set(patents.map((p) => p.year))].sort((a, b) => b - a);
  const list = useMemo(() => patents.filter((p) => (!status || p.status === status) && (!year || p.year === +year)), [status, year]);
  const fields = [...new Set(patents.map((p) => p.field))];
  const gallery = list.filter((p) => p.image).map((p) => ({ image: p.image, caption: `${p.title} — Application No. ${p.applicationNo}` }));

  return (
    <section id="patents" className="section">
      <div className="container">
        <SectionHead title={<>Patent <span className="grad-text">Portfolio</span></>}
          sub="Indian patent applications published by the Office of the Controller General of Patents, Designs & Trade Marks." />
        <Reveal className="bento" style={{ marginBottom: 22 }}>
          <div className="card kpi"><span className="kpi-val">{patents.length}</span><span className="kpi-label">Indian patent applications</span></div>
          <div className="card kpi"><span className="kpi-val">{patents.filter((p) => p.status === 'Published').length}</span><span className="kpi-label">Published applications</span></div>
          <div className="card kpi"><span className="kpi-val">{years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '—'}</span><span className="kpi-label">Filing years</span></div>
          <div className="card kpi"><span className="kpi-val">{fields.length}</span><span className="kpi-label">Technology fields</span></div>
        </Reveal>
        <div className="results-line" style={{ marginTop: 0 }}>
          <div className="filters" role="group" aria-label="Filter patents">
            <button className="filter-chip" aria-pressed={!status && !year} onClick={() => { setStatus(''); setYear(''); }}>All</button>
            {statuses.map((s) => <button key={s} className="filter-chip" aria-pressed={status === s} onClick={() => setStatus(status === s ? '' : s)}>{s}</button>)}
            {years.map((y) => <button key={y} className="filter-chip" aria-pressed={year === String(y)} onClick={() => setYear(year === String(y) ? '' : String(y))}>{y}</button>)}
          </div>
          {profile.documents.patentPortfolio && <a className="btn btn-ghost btn-sm" href={asset(profile.documents.patentPortfolio)} download><FileText size={14} /> Patent portfolio (PDF)</a>}
        </div>
        <div className="grid grid-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <m.article layout key={p.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="card hover patent-card">
                <div className="patent-head">
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="lbl2">Indian Patent · Application No.</div>
                    <div className="no">{p.applicationNo}</div>
                  </div>
                  <span className="pic" aria-hidden="true"><FileText size={20} /></span>
                </div>
                <div className="body">
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="chip success">{p.status}</span><span className="chip neutral">{p.field}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <dl className="kv">
                    <dt>Year</dt><dd>{p.year}</dd>
                    {p.filed && <><dt>Filed</dt><dd>{formatDate(p.filed)}</dd></>}
                    {p.published && <><dt>Published</dt><dd>{formatDate(p.published)}</dd></>}
                  </dl>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                    {p.image && <button className="btn btn-ghost btn-sm" onClick={() => openLightbox(gallery, gallery.findIndex((g) => g.image === p.image))}><ZoomIn size={14} /> View record</button>}
                    {p.documentUrl && <a className="btn btn-ghost btn-sm" href={p.documentUrl} target="_blank" rel="noopener noreferrer"><Download size={14} /> Document</a>}
                    <a className="btn btn-ghost btn-sm" href="https://iprsearch.ipindia.gov.in/PublicSearch/" target="_blank" rel="noopener noreferrer" title={`Search application ${p.applicationNo} on IP India`}>IP India <ExternalLink size={14} /></a>
                  </div>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
