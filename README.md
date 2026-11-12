# Dr. Bansilal Bairwa — Academic Portfolio Website

A fast, responsive, data-driven academic website for **Dr. Bansilal Bairwa**, Assistant Professor, School of Electrical and Electronics Engineering, REVA University, Bengaluru. It is built with React and Vite and deploys to GitHub Pages.

**Sections:** Home · About (bio, education & experience timelines, memberships) · Research interests (bento grid) · Research impact dashboard (KPIs + live charts) · Publications (search, filters, sort, load-more, copy citation, BibTeX export) · Patents (filters, record preview) · Projects (detail modals) · Funded projects & student mentoring · Teaching (course cards with editable links) · Virtual labs (live previews + three interactive demos) · Technical skills · Awards & certifications (lightbox gallery) · Talks, FDPs & conferences (year/type filters) · Responsibilities · Media gallery · Contact (validated mailto form).

**Site-wide:** light/dark theme, sticky nav with active-section highlight and scroll progress, mobile menu, site-wide search (`Ctrl K` or `/`), back-to-top button, reduced-motion support, keyboard-accessible dialogs, SEO meta and JSON-LD.

---

## Technology stack

| Purpose | Library |
|---|---|
| UI | React 18, JSX |
| Build | Vite |
| Animation | Framer Motion (`LazyMotion`, respects reduced-motion) |
| Icons | lucide-react (plus inline GitHub/LinkedIn SVGs) |
| 3D | Three.js, loaded only when the robot-arm demo is opened |
| Charts | Hand-written SVG components (no chart library needed) |
| Styling | Plain CSS with CSS variables (`src/styles/global.css`) |
| Fonts | Roboto (headings/body) + Poppins (navigation), self-hosted via `@fontsource` |

## Project structure

```
public/
  images/<category>/img_XXX.webp   full-size image   (≤1280 px)
  images/<category>/img_XXX-sm.webp thumbnail       (≤560 px)
  images/profile/profile.webp      ← your profile photo
  documents/                       ← put PDFs here (CV, syllabi …)
  og-image.jpg  favicon.svg  robots.txt  sitemap.xml  .nojekyll
src/
  data/        ← ALL editable content lives here
  sections/    one component per page section
  components/  Navbar, Hero, search, charts, modals, icons …
  demos/       BatterySim, RobotArm (Three.js), EnergyFlow
  styles/global.css
.github/workflows/deploy.yml       automatic GitHub Pages deployment
```

---

## Installation & development

You need Node.js 20 or newer.

```bash
npm install        # once
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deploying to GitHub Pages

1. Create a GitHub repository (for example `academic-website`) and push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Academic website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repository>.git
   git push -u origin main
   ```
2. On GitHub, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`. The address will be `https://<your-username>.github.io/<repository>/`.
4. After the first deployment:
   - set `siteUrl` in `src/data/profile.js`,
   - replace the placeholder URL in `public/sitemap.xml`,
   - uncomment the `Sitemap:` line in `public/robots.txt`.

**Base path:** `vite.config.js` uses `base: './'`, so the build works at any sub-path (a project page, a user page or a custom domain) with no changes. Navigation uses in-page `#anchors`, not client-side routes, so refreshing or opening a deep link never returns a 404.

---

## Updating the content

Every piece of content comes from the files in **`src/data/`**. You do not need to touch any component. Each file starts with comments describing its fields.

| To change… | Edit |
|---|---|
| Name, bio, photo, e-mails, **headline metrics**, CV/PDF downloads | `profile.js` |
| Social / academic profile links (ORCID, Scopus, GitHub …) | `socialLinks.js` |
| Publications | `publications.js` |
| Patents | `patents.js` |
| **Courses and course links** | `courses.js` |
| Research areas (bento grid) | `research.js` |
| Projects, KSCST-funded projects, supervised projects | `projects.js` |
| Awards and certifications | `achievements.js` |
| Education, experience, responsibilities, memberships | `experience.js` |
| Talks, FDPs, workshops, conferences, reviewer roles | `events.js` |
| Virtual labs | `virtualLabs.js` |
| Skills | `skills.js` |
| Gallery | `gallery.js` |
| News & Updates (from LinkedIn) and the scrolling ticker | `updates.js`, `profile.js` → `news` |
| Hero photo carousel | `profile.js` → `heroSlides` |

### Course links (`src/data/courses.js`)

Each course has five link fields. Paste a URL between the quotes and the matching button appears automatically. An empty field shows *"coming soon"* instead; the site never shows a dead button.

