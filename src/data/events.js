/**
 * PROFESSIONAL ACTIVITIES — expert talks, FDPs, workshops, conferences,
 * events organised, session chair & reviewer roles.
 *
 * type   : 'Expert Talk' | 'FDP Attended' | 'Workshop' | 'Conference' | 'Organised' | 'Session Chair' | 'Reviewer'
 * date   : YYYY-MM-DD (start date)
 * image  : image path without extension (optional)
 * certificateUrl / brochureUrl : optional links
 * level  : 'International' | 'National' (optional)
 */
const SP = 'https://revaedu-my.sharepoint.com/:b:/g/personal/bansilal_bairwa_reva_edu_in/';

export const events = [
  // ---------------- Invited talks / resource person (26, from the CV) ----------------
  { type: 'Expert Talk', date: '2026-11-05', title: 'Battery Management Systems — BMS fundamentals, monitoring and emerging e-mobility technologies', host: 'National Institute of Technology Karnataka (NITK), Surathkal', role: 'Expert Talk', level: 'National' },
  { type: 'Expert Talk', date: '2026-07-01', title: 'Electric Vehicle Technologies and Motor Drive Control', host: 'School of Agricultural Engineering, REVA University, Bengaluru', role: 'Resource Person (Faculty Development Session)', level: 'National' },
  { type: 'Expert Talk', date: '2026-04-22', title: 'Electric Vehicle Modeling Using MATLAB and Simulink (RoadRunner, Virtual Vehicle Composer)', host: 'National Institute of Technology Karnataka (NITK), Surathkal', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2026', title: 'Battery Chemistry Fundamentals and MATLAB-Based Modeling (FDP/SDP: Transformative Innovations in Chemistry)', host: 'School of Applied Sciences, REVA University, Bengaluru', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2026', title: 'Dynamic Systems Modeling & Control: A Hands-On Approach Using MATLAB Simscape and AI Tools', host: 'One-Week FDP, Dr. D. Y. Patil Institute of Technology, Pune', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2025', title: 'Hardware Integration to MATLAB', host: 'MathWorks Usability Research Summit', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2025', title: 'System Modelling Paradigms, Physical System Modelling with Simscape and Control System Design', host: 'FDP, Don Bosco Institute of Technology (DBIT), Bengaluru', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2025-05-03', title: 'MATLAB for Engineers: A Hands-on Approach to Modeling & Simulation', host: 'School of EEE, REVA University, Bengaluru', role: 'Workshop Instructor', level: 'National' },
  { type: 'Expert Talk', date: '2025-04-28', title: 'Flight Dynamics and Control Simulation for Aerospace Applications Using MATLAB Simulink', host: 'Aerospace Engineering, REVA University, Bengaluru', role: 'Expert Session', level: 'National' },
  { type: 'Expert Talk', date: '2025-04-24', title: 'Battery Management Systems Using AI and Machine Learning Techniques', host: 'Electronics & ICT Academy, NIT Warangal with NIT Durgapur', role: 'Expert Session', level: 'National' },
  { type: 'Expert Talk', date: '2025-03-19', title: 'Battery Pack Design and Simulation for Electric Vehicles – A Modeling Approach', host: 'FDP, Bangalore Institute of Technology (BIT), Bengaluru', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2025-02-17', title: 'Battery Pack Design and Simulation for Electric Vehicles – A Modeling Approach', host: 'FDP, Dayananda Sagar College of Engineering (DSCE), Bengaluru', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2024-12-14', title: 'Advanced Battery Modeling Techniques for EVs with Emphasis on Renewable Energy Integration', host: 'AICTE ATAL FDP, Holy Mary Institute of Technology and Science, Hyderabad', role: 'Expert Speaker', level: 'National' },
  { type: 'Expert Talk', date: '2024-11-29', title: 'Mathematical Modeling of Lithium-Ion Battery for Electric Vehicle Application', host: 'AICTE ATAL FDP, KITS Guntur, Andhra Pradesh', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2024', title: 'Battery Pack Design and Simulation for Electric Vehicles – A Modeling Approach', host: 'Department of EEE, DSCE, Bengaluru', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2024-11-16', title: 'Lithium-Ion Battery Modeling for Electric Vehicle Application', host: 'Madanapalle Institute of Technology & Science, Andhra Pradesh', role: 'Workshop Speaker', level: 'National' },
  { type: 'Expert Talk', date: '2024-09-21', title: 'Battery Modeling and Parameter Estimation for Electric Vehicle Applications', host: 'FDP, Guru Nanak Institutions Technical Campus, Hyderabad', role: 'Resource Person', level: 'National' },
  { type: 'Expert Talk', date: '2024-08-28', title: 'Parameter Estimation of Electric Vehicle Battery', host: 'FDP, SJB Institute of Technology, Bengaluru', role: 'Keynote Speaker', level: 'National' },
  { type: 'Expert Talk', date: '2024-08-17', title: 'Electric Vehicle Battery Modeling and Parameters Estimation', host: 'FDP, Vidya Vikas Institute of Engineering and Technology, Mysuru', role: 'Keynote Speaker', level: 'National' },
  { type: 'Expert Talk', date: '2024-03-08', title: 'Sustainable Technology for a Sustainable Future 2024 (International Symposium & Workshop)', host: 'Modern Education Society’s College of Engineering (MESCOE), Pune', role: 'Keynote Speaker', level: 'National', image: 'images/talks/img_001' },
  { type: 'Expert Talk', date: '2024-04-23', title: 'Modeling of Electric Vehicles Motors', host: 'School of Mechanical Engineering, REVA University, Bengaluru', role: 'Seminar Speaker', level: 'National', image: 'images/talks/img_076' },
  { type: 'Expert Talk', date: '2023-12-05', title: 'Parameter Estimation of Electric Vehicle Battery', host: 'AICTE ATAL FDP, M. S. Ramaiah Institute of Technology, Bengaluru', role: 'Keynote Speaker', level: 'National', image: 'images/talks/img_072' },
  { type: 'Expert Talk', date: '2023-03-04', title: 'Lithium-Ion Battery Modeling (International Symposium & Workshop)', host: 'MESCOE, Pune', role: 'Keynote Speaker', level: 'National', image: 'images/talks/img_075' },
  { type: 'Expert Talk', date: '2023-04-12', title: 'Lithium-Ion Battery Modeling for Electric Vehicle Applications', host: 'School of Mechanical Engineering, REVA University, Bengaluru', role: 'Seminar Speaker', level: 'National', image: 'images/talks/img_071' },
  { type: 'Expert Talk', date: '2022-11-24', title: 'Lithium-Ion Battery Modeling for Electric Vehicle Applications', host: 'BMS College of Engineering, Bengaluru', role: 'Webinar Speaker', level: 'National', image: 'images/talks/img_068', certificateUrl: SP + 'EYSHREJJ4NpOtE6NVhadacwB6Q1vzVnhwyYVOnf_f2jC5Q?e=uEzd0I' },
  { type: 'Expert Talk', date: '2022-11-30', title: 'Lithium-Ion Battery Modeling for Electric Vehicle Applications', host: 'Mewar University, Chittorgarh', role: 'Webinar Speaker', level: 'National', image: 'images/talks/img_067' },

  // ---------------- Events organised ----------------
  { type: 'Organised', date: '2023-02-06', title: 'Five-day FDP on Recent Trends in Electrical Power System (45 participants)', host: 'School of EEE, REVA University', role: 'Organiser', image: 'images/events/img_102', certificateUrl: SP + 'ERlCfWS8U-FKm5ZAckDa5s0BoaUzcCzyqT7OsVFAQSnJBg?e=y0cEzu' },
  { type: 'Organised', date: '2024', title: 'FDP on Recent Trends in Electrical Power System (45 participants)', host: 'School of EEE, REVA University', role: 'FDP Coordinator' },
  { type: 'Organised', date: '2024-05', title: 'IEEE TEECCON 2024', host: 'School of EEE, REVA University', role: 'Organising Committee Member' },
  { type: 'Organised', date: '2023-05', title: 'IEEE TEECCON 2023', host: 'School of EEE, REVA University', role: 'Organising Committee Member' },
  { type: 'Organised', date: '2023', title: 'Skill Development Program: Power Electronics Converter for Industrial Application (240 participants)', host: 'School of EEE, REVA University', role: 'SDP Coordinator' },
  { type: 'Reviewer', date: '2025', title: 'IEEE ICDCECE 2025', host: 'BITM Ballari', role: 'Reviewer', level: 'International' },
  { type: 'Reviewer', date: '2024', title: 'IEEE ICDCECE 2024', host: 'BITM Ballari', role: 'Reviewer', level: 'International' },
  { type: 'Reviewer', date: '2022', title: 'IEEE 3rd Global Conference for Advancement in Technology (GCAT)', host: 'Bengaluru', role: 'Reviewer', level: 'International' },
  { type: 'Organised', date: '2022-07-05', title: 'Skill Development Program: Machine Learning Using Python Programming (2nd Sem.)', host: 'School of EEE, REVA University', role: 'SDP Coordinator', image: 'images/events/img_100' },
  { type: 'Organised', date: '2022-05-26', title: 'IEEE TEECCON 2022 — Trends in Electrical, Electronics and Computer Engineering', host: 'School of EEE, REVA University', role: 'Organising Committee Member', image: 'images/events/img_095' },
  { type: 'Organised', date: '2022-04-08', title: 'Skill Development Program: Power Electronics Converter for Industrial Application (6th Sem.)', host: 'School of EEE, REVA University', role: 'SDP Coordinator', image: 'images/events/img_101' },
  { type: 'Organised', date: '2021-11-27', title: 'iCORE-2021 — International Congress on Renewable Energy (SESI)', host: 'School of EEE, REVA University', role: 'Editorial Committee Member', image: 'images/events/img_096' },
  { type: 'Organised', date: '2021-11-23', title: 'Skill Development Program: Cyber Security, Python and IoT (5th Sem.)', host: 'School of EEE, REVA University', role: 'SDP Coordinator', image: 'images/events/img_099' },
  { type: 'Organised', date: '2021-11-08', title: 'Skill Development Program: Solar, Battery Management and MEMS Technology (7th Sem.)', host: 'School of EEE, REVA University', role: 'SDP Coordinator', image: 'images/events/img_098' },
  { type: 'Organised', date: '2021-07-22', title: 'ICRTEEC-2021 — 2nd Int. Conf. on Recent Trends in Electrical, Electronics & Computer Engineering', host: 'School of EEE, REVA University', role: 'Editor', image: 'images/events/img_097' },

  // ---------------- Session chair & reviewer ----------------
  { type: 'Reviewer', date: '2024-07-25', title: 'ICECET 2024 — International Conference on Electrical, Computer and Energy Technologies, Sydney', host: 'ICECET / IEEE', role: 'Reviewer', level: 'International', image: 'images/reviewer/img_083' },
  { type: 'Session Chair', date: '2024-04-26', title: '3rd IEEE ICDCECE-2024', host: 'Ballari Institute of Technology & Management', role: 'Session Chair', level: 'International', image: 'images/reviewer/img_082' },
  { type: 'Session Chair', date: '2023-11-02', title: 'IEEE AIKIIE-2023 — Ambient Intelligence, Knowledge Informatics and Industrial Electronics', host: 'RYM Engineering College, Ballari', role: 'Session Chair', level: 'International', image: 'images/reviewer/img_079' },
  { type: 'Session Chair', date: '2023-09-07', title: '2023 IEEE Fifth ICAECC — Advances in Electronics, Computers and Communications', host: 'REVA University, Bengaluru', role: 'Session Chair', level: 'International', image: 'images/reviewer/img_078' },
  { type: 'Reviewer', date: '2023-02-20', title: 'IEEE ICICACS-2023 — Integrated Circuits and Communication Systems', host: 'S.L.N. College of Engineering, Raichur', role: 'Reviewer', level: 'International', image: 'images/reviewer/img_080' },

  // ---------------- Conference presentations ----------------
  { type: 'Conference', date: '2023-04-28', title: 'IoT Based AID and Health Monitoring for Physically Disabled Person', host: 'CISES-2023, G L Bajaj Institute, Greater Noida', role: 'Presenter / Co-author', level: 'International', image: 'images/conferences/img_145', certificateUrl: SP + 'ESAGdS6NmeVMmMVVqoRmvoEB1SpFrTo6e3dwlz-UQLt63g?e=LgWN8o' },
  { type: 'Conference', date: '2023-04-29', title: 'Modeling and Simulation of EV Powertrain for Dynamic Performance Evaluation', host: 'IEEE ICDCECE-2023, BITM Ballari', role: 'Presenter', level: 'International', image: 'images/reviewer/img_081' },
  { type: 'Conference', date: '2023-04', title: 'IoT Enabled Innovative Accident Detection and Rescue System', host: 'IEEE ICAECIS-23, Bangalore Institute of Technology', role: 'Presenter / Co-author', level: 'International', image: 'images/conferences/img_151', certificateUrl: SP + 'EcGwomY72HxEhKRgUcXPGGEBsdh3QMrvz9VEyNq_YmjsPw?e=B7H3hs' },
  { type: 'Conference', date: '2023-04', title: 'Development of Robot for Intelligent Surrounding Recognition and Direction Control', host: 'IEEE ICAECIS-23, Bangalore Institute of Technology', role: 'Presenter / Co-author', level: 'International', image: 'images/conferences/img_152', certificateUrl: SP + 'Ea5kxripnxRDtYvKk0oRG_4BPnzcX4szHcErZE7qPbhMUw?e=fBhqdb' },
  { type: 'Conference', date: '2023-02-10', title: 'Temperature Dependent Capacity Fade Prediction of Electric Vehicles Batteries', host: 'ICRTEC 2023, Mysuru', role: 'Presenter', level: 'International', image: 'images/conferences/img_146', certificateUrl: SP + 'EZ-dlaPWsWZEv9DC3heqe1IB1ZKz2D_0tRtSr5AdgU-GEw?e=cW2poX' },
  { type: 'Conference', date: '2023-01-24', title: 'Speed Control of BLDC Motor Using PI Controller', host: 'IEEE ICONAT 2023, Goa', role: 'Presenter', level: 'International', image: 'images/conferences/img_147', certificateUrl: SP + 'Efboy3Chi4dHudGl3TLQi_MBjWrubaJIV1CcstooErTgYg?e=KmFp43' },
  { type: 'Conference', date: '2022-12-26', title: 'Development of IoT Based GSM Controller for Agriculture Applications', host: 'ICERECT 2022, PES College of Engineering, Mandya', role: 'Presenter', level: 'International', image: 'images/conferences/img_150', certificateUrl: SP + 'ER_Rk4VhcThOjU36IrRs7awBCmLMYBFl_Pl_H1Cca__gGg?e=qR9bre' },
  { type: 'Conference', date: '2022-12-01', title: 'Development of Fault Detection Method in Cable Using Arduino UNO', host: '7th IEEE ICRAIE 2022, NIT Karnataka', role: 'Presenter', level: 'International', image: 'images/conferences/img_149', certificateUrl: SP + 'Ee4vvXsbdaFEkkewjLNfwYsBVxqJdL7dkZrjoFZFlPRa1Q?e=ymMs4o' },
  { type: 'Conference', date: '2022-05-26', title: 'Comparative Analysis of Control Strategies for Dynamic Voltage Restorer', host: 'IEEE TEECCON 2022, REVA University', role: 'Presenter', level: 'International', image: 'images/conferences/img_148', certificateUrl: 'https://revaedu-my.sharepoint.com/:i:/g/personal/bansilal_bairwa_reva_edu_in/ESw2OGWSJY1AhEbAaeJEDB0B-sHgob34DMhCN2q00Y8FFQ?e=fuTEMK' },

  // ---------------- FDPs attended ----------------
  { type: 'FDP Attended', date: '2023-02-20', title: 'Power & Control Strategy for Net-Zero Emissions (PCSN-2023) — Short Term Course', host: 'SVNIT Surat', role: 'Participant', image: 'images/fdp/img_143', certificateUrl: SP + 'EegJSG4SVjRNmyAd1GiPK0kBKVpr-U3_jWTeZWXFYiwiEw?e=fC0JCV' },
  { type: 'FDP Attended', date: '2021-10-04', title: 'Artificial Intelligence and Machine Learning (AICTE ATAL)', host: 'NIT Raipur', role: 'Participant', image: 'images/fdp/img_138', certificateUrl: SP + 'EcMHLLcYqSJMiRMPGQdagIoBTOeD46d5Jbtzz3YAJNEfwg?e=43HfC9' },
  { type: 'FDP Attended', date: '2021-07-26', title: 'Peer-to-peer Energy Transaction in Smart Distribution Systems (AICTE ATAL)', host: 'Vellore Institute of Technology', role: 'Participant', image: 'images/fdp/img_139', certificateUrl: SP + 'EVwKqtpygFpDmBE4P8VFnJsBznT05TtWN1gWhhhk5gIQ5Q?e=nuZDC0' },
  { type: 'FDP Attended', date: '2021-07-21', title: 'Semantic Intelligence: The Way Forward with Artificial Intelligence (AICTE ATAL)', host: 'NIT Kurukshetra', role: 'Participant', image: 'images/fdp/img_142', certificateUrl: SP + 'EYm2nTn-IMRHv6xoZs0waKIBNLm6J-Iwy4i8Ncn1VPv5_g?e=OYhS4y' },
  { type: 'FDP Attended', date: '2021-02-22', title: 'Recent Trends in Smart Grid and Renewable Energy Technology', host: 'REVA University, Bengaluru', role: 'Participant', image: 'images/fdp/img_141', certificateUrl: SP + 'ETka2iCrB1JCi9gTmk3NSxQBJzjO8_SkEBvC22j82ut6cg?e=fVoZs2' },
  { type: 'FDP Attended', date: '2021-01-25', title: 'The Challenges in Strengthening Clean Technology Entrepreneurship', host: 'MNIT Jaipur', role: 'Participant', image: 'images/fdp/img_140', certificateUrl: SP + 'Ee7ZQjOIHShNmktiIK3HhikBeMQRYSP8C7EyPu-PrKYI1A?e=7x3Tp7' },

  // ---------------- Workshops & programmes attended ----------------
  { type: 'Workshop', date: '2022-11-04', title: 'Young Researchers’ Meet 2022', host: 'IEEE PES Bangalore Chapter & BMSCE', role: 'Participant', image: 'images/workshops/img_091' },
  { type: 'Workshop', date: '2021-09-06', title: 'Online FDP: Advanced Optimization Techniques with MATLAB/SCILAB', host: 'E&ICT Academies (MNIT Jaipur, NIT Patna, IIITDM Jabalpur, IIT Guwahati)', role: 'Participant', image: 'images/workshops/img_092', certificateUrl: SP + 'ES-sZCKY7QlKno5R8MJCNYgBcoha9uZ2-iwfRSrPIFTv5Q?e=yjMiT3' },
  { type: 'Workshop', date: '2021-07-22', title: 'IEEE PES Global Workshop: Electric Vehicle – Grid Integration', host: 'IEEE PES India Chapters Council & IEEE SA', role: 'Participant', image: 'images/workshops/img_089', certificateUrl: SP + 'Ebf7W-bdgsVOkjUeTYCrX74Bn4q6rrktECzfm64a2KpOmw?e=zJiqPP' },
  { type: 'Workshop', date: '2021-04-19', title: 'Green Energy Development: Supporting Technologies and Environmental Aspects', host: 'REVA University IEEE PES Student Branch & IEEE PES Bangalore', role: 'Participant', image: 'images/workshops/img_087', certificateUrl: SP + 'EbjqkXUB1o1Clarc-Or-XlwBX93WlzVJDXRccUIpJehhQA?e=4flepr' },
  { type: 'Workshop', date: '2019-11-30', title: 'Industry Academia Conclave on Energy Storage', host: 'DST (Govt. of India) at MNIT Jaipur', role: 'Participant · Best Poster', image: 'images/workshops/img_093', certificateUrl: SP + 'EWVU1yyDIhRFll4eLadouPoB438ugCK1GPMrQ8Kn5ujOsQ?e=ntffGm' },
  { type: 'Workshop', date: '2019-03-11', title: 'AICTE ATAL Workshop: Energy Storage — The Future of Energy', host: 'MNIT Jaipur', role: 'Participant', image: 'images/workshops/img_090' },
  { type: 'Workshop', date: '2015-03-04', title: 'Power Electronics Applications and Technology in Present Energy Scenario (TEQIP-II)', host: 'NIT Karnataka, Surathkal', role: 'Participant', image: 'images/workshops/img_088' },
];

export const eventTypes = ['Expert Talk', 'Organised', 'Session Chair', 'Reviewer', 'Conference', 'FDP Attended', 'Workshop'];
