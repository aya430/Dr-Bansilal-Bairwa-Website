import { useState } from 'react';
import { gallery } from '../data/gallery';
import { SectionHead, Reveal, useApp } from '../components/ui';
import { img } from '../utils/helpers';

export default function Gallery() {
  const { openLightbox } = useApp();
  const [tag, setTag] = useState('');
  const tags = [...new Set(gallery.map((g) => g.tag))];
  const list = gallery.filter((g) => !tag || g.tag === tag);
  return (
    <section id="gallery" className="section alt">
      <div className="container">
        <SectionHead title={<>Photo <span className="grad-text">Gallery</span></>} sub="Moments from talks, awards, conferences and campus." />
        <Reveal className="filters" role="group" aria-label="Filter gallery" style={{ marginBottom: 20 }}>
          <button className="filter-chip" aria-pressed={!tag} onClick={() => setTag('')}>All</button>
          {tags.map((t) => <button key={t} className="filter-chip" aria-pressed={tag === t} onClick={() => setTag(tag === t ? '' : t)}>{t}</button>)}
        </Reveal>
        <div className="masonry">
          {list.map((g, i) => (
            <figure key={g.image}>
              <button onClick={() => openLightbox(list, i)} aria-label={`Open image: ${g.caption}`}>
                <img src={img(g.image, true)} alt={g.caption} loading="lazy" />
              </button>
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
