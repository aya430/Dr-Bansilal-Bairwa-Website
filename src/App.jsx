import { useCallback, useEffect, useState } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { AppProvider } from './components/ui';
import Navbar, { Ticker } from './components/Navbar';
import Hero from './components/Hero';
import Footer, { ScrollToTop } from './components/Footer';
import SearchModal from './components/SearchModal';
import About from './sections/About';
import Research from './sections/Research';
import Impact, { StatsBand } from './sections/Impact';
import Updates from './sections/Updates';
import Publications from './sections/Publications';
import Patents from './sections/Patents';
import Projects from './sections/Projects';
import Mentoring from './sections/Mentoring';
import Teaching from './sections/Teaching';
import VirtualLabs from './sections/VirtualLabs';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Activities from './sections/Activities';
import Responsibilities from './sections/Responsibilities';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';

const SECTIONS = [
  ['updates', Updates], ['about', About], ['research', Research], ['stats', StatsBand], ['impact', Impact], ['publications', Publications], ['patents', Patents],
  ['projects', Projects], ['teaching', Teaching], ['virtual-labs', VirtualLabs], ['mentoring', Mentoring],
  ['achievements', Achievements], ['activities', Activities], ['responsibilities', Responsibilities], ['skills', Skills], ['gallery', Gallery], ['contact', Contact],
];
const idle = (fn) => (window.requestIdleCallback ? window.requestIdleCallback(fn, { timeout: 400 }) : setTimeout(fn, 32));

function initialTheme() {
  try { const s = localStorage.getItem('theme'); if (s === 'dark' || s === 'light') return s; } catch { /* storage unavailable */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b1220' : '#ffffff');
  }, [theme]);
  const toggleTheme = useCallback(() => {
    document.body.classList.add('theme-anim');
    setTheme((t) => { const n = t === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', n); } catch { /* ignore */ } return n; });
    setTimeout(() => document.body.classList.remove('theme-anim'), 450);
  }, []);

  // Below-the-fold sections mount one at a time during idle periods, so the
  // first paint is not blocked by one huge render. A deep link (#section) or a
  // navigation request mounts everything at once.
  const hashId = decodeURIComponent(location.hash.slice(1));
  const [mounted, setMounted] = useState(hashId && hashId !== 'home' ? SECTIONS.length : 1);
  useEffect(() => {
    const all = () => setMounted(SECTIONS.length);
    window.addEventListener('mount-all', all);
    return () => window.removeEventListener('mount-all', all);
  }, []);
  useEffect(() => {
    if (mounted >= SECTIONS.length) { window.dispatchEvent(new Event('sections-ready')); return; }
    const h = idle(() => setMounted((n) => n + 1));
    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(h) : clearTimeout(h));
  }, [mounted]);
  useEffect(() => {
    if (hashId && hashId !== 'home') setTimeout(() => document.getElementById(hashId)?.scrollIntoView(), 150);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <AppProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Ticker />
          <main id="main">
            <Hero />
            {SECTIONS.map(([id, C], i) => (i < mounted ? <C key={id} /> : <section key={id} id={id} data-placeholder="" className="section" style={{ minHeight: 700 }} aria-hidden="true" />))}
          </main>
          <Footer />
          <ScrollToTop />
          <SearchModal />
        </AppProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
