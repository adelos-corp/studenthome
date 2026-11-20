'use client';

import { useState, type FormEvent } from 'react';
import HoloMosaic from '../../components/HoloMosaic';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('Login will be connected when authentication is integrated.');
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
        <div className="auth-card auth-login-card">
          <form className="auth-form signup-form" onSubmit={login}>
            <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Password" required /></label>
            {error && <p className="auth-notice">{error}</p>}
            <button className="auth-submit" type="submit">Log in <span>→</span></button>\n            <div className="auth-divider"><span>or</span></div>\n            <GoogleSignInButton />\n            <p className="auth-signup-prompt">New here? <a href="/auth?mode=signup">Create an account</a></p>
          </form>
        </div>
      </section>
    </main>
  );
}
