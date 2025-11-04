import { useState } from 'react'
import HeroImage from "../assets/hero.png";
import PatientLogo from "../assets/patient.png"
import DoctorLogo from "../assets/doctor.png"
import PharmacyLogo from "../assets/pharmacy.png"
import SecureCircle from "../assets/secure-cir.png"
import VerifiedLogo from "../assets/verified.png"
import ValidLogo from "../assets/valid.png"
import DoctorIcon from "../assets/doctoricon.png"
import PharmacyIcon from "../assets/pharmacyicon.png"
import SecureIcon from "../assets/secure.png"
import FilesIcon from "../assets/files.png"
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
    <p>Sign in to your MedLock account based on your role in the healthcare ecosystem</p>

    <div className="role-cards">
        <div className="role-card patient">
        <img src={PatientLogo} alt="Patient" />
        <h4>Patient</h4>
        <p>Manage your health records securely and control who has access to your medical data.</p>
        <button>Sign In as a Patient</button>
        </div>

        <div className="role-card doctor">
        <img src={DoctorLogo} alt="Doctor" />
        <h4>Doctor</h4>
        <p>View patient data with permission and create verified medical prescriptions.</p>
        <button>Sign In as a Doctor</button>
        </div>

        <div className="role-card pharmacy">
        <img src={PharmacyLogo} alt="Pharmacy" />
        <h4>Pharmacy</h4>
        <p>Verify and dispense prescriptions with blockchain-verified authenticity.</p>
        <button>Sign In as a Pharmacy</button>
        </div>
    </div>
    </section>

    <section className="how">
        <h2>How MedLock works</h2>
        <p>Three core pillars of Decentralised healthcare Data management.</p>
        <div className="how-cards">
            <div className="how-card records">
                <img src={SecureCircle} />
                <h4>Private Health Records</h4>
                <p>
                    Your medical records are encrypted end-to-end and stored securely
                     on Walrus. Only you control access permissions, with 
                    cryptographic proof of every interaction.
                </p>
            </div>
            <div className="how-card prescriptions">
                <img src={VerifiedLogo} />
                <h4>Doctor-verified Precriptions</h4>
                <p>Prescriptions are digitally signed by licensed 
                    doctors and recorded on-chain, creating an immutable audit trail that 
                    prevents fraud and ensures authenticity.</p>
            </div>
            <div className="how-card validation">
                <img src={ValidLogo} />
                <h4>Pharmacy Validation</h4>
                <p>Pharmacies verify prescriptions instantly using blockchain validation,
                     marking them as dispensed with full transparency 
                    and traceability for all parties.</p>
            </div>
        </div>
    </section>
    <section className="review">
  <h2>Trusted by Patients and Providers</h2>
  
  <div className="review-cards">
    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        “Finally, I have complete control over my medical records. Sharing with specialists is instant and secure.”
      </p>
      <div className="reviewer">
        <img src={PatientLogo} alt="Sarah Martinez" />
        <div>
          <h4>Sarah Martinez</h4>
          <span>Patient, Los Angeles</span>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        “HealthLock streamlines my practice. Accessing patient history is fast, and prescriptions are tamper-proof.”
      </p>
      <div className="reviewer">
        <img src={DoctorIcon} alt="Dr. James Chen" />
        <div>
          <h4>Dr. James Chen, MD</h4>
          <span>Cardiologist, Boston Medical</span>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        “Prescription verification is instantaneous. We've eliminated fraud and our patients appreciate the transparency.”
      </p>
      <div className="reviewer">
        <img src={PharmacyIcon} alt="Maria Rodriguez" />
        <div>
          <h4>Maria Rodriguez, PharmD</h4>
          <span>Lead Pharmacist, CVS</span>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="active">
    <div className="patients">
        <h2>50K+</h2>
        <p>Active Patients</p>
    </div>
    <div className="patients">
        <h2>2,500+</h2>
        <p>Healthcare Providers</p>
    </div>
    <div className="patients">
        <h2>1M+</h2>
        <p>Records Secure</p>
    </div>
    <div className="patients">
        <h2>99.9%</h2>
        <p>Uptime Guaratee</p>
    </div>
</section>
<section className="transform">
  <h2>Transform Your Healthcare Experience</h2>

  <div className="transform-cards">

    <div className="transform-card before">
      <h4>❌ Before HealthLock</h4>
      <img src={FilesIcon} alt="Before HealthLock" />
      <ul>
        <li>✖ Lost medical records</li>
        <li>✖ No control over data</li>
        <li>✖ Privacy concerns</li>
        <li>✖ Provider friction</li>
        <li>✖ Prescription errors</li>
        <li>✖ Limited access</li>
      </ul>
    </div>

    <div className="transform-arrow">
      <span>🡲</span>
    </div>

    <div className="transform-card after">
      <h4> After MedLock</h4>
      <img src={SecureIcon} alt="After HealthLock" />
      <ul>
        <li>✔ Always accessible records</li>
        <li>✔ Complete data control</li>
        <li>✔ Bank-grade security</li>
        <li>✔ Seamless provider sharing</li>
        <li>✔ Verified prescriptions</li>
        <li>✔ 24/7 availability</li>
      </ul>
    </div>
  </div>
</section>

</>
  )
}

export default LandingPage;