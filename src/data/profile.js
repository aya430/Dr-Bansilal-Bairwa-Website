/**
 * PROFILE CONFIGURATION  (source: updated CV, 12 Nov 2026)
 * ---------------------------------------------------------------
 * PROFILE PHOTO : public/images/profile/profile.webp  (portrait, ~800 x 900)
 * HERO SLIDES   : `heroSlides` below (image paths without extension, inside /public)
 * CV PDF        : public/documents/Bansilal-Bairwa-CV.pdf  (replace the file to update)
 */

export const profile = {
  name: 'Dr. Bansilal Bairwa',
  firstName: 'Bansilal',
  lastName: 'Bairwa',
  brand: 'Bansilal Bairwa',
  greeting: "Hi There, I'm",
  designation: 'Assistant Professor',
  school: 'School of Electrical and Electronics Engineering',
  schoolShort: 'SoEEE',
  institution: 'REVA University',
  location: 'Bengaluru, Karnataka, India',
  address: 'School of Electrical and Electronics Engineering, REVA University, Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru 560064, India',
  photo: 'images/profile/profile.webp',
  photoAlt: 'Portrait of Dr. Bansilal Bairwa',

  emails: ['bansilal.bairwa@reva.edu.in', 'bansilalbairwa@gmail.com'],
  phone: '+91 76653 41082',

  roles: [
    'Battery Modelling & BMS Researcher',
    'Electric Vehicle Technology Specialist',
    'AI / ML for Battery Health',
    'Robotics & Automation Researcher',
    'MATLAB & Simulink Specialist',
    'Engineering Educator',
  ],

  intro:
    'I work on electric-vehicle battery modelling, battery management systems, AI/ML-based state-of-charge and state-of-health estimation, battery thermal management, EV powertrains and robotics — and I build virtual laboratories that make these ideas tangible for students.',

  // Scrolling announcement bar under the header (newest first)
  news: [
    'Paper accepted at IEEE UPCON 2026, IIT Kanpur — 6-DOF robotic manipulator modelling and validation.',
    'Research crossed 600+ Google Scholar citations (h-index 15, i10-index 23).',
    'PG Certification in Robotics completed at IIT Palakkad (2026).',
    'Expert sessions on BMS and EV modelling with MATLAB & Simulink at NIT Karnataka, Surathkal (2026).',
    '40-hour certification course on EV powertrain modelling, control design and embedded deployment (2026).',
    'Best Poster Award — “Integrating Hardware with MATLAB”, CoreEL Technologies (2025).',
    'First-author article in Scientific Reports (Nature Portfolio), 2025.',
    'Best Poster Award at IIT Kanpur for an EV battery-bank cooling system (2024).',
    'REVA University Best Researcher Award, Teachers’ Day 2024.',
  ],

  // Right-hand carousel in the hero (image paths without extension)
  heroSlides: [
    { image: 'images/profile/hero-portrait', caption: 'Dr. Bansilal Bairwa, REVA University' },
    { image: 'images/gallery/img_111', caption: 'Receiving the Best Research Paper Award' },
    { image: 'images/gallery/img_124', caption: 'Presenting at IEEE ICONAT 2023, Goa' },
    { image: 'images/gallery/img_114', caption: 'Technical session on lithium-ion battery modelling' },
    { image: 'images/gallery/img_129', caption: 'Resource person, AICTE ATAL FDP' },
  ],

  bio: [
    'Dr. Bansilal Bairwa is an Assistant Professor in the School of Electrical and Electronics Engineering, REVA University, Bengaluru (since December 2020), with a Ph.D. from MNIT Jaipur on lithium-ion battery modelling for electric-vehicle drive cycles.',
    'His research spans EV battery modelling, battery management systems, AI/ML-based state-of-charge and state-of-health estimation, battery thermal management, EV powertrain modelling and robotics. He has authored 85 Scopus-indexed documents (510 citations, h-index 15), including a first-author article in Scientific Reports, filed 8 Indian patents and led 12 KSCST-funded student research projects (10 as PI).',
    'His work has been recognised with two Best IEEE Paper Awards, three Best Poster Awards (including IIT Kanpur and CoreEL Technologies) and the REVA University Best Researcher Award (2024).',
    'A MATLAB/Simulink specialist, he has delivered 26 invited sessions as resource person and keynote speaker in AICTE ATAL FDPs, institutional FDPs and workshops, and serves as GATE Coordinator, KSCST Project Coordinator and industry-collaboration coordinator (Bosch Global Software Technologies, MathWorks, CoreEL Technologies).',
  ],

  careerObjective:
    'To advance trustworthy, physics-aware battery and EV technologies through research, and to make engineering education more hands-on through open, interactive digital laboratories.',

  /**
   * HEADLINE METRICS — value: number, or null to show "Update required".
   */
  metrics: [
    { key: 'scopus', label: 'Scopus Documents', value: 85, suffix: '+', icon: 'book', source: 'Scopus export', asOf: '05 Oct 2026' },
    { key: 'citations', label: 'Scopus Citations', value: 510, suffix: '+', icon: 'quote', source: 'Scopus export', asOf: '05 Oct 2026' },
    { key: 'hindex', label: 'h-index', value: 15, suffix: '', icon: 'trend', source: 'Scopus export (Google Scholar: 15)', asOf: '05 Oct 2026' },
    { key: 'patents', label: 'Patents Filed', value: 8, suffix: '', icon: 'file', source: 'Indian patent applications (CV)', asOf: 'Nov 2026' },
    { key: 'funded', label: 'KSCST Projects', value: 12, suffix: '', icon: 'wallet', source: 'KSCST sanction list (CV)', asOf: 'Nov 2026' },
    { key: 'awards', label: 'Awards', value: 8, suffix: '', icon: 'trophy', source: 'Honours and awards (CV)', asOf: 'Nov 2026' },
    { key: 'talks', label: 'Invited Sessions', value: 26, suffix: '+', icon: 'mic', source: 'Invited talks (CV)', asOf: 'Nov 2026' },
    { key: 'students', label: 'Projects Guided (UG + PG)', value: 18, suffix: '+', icon: 'users', source: '13 UG + 5 PG (CV)', asOf: 'Nov 2026' },
  ],
  scholarNote: 'Google Scholar: 608 citations · h-index 15 · i10-index 23',

  documents: {
    cv: 'documents/Bansilal-Bairwa-CV.pdf',
    researchProfile: '',
    publicationList: '',
    patentPortfolio: '',
  },

  enquiryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd-bqw7dAS_blJ2_8zYICgUmXOF-hA8xoMlX_s0VPQaADNnzQ/viewform',
  siteUrl: 'https://aya430.github.io/Dr-Bansilal-Bairwa-Website/',
};
