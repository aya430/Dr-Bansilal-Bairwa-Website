/**
 * RESEARCH PROJECTS, FUNDED PROJECTS & STUDENT SUPERVISION
 * ---------------------------------------------------------------
 * projects        -> "Projects & Innovations" section (cards + detail modal)
 * fundedProjects  -> "Funded Research" section
 * supervision     -> "Student Mentoring" section
 *
 * relatedPublications / relatedPatents use ids from publications.js / patents.js
 * image: path without extension inside /public (the site adds .webp / -sm.webp),
 *        or '' to show a generated technical illustration instead.
 * githubUrl / demoUrl: leave '' to hide the button.
 */

export const projects = [
  {
    id: 'li-ion-modelling',
    title: 'Li-ion Battery Modelling for EV Drive Cycles',
    category: 'Battery Modelling',
    illustration: 'battery',
    image: '',
    status: 'Completed (Ph.D.)',
    summary: 'Equivalent-circuit and data-driven models of lithium-ion cells evaluated under realistic EV drive cycles.',
    objectives: [
      'Identify ECM parameters for Li-ion cells under dynamic load profiles',
      'Compare first-, second- and higher-order RC models',
      'Estimate state of charge under real-life loading',
    ],
    tech: ['MATLAB', 'Simulink', 'Parameter estimation', 'MARS regression'],
    contribution: 'Doctoral research at MNIT Jaipur; models later extended into teaching material and virtual-lab experiments.',
    relatedPublications: ['J3', 'C78', 'C79', 'C57', 'C21'],
    relatedPatents: [],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'soh-deep-learning',
    title: 'Deep-Learning Battery Health Estimation',
    category: 'AI for Batteries',
    illustration: 'neural',
    image: '',
    status: 'Published 2025',
    summary: 'Cycle-based state-of-health estimation of lithium-ion cells using deep learning architectures.',
    objectives: ['Extract cycle-level health features', 'Benchmark deep learning architectures for SOH', 'Support capacity-fade and RUL prediction'],
    tech: ['Python', 'Deep learning', 'LSTM / CNN-LSTM', 'Feature engineering'],
    contribution: 'Lead author; published in Scientific Reports (2025).',
    relatedPublications: ['J1', 'C33', 'C76', 'C6'],
    relatedPatents: [],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'battery-cooling',
    title: 'Cooling System for EV Batteries',
    category: 'Thermal Management',
    illustration: 'thermal',
    image: '',
    status: 'Published 2025–26',
    summary: 'Air and PCM-based cooling systems to keep EV battery packs within safe operating temperatures.',
    objectives: ['Characterise heat generation in EV packs', 'Design and evaluate a cooling arrangement'],
    tech: ['Thermal modelling', 'MATLAB / Simulink'],
    contribution: 'Lead author; presented at IEEE SEFET 2025, Jaipur.',
    relatedPublications: ['C4', 'C2', 'C7'],
    relatedPatents: [],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'ev-powertrain',
    title: 'EV Powertrain Simulation',
    category: 'EV Systems',
    illustration: 'powertrain',
    image: '',
    status: 'Best Paper Award 2023',
    summary: 'Simulation of an electric vehicle powertrain to evaluate dynamic performance, alongside BLDC motor speed-control studies.',
    objectives: ['Model vehicle dynamics, motor and battery', 'Evaluate performance across drive cycles', 'Compare PI and PWM based BLDC speed control'],
    tech: ['Simulink', 'BLDC drives', 'Drive cycles'],
    contribution: 'Supervised and co-authored; the powertrain paper won the Best Research Paper Award at IEEE ICDCECE-2023.',
    relatedPublications: ['C32', 'C37', 'C38', 'C8', 'C9'],
    relatedPatents: [],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'battery-swapping',
    title: 'Battery Swapping Mobile Service Station',
    category: 'EV Infrastructure',
    illustration: 'swap',
    image: '',
    status: 'Patent published',
    summary: 'A mobile service station concept that delivers charged batteries to electric vehicles.',
    objectives: ['Reduce EV downtime', 'Enable on-road battery exchange'],
    tech: ['EV infrastructure', 'Battery systems'],
    contribution: 'Inventor and project guide.',
    relatedPublications: ['C75'],
    relatedPatents: ['P7'],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'hybrid-bike',
    title: 'Petro-Electric Hybrid Two-Wheeler',
    category: 'Hybrid Vehicles',
    illustration: 'powertrain',
    image: '',
    status: 'KSCST funded · Patent published',
    summary: 'A hub-motor powered hybrid that switches between petrol and electric modes for better efficiency and range.',
    objectives: ['Integrate a hub motor with a petrol drivetrain', 'Improve fuel efficiency and reduce emissions'],
    tech: ['Hub motor', 'Hybrid control', 'Battery pack'],
    contribution: 'PG project guide; KSCST-funded (2023).',
    relatedPublications: ['C64'],
    relatedPatents: ['P4'],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'robotic-vehicles',
    title: 'Intelligent Robotic Vehicles',
    category: 'Robotics',
    illustration: 'robot',
    image: '',
    status: 'Patents & IEEE paper',
    summary: 'Student robotics projects covering surrounding recognition, voice/gesture control and automated fire-fighting.',
    objectives: ['Sensor-based obstacle and surrounding recognition', 'Voice and hand-gesture teleoperation', 'Autonomous fire detection and suppression'],
    tech: ['Arduino', 'Sensors', 'Motor control'],
    contribution: 'Project guide and co-inventor.',
    relatedPublications: ['C48', 'C11', 'C3', 'C12'],
    relatedPatents: ['P6', 'P2'],
    githubUrl: '', demoUrl: '',
  },
  {
    id: 'wireless-charging',
    title: 'Renewable-Powered Wireless EV Charging',
    category: 'Renewable + EV',
    illustration: 'solar',
    image: '',
    status: 'Patent published',
    summary: 'Modelling and simulation of wireless EV charging supplied by solar and wind energy.',
    objectives: ['Couple solar and wind sources to a wireless charger', 'Simulate charging performance'],
    tech: ['Simulink', 'Solar PV', 'Wind', 'Inductive power transfer'],
    contribution: 'Co-inventor.',
    relatedPublications: ['C63'],
    relatedPatents: ['P8'],
    githubUrl: '', demoUrl: '',
  },
];

