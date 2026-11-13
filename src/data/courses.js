/**
 * COURSES — EDIT YOUR COURSE LINKS HERE
 * =====================================================================
 * This is the ONLY place course links live. Paste a URL between the quotes
 * and the matching button appears automatically; '' shows "coming soon".
 *   courseLink -> "View Course" · syllabusLink -> "Syllabus" · notesLink -> "Lecture Notes"
 *   videoLink  -> "Video Lectures" · virtualLabLink -> "Virtual Lab"
 * Files inside the site: put them in /public/documents/ and use e.g. 'documents/syllabus.pdf'
 * offerings: semesters taught and class size (from the CV)
 * icon: car | bot | brain | cpu | waves | zap | sliders | code | battery | sun
 * =====================================================================
 */
export const courses = [
  { id: 1, title: 'Robotics and Application', code: 'M26TJ511X', category: 'Robotics', level: 'UG', semester: 'V Semester', credits: '',
    description: 'Robot anatomy, kinematics, sensors, actuators and instrumentation, supported by unit-wise slides, notes and a 2D/3D virtual lab.',
    offerings: [['Even 2026', 28], ['Odd 2025', 70]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '',
    virtualLabLink: 'https://aya430.github.io/robotics-instrumentation-virtual-lab/index.html', icon: 'bot', status: 'Active' },
  { id: 2, title: 'Electric Vehicle System Engineering', code: 'B24EES502', category: 'Electric Vehicles', level: 'UG', semester: 'V Semester', credits: '',
    description: 'EV architectures, traction motors, battery systems and powertrain modelling, with unit-wise notes and the EV MASTER LAB virtual laboratory.',
    offerings: [['Even 2025', 60], ['Even 2024', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '',
    virtualLabLink: 'https://aya430.github.io/EV-MASTER-LAB/#/home', icon: 'car', status: 'Active' },
  { id: 3, title: 'Generative AI Engineering with LLMs', code: '', category: 'AI & ML', level: '', semester: '', credits: '',
    description: 'Engineering applications of large language models and generative AI, delivered through unit-wise lecture notes.',
    offerings: [],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'brain', status: 'Active' },
  { id: 4, title: 'Energy Storage and Control Techniques', code: '', category: 'Energy Storage', level: '', semester: '', credits: '',
    description: 'Battery, supercapacitor and other storage technologies with their modelling and control.',
    offerings: [['Odd 2024', 60], ['Odd 2021', 25]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'battery', status: 'Taught' },
  { id: 5, title: 'Energy Storage', code: '', category: 'Energy Storage', level: '', semester: '', credits: '',
    description: 'Principles and applications of electrochemical and other energy-storage systems.',
    offerings: [['Even 2023', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'battery', status: 'Taught' },
  { id: 6, title: 'Energy Conservation (Open Elective)', code: '', category: 'Energy', level: 'Open Elective', semester: '', credits: '',
    description: 'Energy audit, efficiency and conservation practices across sectors.',
    offerings: [['Odd 2023', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'zap', status: 'Taught' },
  { id: 7, title: 'Green Building Technology', code: '', category: 'Energy', level: '', semester: '', credits: '',
    description: 'Sustainable building design, energy-efficient systems and rating frameworks.',
    offerings: [['Odd 2023', 25]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'sun', status: 'Taught' },
  { id: 8, title: 'Fundamentals of Robotics', code: '', category: 'Robotics', level: '', semester: '', credits: '',
    description: 'Robot configurations, coordinate frames, kinematics and applications.',
    offerings: [['Even 2022', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'cpu', status: 'Taught' },
  { id: 9, title: 'Smart Grid and Applications', code: '', category: 'Power Systems', level: '', semester: '', credits: '',
    description: 'Smart-grid architecture, communication, renewable integration and applications.',
    offerings: [['Odd 2022', 25]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'network', status: 'Taught' },
  { id: 10, title: 'Python Programming', code: '', category: 'Programming', level: '', semester: '', credits: '',
    description: 'Programming fundamentals and scientific computing with Python.',
    offerings: [['Even 2022', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'code', status: 'Taught' },
  { id: 11, title: 'Machine Learning with MATLAB', code: '', category: 'AI & ML', level: '', semester: '', credits: '',
    description: 'Supervised and unsupervised learning workflows implemented in MATLAB.',
    offerings: [['Even 2021', 60]],
    courseLink: '', syllabusLink: '', notesLink: '', videoLink: '', virtualLabLink: '', icon: 'brain', status: 'Taught' },
];

export const labs = [
  { name: 'MATLAB and Simulink Lab', role: 'Lab In-charge' },
  { name: 'Python Programming Lab', role: 'Lab In-charge' },
  { name: 'Signal Processing Lab', role: 'Lab In-charge' },
  { name: 'Microcontroller Lab', role: '' },
  { name: 'Digital System Design Lab', role: '' },
  { name: 'Basic Electrical and Electronics Engineering Lab', role: '' },
];

// Certification courses & workshops offered as instructor
export const certCourses = [
  { year: 2026, title: 'Certification Course: Electric Vehicle Powertrain Modeling, Control Design, and Embedded Hardware Deployment Using MATLAB and Simulink', duration: '40 hours', participants: 56, link: '' },
  { year: 2026, title: 'Advanced LaTeX Workshop for Research Paper Writing', duration: '6 hours', participants: 25, link: '' },
  { year: 2025, title: 'MATLAB for Engineers: A Hands-on Approach to Modeling & Simulation', duration: '2 days', participants: 35, link: '' },
  { year: 2024, title: 'Mastering Simulink: From Basics to Advanced Modeling Techniques in MATLAB', duration: '32 hours', participants: 76, link: '',
    gallery: ['images/courses/img_024', 'images/courses/img_025', 'images/courses/img_026', 'images/courses/img_027', 'images/courses/img_028', 'images/courses/img_029', 'images/courses/img_030', 'images/courses/img_031', 'images/courses/img_032'] },
  { year: 2024, title: 'Modeling and Simulation of Powertrain, Battery and Control System Using MATLAB (2-day workshop), MESCOE, Pune', duration: '16 hours', participants: 40, link: '' },
];
