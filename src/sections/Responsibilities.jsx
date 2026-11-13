import { Gavel, ClipboardCheck, CalendarCheck } from 'lucide-react';
import { responsibilities, service, sdps, memberships } from '../data/experience';
import { SectionHead, Reveal } from '../components/ui';
import Icon from '../components/Icon';

export default function Responsibilities() {
  return (
    <section id="responsibilities" className="section">
      <div className="container">
        <SectionHead title={<>Roles & <span className="grad-text">Professional Service</span></>} sub="Academic and administrative responsibilities, conference service and programmes organised." />
        <div className="grid grid-4">
          {responsibilities.map((r, i) => (
            <Reveal key={r.role} delay={(i % 4) * 0.04} className="card hover card-pad" style={{ display: 'grid', gap: 8, alignContent: 'start', borderTop: '3px solid var(--accent)' }}>
              <span style={{ width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent-text)' }}><Icon name={r.icon} size={20} /></span>
              <h3 style={{ fontSize: 16 }}>{r.role}</h3>
              <div className="small" style={{ color: 'var(--cyan-text)', fontWeight: 600 }}>{r.org}</div>
              <p className="small muted">{r.detail}</p>
            </Reveal>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, marginTop: 32 }}>
          {[['Session Chair', Gavel, service.sessionChair], ['Reviewer', ClipboardCheck, service.reviewer], ['Conferences & FDPs organised', CalendarCheck, service.organised]].map(([t, I, items], k) => (
            <Reveal key={t} delay={k * 0.05} className="lab-box" style={{ padding: 22 }}>
              <h3 style={{ fontSize: 17, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}><I size={19} /> {t}</h3>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6, fontSize: 14.5 }}>{items.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 22, marginTop: 32 }}>
          <Reveal>
            <h3 style={{ fontSize: 18, marginBottom: 12 }}>Skill Development Programmes (Coordinator)</h3>
            <div className="tbl-wrap"><table className="tbl" style={{ minWidth: 0 }}>
              <thead><tr><th scope="col">Year</th><th scope="col">Programme</th><th scope="col" className="num">Days</th><th scope="col" className="num">Participants</th></tr></thead>
              <tbody>{sdps.map((s) => <tr key={s.title}><td className="tnum">{s.year}</td><td>{s.title}</td><td className="num">{s.days}</td><td className="num">{s.participants}</td></tr>)}</tbody>
            </table></div>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 style={{ fontSize: 18, marginBottom: 12 }}>Professional memberships</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              {memberships.map((m) => <div key={m.name} className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', gap: 10 }}><b style={{ color: 'var(--text-strong)' }}>{m.name}</b><span className="small muted">{m.detail} · since {m.since}</span></div>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
