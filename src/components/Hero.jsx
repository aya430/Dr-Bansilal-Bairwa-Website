import { useEffect, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { socialLinks } from '../data/socialLinks';
import Icon from './Icon';
import { asset, img, scrollToId } from '../utils/helpers';

function useTyping(words, reduce) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState(reduce ? words[0] : '');
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce) { const t = setInterval(() => setI((x) => (x + 1) % words.length), 2800); return () => clearInterval(t); }
    const w = words[i];
    let t;
    if (!del && txt === w) t = setTimeout(() => setDel(true), 1700);
    else if (del && txt === '') { setDel(false); setI((x) => (x + 1) % words.length); }
    else t = setTimeout(() => setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1)), del ? 28 : 55);
    return () => clearTimeout(t);
  }, [txt, del, i, words, reduce]);
  return reduce ? words[i] : txt;
}

function Carousel({ slides, reduce }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, reduce, n]);
  const s = slides[i];
  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      role="region" aria-roledescription="carousel" aria-label="Photos">
      <AnimatePresence initial={false}>
        <m.div key={s.image} className={`carousel-slide${i === 0 ? ' is-portrait' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}>
          <img src={img(s.image)} alt={s.caption} {...(i === 0 ? { fetchpriority: 'high' } : { loading: 'lazy' })} />
          {i > 0 && <div className="carousel-cap">{s.caption}</div>}
        </m.div>
      </AnimatePresence>
      {n > 1 && (
        <>
          <button className="carousel-btn prev" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous photo"><ChevronLeft size={20} /></button>
          <button className="carousel-btn next" onClick={() => setI((i + 1) % n)} aria-label="Next photo"><ChevronRight size={20} /></button>
          <div className="carousel-dots">
            {slides.map((sl, k) => <button key={sl.image} aria-label={`Show photo ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const role = useTyping(profile.roles, reduce);
  const links = socialLinks.filter((s) => s.url && ['linkedin', 'scholar', 'scopus', 'ieee', 'researchgate'].includes(s.id));
  const mv = (k) => profile.metrics.find((x) => x.key === k);
  const fade = (d) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="container hero-inner">
        <div>
          <m.h1 {...fade(0)}>{profile.greeting} {profile.firstName}<span className="last">{profile.lastName}</span></m.h1>
          <m.div {...fade(0.08)}><span className="badge-role">{profile.designation}</span></m.div>
          <m.p className="hero-dept" {...fade(0.12)}>{profile.school}<br /><span>{profile.institution}, <MapPin size={14} style={{ verticalAlign: -2 }} /> {profile.location}</span></m.p>
          <m.p className="hero-role" {...fade(0.18)}>
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true"><span className="rot">{role}</span>{!reduce && <span className="caret" />}</span>
          </m.p>
          <m.p className="hero-intro" {...fade(0.24)} style={{ fontSize: 16.5 }}>{profile.intro}</m.p>
          <m.div className="hero-cta" {...fade(0.3)}>
            <a href="#about" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToId('about'); }}>About Me</a>
            {profile.documents.cv && <a href={asset(profile.documents.cv)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>}
          </m.div>
          <m.div className="round-social" {...fade(0.36)} aria-label="Academic profiles">
            {links.map((s) => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}><Icon name={s.icon} size={17} /></a>)}
          </m.div>
        </div>
        <m.div initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <Carousel slides={profile.heroSlides} reduce={reduce} />
          <div className="hero-quick">
            {['scopus', 'citations', 'hindex'].map((k) => (
              <div key={k}><b>{mv(k)?.value ?? '—'}{mv(k)?.suffix}</b><span>{mv(k)?.label}</span></div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
