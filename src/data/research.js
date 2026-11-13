/**
 * RESEARCH AREAS (from the CV's "Research Interests")
 * tags : publication tags (publications.js) counted under this area
 * icon : name from src/components/Icon.jsx
 */
export const researchAreas = [
  { key: 'battery', tags: ['battery', 'ecm'], title: 'Lithium-ion Battery Modelling', icon: 'battery',
    description: 'Equivalent-circuit, thermal and electro-thermal models of Li-ion cells under EV drive cycles.',
    tech: ['ECM', 'HPPC', 'Parameter estimation', 'Simscape Battery'] },
  { key: 'bms', tags: ['soc', 'soh', 'rul'], title: 'Battery Management Systems', icon: 'gauge',
    description: 'State-of-charge and state-of-health estimation, fault detection and digital-twin BMS.',
    tech: ['SoC', 'SoH', 'Digital twin', 'Fault detection'] },
  { key: 'ml', tags: ['ml'], title: 'Deep Learning for Battery Health', icon: 'brain',
    description: 'Data-driven health diagnostics with MLP, GRU, TCN and LSTM architectures.',
    tech: ['MLP', 'GRU', 'TCN', 'LSTM'] },
  { key: 'thermal', tags: ['thermal'], title: 'Battery Thermal Management', icon: 'thermo',
    description: 'Air and phase-change-material (PCM) cooling, runaway propagation and pack thermal design.',
    tech: ['Air cooling', 'PCM', 'Thermal runaway'] },
  { key: 'powertrain', tags: ['powertrain', 'ev'], title: 'EV Powertrain & Motor Drives', icon: 'car',
    description: 'Powertrain modelling, motor drives and drive-cycle based component sizing for Indian cycles.',
    tech: ['BLDC', 'Drive cycles', 'Multi-motor BEV'] },
  { key: 'robotics', tags: ['robotics', 'kinematics'], title: 'Robotics: Kinematics, Dynamics & Control', icon: 'bot',
    description: '6-DoF manipulators and humanoid robots — kinematic modelling, dynamics and control.',
    tech: ['6-DoF', 'Humanoid', 'PID', 'Jacobian'] },
  { key: 'renewable', tags: ['renewable'], title: 'Fuel Cells & Renewable Integration', icon: 'sun',
    description: 'PEM fuel-cell stacks, solar PV plants and renewable-powered EV charging.',
    tech: ['PEMFC', 'Solar PV', 'Wind', 'EV charging'] },
  { key: 'cps', tags: ['cps', 'control', 'powerelectronics'], title: 'Embedded, IoT & Power Electronics', icon: 'circuit',
    description: 'Embedded and IoT systems, converters and inverters, and hardware integration with MATLAB.',
    tech: ['Arduino', 'Raspberry Pi', 'NodeMCU', 'Converters'] },
];
