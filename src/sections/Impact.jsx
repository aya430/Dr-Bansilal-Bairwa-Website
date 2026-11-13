import { BookOpen, TrendingUp, Quote, FileText, Wallet, Trophy, Mic, Users } from 'lucide-react';
import { profile } from '../data/profile';
import { publications, publicationTypes } from '../data/publications';
import { events } from '../data/events';
import { researchAreas } from '../data/research';
import { SectionHead, Reveal, Counter, Tip } from '../components/ui';
import { BarChart, Donut, HBars } from '../components/Charts';
import { yearOf } from '../utils/helpers';
import { areaCount } from './Research';

const ICONS = { book: BookOpen, trend: TrendingUp, quote: Quote, file: FileText, wallet: Wallet, trophy: Trophy, mic: Mic, users: Users };

export function StatsBand() {
  return (
    <section className="stats-band" aria-label="Key numbers">
      <div className="container">
        <div className="stats-grid">
          {profile.metrics.map((mt) => {
            const I = ICONS[mt.icon] || BookOpen;
            return (
              <Reveal key={mt.key}>
                <span className="stat-ic"><I size={30} /></span>
                <div className="stat-val">{mt.value == null ? '—' : <Counter value={mt.value} />}{mt.suffix && <sup>{mt.suffix}</sup>}</div>
                <div className="stat-lbl">{mt.label} <Tip text={`Source: ${mt.source}${mt.asOf ? ` (${mt.asOf})` : ''}`} /></div>
              </Reveal>
            );
          })}
        </div>
        {profile.scholarNote && <p className="stats-note">{profile.scholarNote}</p>}
      </div>
    </section>
  );
}

export default function Impact() {
  const ys = publications.map((p) => p.year);
  const years = Array.from({ length: Math.max(...ys) - Math.min(...ys) + 1 }, (_, i) => Math.min(...ys) + i);
  const byYear = years.map((y) => ({ label: String(y), value: publications.filter((p) => p.year === y).length }));
  const types = Object.entries(publicationTypes).map(([k, v]) => ({ label: v, value: publications.filter((p) => p.type === k).length })).filter((d) => d.value);
  const areas = researchAreas.map((a) => ({ label: a.title, value: areaCount(a) })).sort((a, b) => b.value - a.value);
  const actYears = [...new Set(events.map((e) => yearOf(e.date)))].filter((y) => y >= 2019).sort();
  const activity = actYears.map((y) => ({ label: String(y), value: events.filter((e) => yearOf(e.date) === y).length }));
  return (
    <section id="impact" className="section">
      <div className="container">
        <SectionHead title={<>Research <span className="grad-text">Impact</span></>} sub="Computed live from the 90 publications and 68 professional activities listed on this site." />
        <div className="bento">
          <Reveal className="card chart-card span-2"><h3>Publications by year</h3><p className="chart-sub">All outputs listed on this site</p><BarChart data={byYear} label="Publications by year" /></Reveal>
          <Reveal className="card chart-card span-2" delay={0.05}><h3>Publication categories</h3><p className="chart-sub">By output type</p><Donut data={types} label="Publication categories" center="outputs" /></Reveal>
          <Reveal className="card chart-card span-2" delay={0.05}><h3>Research area distribution</h3><p className="chart-sub">Papers per area (a paper can belong to several)</p><HBars data={areas} /></Reveal>
          <Reveal className="card chart-card span-2" delay={0.1}><h3>Academic activity timeline</h3><p className="chart-sub">Talks, FDPs, conferences, reviews and events per year</p><BarChart data={activity} label="Academic activities by year" height={200} /></Reveal>
        </div>
      </div>
    </section>
  );
}
