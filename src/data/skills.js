/**
 * TECHNICAL SKILLS (source: CV) — no proficiency percentages by design.
 * evidence: optional note shown on hover.
 */
export const skillGroups = [
  { id: 'modelling', title: 'Modelling & Simulation', icon: 'waves', skills: [
    { name: 'MATLAB scripting', evidence: '26 invited MATLAB/Simulink sessions' }, { name: 'Simulink block programming' }, { name: 'Simscape' },
    { name: 'Simscape Battery' }, { name: 'Simulink Design Optimization' }, { name: 'MATLAB Coder' }, { name: 'PVsyst' } ] },
  { id: 'ai', title: 'Programming & AI/ML', icon: 'brain', skills: [
    { name: 'Python' }, { name: 'Deep learning for battery SoH', evidence: 'MLP, GRU, TCN, LSTM — Scientific Reports 2025' }, { name: 'MLP' }, { name: 'GRU' }, { name: 'TCN' }, { name: 'LSTM' },
    { name: 'Non-linear least-squares parameter estimation' }, { name: 'Gradient descent' }, { name: 'Active-set & interior-point optimisation' },
    { name: 'Levenberg–Marquardt' }, { name: 'Online feature extraction & classification' } ] },
  { id: 'embedded', title: 'Embedded & IoT', icon: 'cpu', skills: [
    { name: 'Arduino' }, { name: 'Raspberry Pi' }, { name: 'NodeMCU' }, { name: 'Hardware integration with MATLAB', evidence: 'Best Poster, CoreEL Technologies 2025' }, { name: 'Real-time control' } ] },
  { id: 'lab', title: 'Laboratory & Hardware', icon: 'lab', skills: [
    { name: 'Battery cycling & analysis (Cadex analyser)' }, { name: 'Electrochemical impedance spectroscopy (EIS)' }, { name: 'Voltage/current sensor calibration' },
    { name: 'DC–DC converters' }, { name: 'Inverters' }, { name: 'Gate-driver circuits' } ] },
  { id: 'automation', title: 'Industrial Automation', icon: 'sliders', skills: [ { name: 'PLC programming' }, { name: 'HMI' }, { name: 'SCADA' } ] },
  { id: 'docs', title: 'Documentation & Tools', icon: 'file', skills: [
    { name: 'LaTeX' }, { name: 'OriginLab' }, { name: 'Statistica' }, { name: 'MS Visio' }, { name: 'MS Excel' }, { name: 'EndNote' } ] },
  { id: 'lang', title: 'Languages', icon: 'globe', skills: [ { name: 'Hindi (native)' }, { name: 'Rajasthani (native)' }, { name: 'English' }, { name: 'Kannada (beginner)' } ] },
];
