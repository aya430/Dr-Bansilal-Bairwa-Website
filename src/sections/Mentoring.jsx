import { useState } from 'react';
import { ExternalLink, Wallet, Users, GraduationCap, Award } from 'lucide-react';
import { fundedProjects, supervisionSummary, supervision } from '../data/projects';
import { kscstCoordination } from '../data/experience';
import { SectionHead, Reveal } from '../components/ui';

const inr = (n) => '₹' + n.toLocaleString('en-IN');

export default function Mentoring() {
  const [role, setRole] = useState('');
  const list = fundedProjects.filter((f) => !role || f.role === role);
  const total = fundedProjects.reduce((a, b) => a + b.amount, 0);
  const pi = fundedProjects.filter((f) => f.role === 'PI').length;
  const ug = supervisionSummary.reduce((a, b) => a + b.ug, 0), pg = supervisionSummary.reduce((a, b) => a + b.pg, 0);
  const coordTotal = kscstCoordination.reduce((a, b) => a + b.projects, 0);
  return (
    <section id="mentoring" className="section alt">
      <div className="container">
        <SectionHead title={<>KSCST Projects & <span className="grad-text">Student Mentoring</span></>}
          sub="Student research projects funded by the Karnataka State Council for Science and Technology (KSCST), and UG/PG supervision." />
        <div className="bento" style={{ marginBottom: 24 }}>
          <Reveal className="card kpi featured"><span className="kpi-ic"><Wallet size={19} /></span><span className="kpi-val">{fundedProjects.length}</span><span className="kpi-label">KSCST-funded projects ({pi} as PI)</span></Reveal>
          <Reveal className="card kpi" delay={0.04}><span className="kpi-ic"><Award size={19} /></span><span className="kpi-val">{inr(total)}</span><span className="kpi-label">Total sanctioned</span></Reveal>
          <Reveal className="card kpi" delay={0.08}><span className="kpi-ic"><GraduationCap size={19} /></span><span className="kpi-val">{ug} / {pg}</span><span className="kpi-label">UG / PG projects guided (2021–2025)</span></Reveal>
          <Reveal className="card kpi" delay={0.12}><span className="kpi-ic"><Users size={19} /></span><span className="kpi-val">{coordTotal}</span><span className="kpi-label">School KSCST projects coordinated (2021–25)</span></Reveal>
        </div>

        <div className="results-line"><h3 style={{ fontSize: 19 }}>KSCST-funded projects</h3>
          <div className="filters" role="group" aria-label="Filter by role">{['', 'PI', 'Co-PI'].map((r) => <button key={r || 'all'} className="filter-chip" aria-pressed={role === r} onClick={() => setRole(r)}>{r || 'All'}</button>)}</div>
        </div>
        <Reveal className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th scope="col">Year</th><th scope="col">Project title</th><th scope="col">Code</th><th scope="col">Role</th><th scope="col" className="num">Amount</th></tr></thead>
            <tbody>
              {list.map((f) => (
                <tr key={f.title}>
                  <td className="tnum">{f.year}</td>
                  <td style={{ color: 'var(--text-strong)', fontWeight: 500 }}>{f.title}{f.sanctionUrl && <> · <a href={f.sanctionUrl} target="_blank" rel="noopener noreferrer" className="small">sanction order <ExternalLink size={11} /></a></>}</td>
                  <td className="tnum small">{f.code || '—'}</td>
                  <td><span className={`chip${f.role === 'PI' ? '' : ' cyan'}`}>{f.role}</span></td>
                  <td className="num">{inr(f.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><td colSpan={4}>Total ({list.length} projects)</td><td className="num">{inr(list.reduce((a, b) => a + b.amount, 0))}</td></tr></tfoot>
          </table>
        </Reveal>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 22, marginTop: 36 }}>
          <Reveal>
            <h3 style={{ fontSize: 19, marginBottom: 12 }}>KSCST Project Coordinator (school level)</h3>
            <div className="tbl-wrap"><table className="tbl" style={{ minWidth: 0 }}>
              <thead><tr><th scope="col">Year</th><th scope="col" className="num">Projects</th><th scope="col" className="num">Amount</th><th scope="col">Remark</th></tr></thead>
              <tbody>{kscstCoordination.map((k) => <tr key={k.year}><td className="tnum">{k.year}</td><td className="num">{k.projects}</td><td className="num">{inr(k.amount)}</td><td>{k.remark && <span className="chip gold">{k.remark}</span>}</td></tr>)}</tbody>
            </table></div>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 style={{ fontSize: 19, marginBottom: 12 }}>Research supervision</h3>
            <div className="tbl-wrap"><table className="tbl" style={{ minWidth: 0 }}>
              <thead><tr><th scope="col">Year</th><th scope="col" className="num">UG</th><th scope="col" className="num">PG</th><th scope="col">Major outcomes</th></tr></thead>
              <tbody>{supervisionSummary.map((s) => <tr key={s.year}><td className="tnum">{s.year}</td><td className="num">{s.ug}</td><td className="num">{s.pg || '–'}</td><td className="small">{s.outcome}</td></tr>)}</tbody>
            </table></div>
          </Reveal>
        </div>

        <details style={{ marginTop: 26 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--accent-text)' }}>Supervised projects with IEEE / AIP publications ({supervision.length})</summary>
          <div className="tbl-wrap" style={{ marginTop: 12 }}><table className="tbl">
            <thead><tr><th scope="col">Year</th><th scope="col">Project</th><th scope="col">Level</th><th scope="col">Output</th></tr></thead>
            <tbody>{[...supervision].sort((a, b) => b.year - a.year).map((s) => <tr key={s.title}><td className="tnum">{s.year}</td><td>{s.title}</td><td><span className="chip">{s.level}</span></td><td>{s.paperUrl ? <a href={s.paperUrl} target="_blank" rel="noopener noreferrer">Paper <ExternalLink size={11} /></a> : '—'}</td></tr>)}</tbody>
          </table></div>
        </details>
      </div>
    </section>
  );
}
