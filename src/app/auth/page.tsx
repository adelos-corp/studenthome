'use client';

import { useState, type FormEvent } from 'react';
import HoloMosaic from '../../components/HoloMosaic';

const educationLevels = [
  'Unschooling',
  'Primary education',
  'Secondary education',
  'Senior secondary',
  'Intermediate',
  'ITI / Vocational',
  'Diploma',
  'Undergraduate',
  'Engineering',
  'Postgraduate',
  'Doctorate',
  'Other',
];

export default function AuthPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    surname: '',
    dob: '',
    education: '',
    course: '',
    college: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!form.firstName.trim() || !form.lastName.trim() || !form.surname.trim() || !form.dob || !form.education || !form.course.trim() || !form.college.trim() || !form.email.trim()) {
      setError('Please complete all fields before continuing.');
      return;
    }
    setStep(2);
  };

  const createAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password.length < 5) {
      setError('Your password must be at least 5 characters long.');
      return;
    }
    setError('Signup UI is ready. Account creation and course verification will be connected when the backend is integrated.');
  };

  return (
    <main className="auth-page">
      <HoloMosaic
        className="auth-mosaic"
        color="#FFFFFF"
        metalColor="#0049BA"
        spectrum="cool"
        tileSize={1.18}
        gap={0.055}
        roundness={0.12}
        bevel={0.24}
        scatter={0.16}
        tilt={0.18}
        swirl={0.82}
        ripple={0.32}
        bands={0.92}
        softness={0.60}
        intensity={1.12}
        saturation={1.08}
        glitter={0.18}
        sheen={0.48}
        grain={0.018}
        speed={0.26}
        variation={7}
        fade={0.16}
        opacity={0.96}
        intro
        mouseInteraction
        mouseStrength={0.08}
        mouseRadius={0.08}
        flipOnClick
        lightMode
      />
      <div className="auth-wash" />
      <header className="auth-header">
        <a className="adelos-brand" href="/" aria-label="Studenthome home">
          <img className="adelos-logo" src="/adelos-black.svg" alt="ADELOS" />
          <span className="adelos-wordmark"><span className="adelos-name">ADELOS</span><span className="adelos-sub">CORPORATION</span></span>
        </a>
        <a className="auth-back" href="/">← Back to home</a>
      </header>

      <section className="auth-content">
        <div className="auth-card auth-signup-card">
          <div className="auth-brand-mark">S<span>·</span></div>
          <p className="auth-kicker">STUDENTHOME · CREATE ACCOUNT</p>
          <div className="signup-progress"><span className={step === 1 ? 'current' : 'complete'} /><span className={step === 2 ? 'current' : ''} /></div>
          <h1>{step === 1 ? 'Tell us about you.' : 'Create a password.'}</h1>
          <p className="auth-subtitle">{step === 1 ? 'A few details to build your student profile.' : 'One last step to secure your account.'}</p>

          {step === 1 ? (
            <form className="auth-form signup-form" onSubmit={next}>
              <div className="auth-field-grid">
                <label>First name<input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} autoComplete="given-name" placeholder="First name" required /></label>
                <label>Last name<input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} autoComplete="family-name" placeholder="Last name" required /></label>
              </div>
              <label>Surname<input value={form.surname} onChange={(e) => update('surname', e.target.value)} placeholder="Surname" required /></label>
              <label>Date of birth<input className="date-input" type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} required /><span className="field-hint">DD/MM/YYYY</span></label>
              <label>Currently pursuing<select value={form.education} onChange={(e) => update('education', e.target.value)} required><option value="" disabled>Select your education level</option>{educationLevels.map((level) => <option key={level} value={level}>{level}</option>)}</select></label>
              <label>Course<input value={form.course} onChange={(e) => update('course', e.target.value)} placeholder="Enter the full course name" required /><span className="field-hint">Use the official full name of your course.</span></label>
              <label>College / Institution<input value={form.college} onChange={(e) => update('college', e.target.value)} placeholder="Enter your college or institution" required /></label>
              <label>Email<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
              {error && <p className="auth-error">{error}</p>}
              <button className="auth-submit" type="submit">Next <span>→</span></button>
            </form>
          ) : (
            <form className="auth-form signup-form" onSubmit={createAccount}>
              <label>Create a password<input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} autoComplete="new-password" placeholder="Create password" minLength={5} required autoFocus /><span className="field-hint">At least 5 characters.</span></label>
              {error && <p className={error.startsWith('Signup UI') ? 'auth-notice' : 'auth-error'}>{error}</p>}
              <button className="auth-submit" type="submit">Create account <span>↗</span></button>
              <button className="auth-secondary" type="button" onClick={() => { setStep(1); setError(''); }}>← Back</button>
            </form>
          )}
          <p className="auth-legal">Your information is used to create your Studenthome profile.</p>
        </div>
        <p className="auth-footer">ONE CONNECTED STUDENT EXPERIENCE</p>
      </section>
    </main>
  );
}
