'use client';

import { useState, type FormEvent } from 'react';
import HoloMosaic from '../../components/HoloMosaic';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { createClient } from '@/lib/supabase/client';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const createAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (password.length < 5) {
      setError('Your password must be at least 5 characters long.');
      return;
    }

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`, 
      },
    });

    if (authError) {
      setError(authError.message);
      return;
    }
    if (!data.session) {
      setError('Account created. Check your email to confirm your account, then log in.');
      return;
    }
    window.location.href = '/onboarding';
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
        intro={false}
        mouseInteraction
        mouseStrength={0.08}
        mouseRadius={0.08}
        flipOnClick
        lightMode
      />
      <div className="auth-wash" />
      <header className="auth-header">
        <a className="auth-studenthome-link" href="/" aria-label="Studenthome">studenthome</a>
      </header>

      <section className="auth-content">
        <div className="auth-card auth-signup-card">
          <div className="auth-brand-mark">S<span>·</span></div>
          <form className="auth-form signup-form" onSubmit={createAccount}>
            <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="Create password" minLength={5} required /><span className="field-hint">At least 5 characters.</span></label>
            {error && <p className={error.startsWith('Account created.') ? 'auth-notice' : 'auth-error'}>{error}</p>}
            <button className="auth-submit" type="submit">Create account <span>↗</span></button>
            <div className="auth-divider"><span>or</span></div>
            <GoogleSignInButton />
            <p className="auth-signup-prompt">Already have an account? <a href="/login">Log in</a></p>
          </form>
        </div>
      </section>
    </main>
  );
}
