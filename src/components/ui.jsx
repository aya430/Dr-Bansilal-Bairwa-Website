import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, Check, Info } from 'lucide-react';
import { img } from '../utils/helpers';

/* ---------------- App context: lightbox, toast, cross-section state ---------------- */
const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }) {
  const [lightbox, setLightbox] = useState(null); // {items:[{image,caption}], index}
  const [toastMsg, setToastMsg] = useState(null);
  const [pubQuery, setPubQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const toastTimer = useRef();

  const openLightbox = useCallback((items, index = 0) => setLightbox({ items, index }), []);
  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  return (
    <AppCtx.Provider value={{ openLightbox, toast, pubQuery, setPubQuery, searchOpen, setSearchOpen }}>
      {children}
      <Lightbox state={lightbox} setState={setLightbox} />
      <AnimatePresence>
        {toastMsg && (
          <m.div className="toast" role="status" initial={{ opacity: 0, y: 16, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 16, x: '-50%' }}>
            <Check size={16} /> {toastMsg}
          </m.div>
        )}
      </AnimatePresence>
    </AppCtx.Provider>
  );
}

/* ---------------- Focus trap + escape for dialogs ---------------- */
export function useDialog(open, onClose) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      const el = ref.current?.querySelector('[data-autofocus]') || ref.current?.querySelector('button, [href], input, select, textarea');
      el?.focus();
    }, 30);
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); }
      if (e.key === 'Tab' && ref.current) {
        const f = [...ref.current.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; prev?.focus?.({ preventScroll: true }); };
  }, [open]);
  return ref;
}

export function Modal({ open, onClose, label, children, className = '' }) {
  const ref = useDialog(open, onClose);
  return (
    <AnimatePresence>
      {open && (
        <m.div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <m.div ref={ref} role="dialog" aria-modal="true" aria-label={label} className={`modal ${className}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.22, ease: 'easeOut' }}>
            <button className="icon-btn modal-close" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Lightbox({ state, setState }) {
  const open = !!state;
  const close = useCallback(() => setState(null), [setState]);
  const ref = useDialog(open, close);
  const go = useCallback((d) => setState((s) => s && ({ ...s, index: (s.index + d + s.items.length) % s.items.length })), [setState]);
  useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, go]);
  const item = state?.items[state.index];
  return (
    <AnimatePresence>
      {open && item && (
        <m.div ref={ref} className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="lb-bar">
            <span className="tnum">{state.index + 1} / {state.items.length}</span>
            <span style={{ display: 'flex', gap: 8 }}>
              <a className="icon-btn" href={item.href || img(item.image)} download aria-label="Download image"><Download size={18} /></a>
              <button className="icon-btn" onClick={close} aria-label="Close preview" data-autofocus><X size={18} /></button>
            </span>
          </div>
          {state.items.length > 1 && (
            <>
              <button className="icon-btn lb-nav lb-prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
              <button className="icon-btn lb-nav lb-next" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
            </>
          )}
          <m.img key={item.image} src={item.href || img(item.image)} alt={item.caption || 'Preview'} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} />
          {item.caption && <p className="lb-cap">{item.caption}</p>}
        </m.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({ children, delay = 0, y = 18, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion();
  const C = m[as];
  if (reduce) return <C className={className} {...rest}>{children}</C>;
  return (
    <C className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} {...rest}>
      {children}
    </C>
  );
}

export function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <Reveal className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

export function Tip({ text, children }) {
  return (
    <span className="tip">
      {children || <button type="button" aria-label={text}><Info size={14} /></button>}
      <span className="tip-bubble" role="tooltip">{text}</span>
    </span>
  );
}

/* Animated counter */
export function Counter({ value, duration = 1.4 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) { setN(value); return; }
    const el = ref.current; if (!el) return;
    let raf, start;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / (duration * 1000));
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration, reduce]);
  return <span ref={ref}>{n}</span>;
}

/* Highlight matching text */
export function Hl({ text, q }) {
  if (!q || q.length < 2) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}
