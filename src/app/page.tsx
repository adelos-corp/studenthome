'use client';

import HoloMosaic from '../components/HoloMosaic';

export default function Home() {
  return (
    <main className="landing">
      <HoloMosaic
        className="mosaic"
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
        mouseInteraction={false}
        flipOnClick
        lightMode
      />
      <div className="porcelain-wash" aria-hidden="true" />
      <header className="topbar">
        <a className="adelos-brand" href="https://adeloscorp.com/" aria-label="ADELOS Corporation">
          <img className="adelos-logo" src="/adelos-black.svg" alt="ADELOS" />
          <span className="adelos-wordmark">
            <span className="adelos-name">ADELOS</span>
            <span className="adelos-sub">CORPORATION</span>
          </span>
        </a>
        <span className="product-label">STUDENTHOME <span className="product-dot" /></span>
      </header>
      <section className="hero">
        <p className="eyebrow"><span className="eyebrow-line" /> THE STUDENT ECOSYSTEM</p>
        <h1><span>One Home.</span><span className="headline-blue">Every Student.</span></h1>
        <p className="hero-descr">Your academic world, connected.</p>
        <a className="cta" href="#discover">Discover Studenthome <span aria-hidden="true">↗</span></a>
      </section>
      <footer className="footer">
        <span>ONE CONNECTED STUDENT EXPERIENCE</span>
        <span>A PRODUCT OF ADELOS CORP.</span>
      </footer>
    </main>
  );
}
