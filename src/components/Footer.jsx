import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { socialLinks } from '../data/socialLinks';
import { ALL_LINKS } from './Navbar';
import Icon from './Icon';
import { scrollToId, asset } from '../utils/helpers';

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', f, { passive: true }); f();
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <m.button className="to-top" aria-label="Back to top" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
          onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); history.replaceState(null, '', '#home'); }}>
          <ArrowUp size={20} />
        </m.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const go = (e, id) => { e.preventDefault(); scrollToId(id); };
  const quick = ALL_LINKS.filter((l) => l.id !== 'home');
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="f-brand">{profile.brand}</div>
            <p>Thank you for visiting my website. Connect with me for research collaboration, invited talks, FDPs and student projects in batteries, EVs, AI and robotics.</p>
            <div className="f-social">
              {socialLinks.filter((s) => s.url && ['linkedin', 'scholar', 'scopus', 'researchgate', 'ieee'].includes(s.id)).map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}><Icon name={s.icon} size={16} /></a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="fh">Quick links</h2>
            <ul style={{ gridTemplateColumns: '1fr 1fr' }}>
              {quick.map((n) => <li key={n.id}><a href={`#${n.id}`} onClick={(e) => go(e, n.id)}>{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="fh">Contact info</h2>
            <ul className="footer-contact">
              <li><b>Phone :</b><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></li>
              <li><b>Email :</b><span>{profile.emails.map((e) => <a key={e} href={`mailto:${e}`} style={{ display: 'block' }}>{e}</a>)}</span></li>
              <li><b>Address :</b><span>{profile.school}, {profile.institution}, {profile.location}</span></li>
              {profile.documents.cv && <li><b>CV :</b><a href={asset(profile.documents.cv)} target="_blank" rel="noopener noreferrer">Download (PDF)</a></li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© Copyright <b>{profile.brand}</b>. All Rights Reserved {new Date().getFullYear()} · {profile.school}, {profile.institution}</div>
      </div>
    </footer>
  );
}