// KSCST-funded student research projects (source: CV) — total sanctioned INR 70,000 (10 as PI, 2 as Co-PI)
export const fundedProjects = [
  { year: 2026, title: 'Advanced Battery Management System with Digital Twin for Fault Detection and Accurate SOC Estimation', code: '49S_MTECH_0007', role: 'PI', amount: 6500, level: 'PG' },
  { year: 2026, title: 'Real-Time Monitoring and Thermal Management of Lithium-ion Battery Bank with Hybrid Air-PCM Cooling System', code: '49S_MTECH_0003', role: 'PI', amount: 6500, level: 'PG' },
  { year: 2026, title: 'Real-Time Distance-Adaptive Smart Trolley for Continuous Human Tracking', code: '49S_BE_0871', role: 'PI', amount: 5000, level: 'UG' },
  { year: 2026, title: 'Deep Learning-Powered Visual Aid System for Blind Navigation', code: '49S_BE_1384', role: 'PI', amount: 5000, level: 'UG' },
  { year: 2026, title: 'Design and Implementation of an Embedded Control Platform for Air and PCM-Based BESS Cooling', code: '49S_BE_1872', role: 'PI', amount: 5000, level: 'UG' },
  { year: 2026, title: 'Fault Detection in EV Motors Using AI', code: '49S_BE_2828', role: 'PI', amount: 5000, level: 'UG' },
  { year: 2025, title: 'Development of Automatic Solar Panel Cleaning System', code: '', role: 'PI', amount: 4500, level: 'UG' },
  { year: 2025, title: 'Multifunctional Sign Hand Gloves for Women’s Safety', code: '', role: 'Co-PI', amount: 4500, level: 'UG' },
  { year: 2024, title: 'Thermal Management System for Electric Vehicle Battery Bank: Improving Performance and Safety', code: '', role: 'PI', amount: 5500, level: 'UG' },
  { year: 2024, title: 'Unmanned Smart Fire Fighting System for Forest and Wildlife Protection', code: '', role: 'Co-PI', amount: 5500, level: 'UG' },
  { year: 2023, title: 'Development of Low-Cost Modified Hybrid Bike for Rural Area', code: '', role: 'PI', amount: 7000, level: '' },
  { year: 2022, title: 'Adaptable Skating Electric Vehicle for Physically Challenged People', code: '45S_BE_0782', role: 'PI', amount: 10000, level: 'UG',
    sanctionUrl: 'https://revaedu-my.sharepoint.com/:b:/g/personal/bansilal_bairwa_reva_edu_in/ESYjl907bXhAswOEIJzDGYwBKnErDx6g9JWUj2p4T9E4GA?e=pcvCld' },
];

