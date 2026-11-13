import { useState } from 'react';
import { Mail, MapPin, Building2, Send, Copy, ExternalLink, CheckCircle2, AlertCircle, FlaskConical, Handshake, GraduationCap } from 'lucide-react';
import { profile } from '../data/profile';
import { socialLinks } from '../data/socialLinks';
import { SectionHead, Reveal, useApp } from '../components/ui';
import Icon from '../components/Icon';
import { copyText } from '../utils/helpers';

const TYPES = [
  { k: 'Research collaboration', I: FlaskConical },
  { k: 'Academic collaboration', I: Handshake },
  { k: 'Student project enquiry', I: GraduationCap },
  { k: 'Invited talk / FDP', I: Mail },
  { k: 'Other', I: Mail },
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * There is no backend on GitHub Pages, so the form composes an e-mail in the
 * visitor's mail app (mailto:). To receive submissions directly instead, plug a
 * form service (e.g. Formspree) into `handleSubmit` below.
 */
export default function Contact() {
  const { toast } = useApp();
  const to = profile.emails[0];
  const [f, setF] = useState({ type: TYPES[0].k, name: '', email: '', org: '', subject: '', message: '' });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState(null);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: undefined }); };

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid e-mail address.';
    if (f.message.trim().length < 20) e.message = 'Please write at least 20 characters.';
    setErr(e);
    return !Object.keys(e).length;
  };
  const body = () => `Enquiry type: ${f.type}\nName: ${f.name}\nE-mail: ${f.email}${f.org ? `\nInstitution / organisation: ${f.org}` : ''}\n\n${f.message}`;
  const subject = () => `[${f.type}] ${f.subject || 'Enquiry from your website'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) { setStatus({ ok: false, msg: 'Please fix the highlighted fields.' }); return; }
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(body())}`;
    setStatus({ ok: true, msg: `Your e-mail app should now open with the message addressed to ${to}. If nothing happened, use “Copy message” and send it manually.` });
  };
  const copyMsg = async () => {
    if (!validate()) { setStatus({ ok: false, msg: 'Please fix the highlighted fields first.' }); return; }
    const ok = await copyText(`To: ${to}\nSubject: ${subject()}\n\n${body()}`);
    toast(ok ? 'Message copied' : 'Copy failed');
  };

  const field = (k, label, props = {}) => (
    <div>
      <label className="lbl" htmlFor={`c-${k}`}>{label}{props.required && <span aria-hidden="true" style={{ color: 'var(--accent-text)' }}> *</span>}</label>
      {props.as === 'textarea'
        ? <textarea id={`c-${k}`} className="textarea" value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} required={props.required} />
        : <input id={`c-${k}`} className="input" type={props.type || 'text'} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `e-${k}` : undefined} required={props.required} autoComplete={props.ac} />}
      {err[k] && <div className="field-err" id={`e-${k}`}>{err[k]}</div>}
    </div>
  );

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead title={<>Contact <span className="grad-text">Me</span></>}
          sub="Open to research and academic collaboration, invited talks and FDPs, and guiding student projects in batteries, EVs, AI and robotics." />
        <div className="contact-grid">
          <Reveal className="card card-pad">
            <div className="contact-line"><span className="ci"><Mail size={19} /></span><div><b>E-mail</b>{profile.emails.map((e) => <div key={e}><a href={`mailto:${e}`}>{e}</a></div>)}</div></div>
            <div className="contact-line"><span className="ci"><Building2 size={19} /></span><div><b>Affiliation</b><span className="muted small">{profile.designation}, {profile.school}, {profile.institution}</span></div></div>
            <div className="contact-line"><span className="ci"><MapPin size={19} /></span><div><b>Location</b><span className="muted small">{profile.location}</span></div></div>
            <div style={{ marginTop: 14 }}>
              <b style={{ color: 'var(--text-strong)', fontSize: 14.5 }}>Profiles</b>
              <div className="filters" style={{ marginTop: 10 }}>
                {socialLinks.filter((s) => s.url && s.id !== 'email').map((s) => (
                  <a key={s.id} className="btn btn-ghost btn-sm" href={s.url} target="_blank" rel="noopener noreferrer"><Icon name={s.icon} size={15} /> {s.label}</a>
                ))}
              </div>
            </div>
            {profile.enquiryFormUrl && (
              <a className="btn btn-ghost" style={{ marginTop: 18, width: '100%' }} href={profile.enquiryFormUrl} target="_blank" rel="noopener noreferrer">Prefer a form? Open the enquiry form <ExternalLink size={15} /></a>
            )}
          </Reveal>
          <Reveal className="card card-pad" delay={0.08}>
            <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
              <fieldset style={{ border: 0, padding: 0, margin: '0 0 16px' }}>
                <legend className="lbl">What is this about?</legend>
                <div className="filters">
                  {TYPES.map(({ k, I }) => <button type="button" key={k} className="filter-chip" aria-pressed={f.type === k} onClick={() => setF({ ...f, type: k })}><I size={14} style={{ verticalAlign: -2, marginRight: 4 }} />{k}</button>)}
                </div>
              </fieldset>
              <div className="form-row two">{field('name', 'Your name', { required: true, ac: 'name' })}{field('email', 'Your e-mail', { required: true, type: 'email', ac: 'email' })}</div>
              <div className="form-row two">{field('org', 'Institution / organisation', { ac: 'organization' })}{field('subject', 'Subject')}</div>
              <div className="form-row">{field('message', 'Message', { required: true, as: 'textarea' })}</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary"><Send size={16} /> Compose e-mail</button>
                <button type="button" className="btn btn-ghost" onClick={copyMsg}><Copy size={16} /> Copy message</button>
              </div>
              <p className="small muted" style={{ marginTop: 10 }}>This opens your own e-mail app with the message pre-filled — nothing is sent or stored by this website.</p>
              {status && (
                <div className={`form-status ${status.ok ? 'ok' : 'err'}`} role={status.ok ? 'status' : 'alert'}>
                  {status.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}<span>{status.msg}</span>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
