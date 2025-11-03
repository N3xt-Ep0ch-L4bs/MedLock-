import { useState } from 'react'
import HeroImage from "../assets/hero.png"
import "./pages.css"

function LandingPage() {

  return (
<>
    <section className="hero">
        <div className="hero-content">
            <h1>Your health. Your <br />data.Your rules</h1>
            <p>Secure,blockchain-powered healthcare platform<br />
            giving you completecontrol over your medical records,<br />prescriptions and care coordination.</p>
            <button className="start-btn">Get Started</button>
            <button className="learn-btn">Learn More</button>
        </div>
        <div className="hero-img">
            <img src={HeroImage} alt="animation" />
        </div>
    </section>
    <section className="role">
            <h2>Choose Your Role</h2>
            <p>Sign in to your MedLock account based on your role in the healthcare ecosystem </p>
        <div className="role-cards">
            <div className="patient-card">
                <img src="" />
                <h4>Patient</h4>
                <p>Manage your health records securely and control who has access to your medical data</p>
                <button>Sign In as a Patient</button>
            </div>
            <div className="doctor-card">
                <img src="" />
                <h4>Doctor</h4>
                <p>View patient data with permission and create verified medical prescription</p>
                <button>Sign In a Doctor</button>
            </div>
            <div className="pharmacy-card">
                <img src="" />
                <h4>Pharmacy</h4>
                <p>Verify and and dispense prescription with blockchain verified authencity</p>
                <button>Sign In as a Pharmacy</button>
            </div>
        </div>
    </section>
</>
  )
}

export default LandingPage;