// Supervision summary by year (source: CV) — 13 UG (2021–2025) and 5 PG (2022–2025)
export const supervisionSummary = [
  { year: 2025, ug: 4, pg: 2, outcome: 'IEEE publications; multiple KSCST grants; prototypes developed; M.Tech. projects ongoing' },
  { year: 2024, ug: 2, pg: 1, outcome: 'IEEE publication; KSCST grant; Project Expo winner; 2 Scopus-indexed publications (PG)' },
  { year: 2023, ug: 3, pg: 1, outcome: 'IEEE/Scopus-indexed publications (including 2 papers from a single project); KSCST grant (PG)' },
  { year: 2022, ug: 2, pg: 1, outcome: 'Scopus-indexed publications; KSCST project grant' },
  { year: 2021, ug: 2, pg: 0, outcome: '2 Scopus-indexed publications' },
];

/**
 * STUDENT PROJECT SUPERVISION
 * Student names are not shown on the website; only team size.
 */
export const supervision = [
  { title: 'Modeling and Simulation for Capacity Fade Prediction of Lithium-Ion Battery', level: 'PG', year: 2022, team: 1, paperUrl: 'https://ieeexplore.ieee.org/document/9535594' },
  { title: 'Hub Motor Powered Petro-Electric Hybrid Vehicle', level: 'PG', year: 2023, team: 1, paperUrl: 'https://ieeexplore.ieee.org/document/9972549' },
  { title: 'Battery Swapping Mobile Service Station for Electric Vehicles Application', level: 'UG', year: 2021, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/9708560' },
  { title: 'Modeling and Simulation of Solar Irrigation System with IM Drive Using PWM Controller', level: 'UG', year: 2021, team: 3, paperUrl: 'https://aip.scitation.org/doi/abs/10.1063/5.0092263' },
  { title: 'Model Predictive Control Technique of Voltage Source Inverter for Linear and Non Linear Load', level: 'UG', year: 2022, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/9971830' },
  { title: 'Development of Fault Detection Method in Cable Using Arduino UNO', level: 'UG', year: 2022, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/10054271' },
  { title: 'PV Power Prediction and Investigation for Movable Solar PV Module', level: 'UG', year: 2022, team: 1, paperUrl: 'https://ieeexplore.ieee.org/document/9972462' },
  { title: 'Temperature Dependent Capacity Fade Prediction of Electric Vehicle Batteries', level: 'UG', year: 2023, team: 1, paperUrl: 'https://ieeexplore.ieee.org/document/10111909' },
  { title: 'Development of Real Time Monitoring and Tracking System for Vehicles Application', level: 'UG', year: 2023, team: 3, paperUrl: 'https://ieeexplore.ieee.org/document/10080069/' },
  { title: 'Speed Control of BLDC Motor Using PI Controller', level: 'UG', year: 2023, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/10080074' },
  { title: 'Drive Cycle Based Speed Control of BLDC Motor Using Pulse Width Modulation', level: 'UG', year: 2023, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/10111848' },
  { title: 'Modeling of Low Cost Battery Charge Controller for Stationary to Mobile Applications', level: 'UG', year: 2023, team: 4, paperUrl: 'https://ieeexplore.ieee.org/document/10111855' },
  { title: 'Development of IoT Based GSM Controller for Agriculture Applications', level: 'UG', year: 2023, team: 3, paperUrl: 'https://ieeexplore.ieee.org/document/10060357' },
  { title: 'IoT Based AID and Health Monitoring for Physically Disabled Person', level: 'UG', year: 2023, team: 3, paperUrl: 'https://ieeexplore.ieee.org/document/10183516' },
  { title: 'IoT Enabled Innovative Accident Detection and Rescue System', level: 'UG', year: 2023, team: 2, paperUrl: 'https://ieeexplore.ieee.org/document/10170604' },
  { title: 'Development of Robot for Intelligent Surrounding Recognition and Direction Control', level: 'UG', year: 2023, team: 3, paperUrl: 'https://ieeexplore.ieee.org/document/10170237' },
  { title: 'Modeling and Simulation of Electric Vehicle Powertrain for Dynamic Performance Evaluation', level: 'UG', year: 2023, team: 3, paperUrl: 'https://ieeexplore.ieee.org/document/10150956' },
];
