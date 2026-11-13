import { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Moon, Sun, Search, ChevronDown, Megaphone } from 'lucide-react';
import { profile } from '../data/profile';
import { useApp } from './ui';
import { scrollToId } from '../utils/helpers';

// Menu structure. Items with `children` become dropdowns.
export const MENU = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { label: 'Research', children: [
    { id: 'research', label: 'Research Areas' },
    { id: 'impact', label: 'Research Impact' },
    { id: 'publications', label: 'Publications' },
    { id: 'patents', label: 'Patents' },
    { id: 'projects', label: 'Projects & Innovations' },
  ] },
  { label: 'Teaching', children: [
    { id: 'teaching', label: 'Courses & Labs' },
    { id: 'virtual-labs', label: 'Virtual Labs' },
    { id: 'mentoring', label: 'KSCST Projects & Students' },
  ] },
  { label: 'Outreach', children: [
    { id: 'activities', label: 'Talks, FDPs & Conferences' },
    { id: 'responsibilities', label: 'Roles & Service' },
    { id: 'skills', label: 'Technical Skills' },
  ] },
  { id: 'achievements', label: 'Awards' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];
export const ALL_LINKS = MENU.flatMap((x) => x.children || [x]);
// kept for older imports
export const NAV = ALL_LINKS;
export const MORE = [];

function Dropdown({ item, active, go }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = item.children.some((c) => c.id === active);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="dropdown" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`nav-link${isActive ? ' active' : ''}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
        {item.label} <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>
      <AnimatePresence>
        {open && (
          <m.div className="dropdown-menu" style={{ left: 0, right: 'auto', top: '100%' }} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
            {item.children.map((c) => <a key={c.id} href={`#${c.id}`} onClick={(e) => { setOpen(false); go(e, c.id); }}>{c.label}</a>)}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Ticker() {
  const items = profile.news || [];
  if (!items.length) return null;
  const row = items.flatMap((t, i) => [<span key={`t${i}`} className="ticker-item">{t}</span>, <span key={`s${i}`} className="ticker-sep" aria-hidden="true">|</span>]);
  return (
    <div className="ticker" role="region" aria-label="Latest news">
      <span className="ticker-label"><Megaphone size={14} /> News</span>
      <div className="ticker-track" tabIndex={0}>
        {row}<span aria-hidden="true" style={{ display: 'contents' }}>{row.map((el, i) => <span key={`d${i}`} className={el.props.className}>{el.props.children}</span>)}</span>
      </div>
    </div>
  );
}

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { setSearchOpen } = useApp();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const ids = ALL_LINKS.map((n) => n.id);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    const observe = () => { obs.disconnect(); ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); }); };
    observe();
    window.addEventListener('sections-ready', observe);
    return () => { obs.disconnect(); window.removeEventListener('sections-ready', observe); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const go = (e, id) => { e.preventDefault(); setOpen(false); scrollToId(id); };

  return (
    <header className="nav scrolled">
      <nav className="container nav-inner" aria-label="Main">
        <a href="#home" className="brand" onClick={(e) => go(e, 'home')}>
          <span className="brand-pill">{profile.brand}</span>
        </a>
        <div className="nav-links">
          {MENU.map((n) => n.children
            ? <Dropdown key={n.label} item={n} active={active} go={go} />
            : <a key={n.id} href={`#${n.id}`} className={`nav-link${active === n.id ? ' active' : ''}`} aria-current={active === n.id ? 'true' : undefined} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
        </div>
        <div className="nav-actions">
          <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search the website">
            <Search size={16} /> <span className="st-label">Search</span> <kbd>Ctrl K</kbd>
          </button>
          <button className="icon-btn menu-search" onClick={() => setSearchOpen(true)} aria-label="Search the website"><Search size={18} /></button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <m.div className="progress-bar" style={{ scaleX }} aria-hidden="true" />
      <AnimatePresence>
        {open && (
          <m.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {MENU.map((n) => n.children ? (
              <div key={n.label}>
                <div className="group-label">{n.label}</div>
                {n.children.map((c) => <a key={c.id} href={`#${c.id}`} className={active === c.id ? 'active' : ''} onClick={(e) => go(e, c.id)}>{c.label}</a>)}
              </div>
            ) : <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={(e) => go(e, n.id)}>{n.label}</a>)}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
