'use client';

import { useState, type FormEvent } from 'react';
import HoloMosaic from '../../components/HoloMosaic';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  firstName: string;
  lastName: string;
  surnames: string;
  dob: string;
  education: string;
  institution: string;
  course: string;
  stream: string;
  year: string;
  semester: string;
  grade: string;
};

const initial: Profile = {
  firstName: '', lastName: '', surnames: '', dob: '', education: '',
  institution: '', course: '', stream: '', year: '', semester: '', grade: '',
};

const steps = [
  { title: 'Let’s get to know you.', subtitle: 'What should we call you?', fields: ['identity'] },
  { title: 'When were you born?', subtitle: 'Your date of birth helps us personalize your experience.', fields: ['dob'] },
  { title: 'Where are you in your academic journey?', subtitle: 'Choose the education level you’re currently pursuing.', fields: ['education'] },
  { title: 'Where do you study?', subtitle: 'Tell us about your institution.', fields: ['institution'] },
  { title: 'What are you studying?', subtitle: 'Your course and specialization.', fields: ['course'] },
  { title: 'How far along are you?', subtitle: 'Your current year, semester, or grade.', fields: ['progress'] },
];

const educationOptions = ['School', 'Diploma', 'Undergraduate', 'Postgraduate', 'Doctoral', 'Other'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [finished, setFinished] = useState(false);

  const update = (key: keyof Profile, value: string) => setProfile((p) => ({ ...p, [key]: value }));

  const validate = () => {
    if (step === 0 && (!profile.firstName.trim() || !profile.lastName.trim())) return 'First name and last name are required.';
    if (step === 1 && !profile.dob) return 'Please enter your date of birth.';
    if (step === 2 && !profile.education) return 'Choose your education level to continue.';
    if (step === 3 && !profile.institution.trim()) return 'Please enter your school or institution.';
    if (step === 4 && (!profile.course.trim() || !profile.stream.trim())) return 'Please add your course and stream.';
    if (step === 5 && !profile.year && !profile.semester && !profile.grade) return 'Tell us your current year, semester, or grade.';
    return '';
  };

  const next = async (event?: FormEvent) => {
    event?.preventDefault();
    setError('');
    const validation = validate();
    if (validation) { setError(validation); return; }
    if (step < steps.length - 1) { setStep((s) => s + 1); return; }

    setBusy(true);
    const supabase = createClient();
    const { data: authData, error: userError } = await supabase.auth.getUser();
    if (userError || !authData.user) {
      setBusy(false);
      setError('Your session expired. Please log in again.');
      return;
    }

    const fullName = [profile.firstName, profile.lastName, profile.surnames].filter(Boolean).join(' ');
    const profileData = {
      first_name: profile.firstName.trim(),
      last_name: profile.lastName.trim(),
      surnames: profile.surnames.trim() || null,
      full_name: fullName,
      date_of_birth: profile.dob,
      education_level: profile.education,
      college: profile.institution.trim(),
      course: profile.course.trim(),
      stream: profile.stream.trim(),
      academic_year: profile.year || null,
      year_of_study: profile.year || profile.grade || null,
      semester: profile.semester || null,
      grade: profile.grade || null,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Update the trigger-created profile row without attempting to update protected
    // identity columns (id/email). If the row is missing, create it as a fallback.
    const { data: savedProfile, error: updateError } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', authData.user.id)
      .select('id')
      .maybeSingle();

    let saveError = updateError;
    if (!updateError && !savedProfile) {
      const { error: insertError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: authData.user.email,
        ...profileData,
      });
      saveError = insertError;
    }

    setBusy(false);
    if (saveError) { setError('We could not save your profile. Please try again.'); return; }
    setFinished(true);
  };

  const enter = () => { window.location.href = '/dashboard'; };

  return (
    <main className="onboarding-page">
      <HoloMosaic className="onboarding-mosaic" color="#FFFFFF" metalColor="#0049BA" spectrum="cool" tileSize={1.18} gap={0.055} roundness={0.12} bevel={0.24} scatter={0.16} tilt={0.18} swirl={0.82} ripple={0.32} bands={0.92} softness={0.60} intensity={1.12} saturation={1.08} glitter={0.18} sheen={0.48} grain={0.018} speed={0.26} variation={7} fade={0.16} opacity={0.96} intro={false} mouseInteraction mouseStrength={0.08} mouseRadius={0.08} flipOnClick lightMode />
      <div className="onboarding-wash" />
      <header className="onboarding-header"><a href="/" className="auth-studenthome-link">studenthome</a>{!finished && <span className="onboarding-count">{step + 1} <span>/</span> {steps.length}</span>}</header>
      <section className="onboarding-main">
        {finished ? (
          <div className="onboarding-panel welcome-panel">
            <div className="welcome-mark">S<span>·</span></div>
            <p className="onboarding-eyebrow">PROFILE COMPLETE</p>
            <h1>Welcome to<br/><em>Studenthome.</em></h1>
            <p className="onboarding-description">Your academic world starts here.</p>
            <button className="onboarding-next onboarding-enter" onClick={enter}>Enter Studenthome <span>↗</span></button>
          </div>
        ) : (
          <form className="onboarding-panel" onSubmit={next} key={step}>
            <div className="onboarding-progress"><span style={{ width: ((step + 1) / steps.length * 100) + '%' }} /></div>
            <p className="onboarding-eyebrow">LET’S SET YOU UP</p>
            <h1>{steps[step].title}</h1>
            <p className="onboarding-description">{steps[step].subtitle}</p>

            {step === 0 && <div className="onboarding-fields">
              <label>First name<input autoFocus value={profile.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First name" /></label>
              <label>Last name<input value={profile.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last name" /></label>
              <label>Surname(s) <span className="onboarding-optional">OPTIONAL</span><input value={profile.surnames} onChange={(e) => update('surnames', e.target.value)} placeholder="Additional / family names" /></label>
            </div>}

            {step === 1 && <div className="onboarding-fields"><label>Date of birth<input className="onboarding-date" type="date" autoFocus value={profile.dob} onChange={(e) => update('dob', e.target.value)} max={new Date().toISOString().slice(0,10)} /></label></div>}

            {step === 2 && <div className="onboarding-options">{educationOptions.map((option) => <button type="button" className={'onboarding-option' + (profile.education === option ? ' selected' : '')} onClick={() => update('education', option)} key={option}>{option}<span>{profile.education === option ? '✓' : '↗'}</span></button>)}</div>}

            {step === 3 && <div className="onboarding-fields"><label>{profile.education === 'School' ? 'School name' : 'College / institution'}<input autoFocus value={profile.institution} onChange={(e) => update('institution', e.target.value)} placeholder="Institution name" /></label></div>}

            {step === 4 && <div className="onboarding-fields"><label>Course / degree<input autoFocus value={profile.course} onChange={(e) => update('course', e.target.value)} placeholder="e.g. B.Tech, Diploma, CBSE" /></label><label>Stream / specialization<input value={profile.stream} onChange={(e) => update('stream', e.target.value)} placeholder="e.g. Computer Engineering" /></label></div>}

            {step === 5 && <div className="onboarding-fields">
              {profile.education === 'School' ? <label>Grade / class<input autoFocus value={profile.grade} onChange={(e) => update('grade', e.target.value)} placeholder="e.g. Grade 11, Class 10" /></label> : <><label>Current year<input autoFocus value={profile.year} onChange={(e) => update('year', e.target.value)} placeholder="e.g. 2nd year" /></label><label>Semester <span className="onboarding-optional">IF APPLICABLE</span><input value={profile.semester} onChange={(e) => update('semester', e.target.value)} placeholder="e.g. Semester 4" /></label></>}
            </div>}

            {error && <p className="onboarding-error">{error}</p>}
            <div className="onboarding-actions">
              {step > 0 && <button type="button" className="onboarding-back" onClick={() => { setError(''); setStep((s) => s - 1); }}>← Back</button>}
              <button type="submit" className="onboarding-next" disabled={busy}>{busy ? 'Saving…' : step === steps.length - 1 ? 'Finish' : 'Continue'} <span>→</span></button>
            </div>
            <p className="onboarding-footnote">You can update these details later.</p>
          </form>
        )}
      </section>
    </main>
  );
}