```js
courseLink: 'https://…',      // "View Course"
syllabusLink: 'https://…',    // "Syllabus"
notesLink: 'https://…',       // "Lecture Notes"
videoLink: 'https://…',       // "Video Lectures"
virtualLabLink: 'https://…',  // "Virtual Lab"
```
For a file stored inside the site, put it in `public/documents/` and use a relative path such as `'documents/B24EES502-syllabus.pdf'`.

### Adding a publication (`src/data/publications.js`)

Copy one entry and edit it:
```js
{
  id: 'p-2026-example',             // any unique id
  title: 'Paper title',
  authors: ['Bansilal Bairwa', 'Co-author'],
  authorsComplete: true,            // false shows "+ co-authors"
  venue: 'Journal or conference name',
  details: 'Vol. 12, pp. 1–10',
  year: 2026,
  type: 'journal',                  // journal | conference | book-chapter | thesis | other
  publisher: 'Elsevier',
  indexing: ['SCIE', 'Scopus'],     // drives the indexing filter chips
  doi: '10.xxxx/xxxxx',             // without https://doi.org/
  url: 'https://publisher-page',
  tags: ['battery', 'soh'],         // research-area keys from research.js
  award: '',                        // e.g. 'Best Paper Award'
},
```
The year chart, category chart, research-area counts, search and filters all update by themselves.

### Updating research metrics (`src/data/profile.js` → `metrics`)

Set `value` to a number. `null` displays **"Update required"**. `source` and `asOf` appear in the ⓘ tooltip on each card.

### Replacing the profile photo

Overwrite `public/images/profile/profile.webp` with a portrait of about 600 × 660 px. Keeping the same file name means no code changes. For social previews, also update `public/og-image.jpg` (1200 × 630).

### Adding the CV and other PDFs

Copy the file to `public/documents/`, for example `Bansilal-Bairwa-CV.pdf`, then set it in `profile.js`:
```js
documents: { cv: 'documents/Bansilal-Bairwa-CV.pdf', researchProfile: '', publicationList: '', patentPortfolio: '' }
```
The hero's **Download CV** button and the other download buttons appear only when a path is set.

### Adding images

Save images as WebP in two sizes, `name.webp` (≤1280 px wide) and `name-sm.webp` (≤560 px), inside a folder under `public/images/`. Then reference them in the data files **without the extension**, for example `image: 'images/awards/my-award'`.

### Contact form

GitHub Pages has no server, so the form validates the input and opens the visitor's own e-mail app with the message pre-filled. It does not pretend to send anything. To receive submissions directly, connect a form service such as Formspree inside `handleSubmit` in `src/sections/Contact.jsx`.

---

## Content sources & items to verify

Version 2 (12 Nov 2026) was rebuilt from:
- **Updated CV** (`public/documents/Bansilal-Bairwa-CV.pdf`, also used by the **Resume** button): metrics (Scopus export of 05 Oct 2026), education, experience, 8 awards, 12 KSCST projects, 8 patents, 26 invited talks, teaching, certifications, roles and skills.
- **IEEE BibTeX export + CV publication list**: all 90 outputs (3 journals, 7 book chapters, 1 editorial, 79 conference papers) with DOIs.
- **LinkedIn profile and posts** (196 own posts read, read-only): summarised into `src/data/updates.js` (News & Updates and the ticker). Months are approximate where LinkedIn shows only a relative age.
- **Old Google Site export**: certificates, gallery photos and IP India records.

Design follows the layout of a typical IIT faculty homepage (blue header with dropdowns, news ticker, split hero with photo carousel, glass research cards, cream stats band, blue footer). No assets or branding from that site are used.

Please check:
- The River Publishers book chapters (B2–B7) have no DOI in the CV.
- Patent P1 (Low-Cost Solar Powered Battery Charger) is missing its filing and publication dates.
- Course codes and credits are blank for most courses (paste them into `courses.js`).
- `src/data/updates.js`: you may want to add or trim LinkedIn highlights.
- The CV PDF on the site includes your phone number and your referees' e-mail addresses. Replace it with a public version if you prefer.

## Performance notes

- Images are WebP with lazy loading, and thumbnails are used in every grid.
- Three.js (≈140 kB gzipped) loads only when the 3D demo tab is opened.
- Fonts are self-hosted, and browsers download only the subsets they need.
- Animations pause off-screen and respect `prefers-reduced-motion`.
