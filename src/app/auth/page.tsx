'use client';

import { useState } from 'react';
import HoloMosaic from '../../components/HoloMosaic';

export default function AuthPage() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

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
        opacity={0.65}
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
        <div className="auth-card">
          <div className="auth-brand-mark">S<span>·</span></div>
          <p className="auth-kicker">STUDENTHOME</p>
          <h1>{mode === 'signup' ? 'Your world starts here.' : 'Welcome back.'}</h1>
          <p className="auth-subtitle">{mode === 'signup' ? 'Create your account and bring your academic life together.' : 'Sign in to pick up where you left off.'}</p>

          <div className="auth-switch" role="tablist" aria-label="Authentication mode">
            <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign up</button>
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Log in</button>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            {mode === 'signup' && <label>Full name<input type="text" autoComplete="name" placeholder="Your name" required /></label>}
            <label>Student email<input type="email" autoComplete="email" placeholder="you@institution.edu" required /></label>
            <label>Password<input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" minLength={8} required /></label>
            {mode === 'signup' && <label>Institution <span className="optional">OPTIONAL</span><input type="text" placeholder="Your college or university" /></label>}
            {mode === 'login' && <a className="forgot-link" href="#forgot-password">Forgot password?</a>}
            <button className="auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <span>↗</span></button>
          </form>

          <p className="auth-legal">{mode === 'signup' ? 'By creating an account, you agree to our Terms of Service and Privacy Policy.' : 'Secure access to your connected student experience.'}</p>
        </div>
        <p className="auth-footer">ONE CONNECTED STUDENT EXPERIENCE</p>
      </section>
    </main>
  );
}
