// Resolve a path inside /public against the deployed base path (works on GitHub Pages sub-paths).
export const asset = (p) => (p ? (/^(https?:|mailto:|tel:)/.test(p) ? p : import.meta.env.BASE_URL + p.replace(/^\//, '')) : '');

// Images are stored as <name>.webp and <name>-sm.webp (thumbnail).
export const img = (p, small = false) => (p ? asset(`${p}${small ? '-sm' : ''}.webp`) : '');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDate(d) {
  if (!d) return '';
  const [y, m, day] = String(d).split('-');
  if (!m) return y;
  if (!day) return `${MONTHS[+m - 1]} ${y}`;
  return `${+day} ${MONTHS[+m - 1]} ${y}`;
}
export const yearOf = (d) => (d ? +String(d).slice(0, 4) : 0);

export const isSelf = (name) => /bairwa/i.test(name);

export function citationText(p) {
  const authors = p.authors.join(', ') + (p.authorsComplete ? '' : ', et al.');
  const parts = [`${authors}, “${p.title},”`, p.venue + (p.details ? `, ${p.details}` : ''), `${p.year}.`];
  let s = parts.join(' ');
  if (p.doi) s += ` doi: ${p.doi}.`;
  return s;
}

export function bibtex(p) {
  const key = (p.authors[0] || 'bairwa').split(' ').slice(-1)[0].toLowerCase().replace(/[^a-z]/g, '') + p.year + p.title.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
  const kind = p.type === 'journal' ? 'article' : p.type === 'thesis' ? 'phdthesis' : p.type === 'conference' ? 'inproceedings' : 'misc';
  const field = p.type === 'journal' ? 'journal' : p.type === 'conference' ? 'booktitle' : 'howpublished';
  const lines = [
    `  title = {${p.title}}`,
    `  author = {${p.authors.join(' and ')}${p.authorsComplete ? '' : ' and others'}}`,
    p.type === 'thesis' ? `  school = {Malaviya National Institute of Technology Jaipur}` : `  ${field} = {${p.venue}}`,
    `  year = {${p.year}}`,
    p.publisher ? `  publisher = {${p.publisher}}` : null,
    p.doi ? `  doi = {${p.doi}}` : null,
    p.url ? `  url = {${p.url}}` : null,
  ].filter(Boolean);
  return `@${kind}{${key},\n${lines.join(',\n')}\n}`;
}

export function scholarSearch(title) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;
}

export function downloadText(filename, text, type = 'text/plain') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove(); return ok;
  }
}

export const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

export function scrollToId(id, tries = 0) {
  const el = document.getElementById(id);
  if (!el || el.hasAttribute('data-placeholder')) {
    if (tries === 0) window.dispatchEvent(new Event('mount-all'));
    if (tries < 20) requestAnimationFrame(() => scrollToId(id, tries + 1));
    return;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
