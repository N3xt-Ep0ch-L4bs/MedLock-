import { useState } from 'react'
import HeroImage from "../assets/hero.png"
import "./pages.css"

function LandingPage() {

  return (
    <>
        <section className="hero">
           <div className="hero-content">
            <h1>Your health. Your data. Your rules</h1>
            <p>Secure, blockchain-powered healthcare platform<br />giving you completecontrol over your medical records,<br />prescriptions and care coordination.</p>
            <button className="start-btn">Get Started</button>
            <button className="learn-btn">Learn More</button>
           </div>
           <div className="hero-img">
            <img src={HeroImage} alt="animation" />
           </div>
        </section>
    </>
  )
}

export default LandingPage;