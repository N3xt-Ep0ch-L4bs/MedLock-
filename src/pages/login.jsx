import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedLockLogo from "../assets/logo.png";
import PatientIcon from "../assets/patient.png";
import DoctorIcon from "../assets/doctor.png";
import PharmacyIcon from "../assets/pharmacy.png";
import LoginImage from "../assets/login-image.png"
import "./pages.css";

const Login = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role) {
      navigate(`/login/${role.toLowerCase()}`);
    }
  };

  return (
    <>
    <div className="login">
      <img src={LoginImage} className="login-img" />
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src={MedLockLogo} alt="MedLock Logo" className="logo" />
          <h2>Welcome to MedLock</h2>
          <p>Secure, private healthcare powered by zero-knowledge authentication</p>
        </div>

        <div className="role-section">
          <p className="role-label">I am a...</p>

          <div
            className={`specialty ${role === "Patient" ? "selected" : ""}`}
            onClick={() => setRole("Patient")}
          >
            <div className="role-left">
              <img src={PatientIcon} alt="Patient" />
              <div>
                <h4>Patient</h4>
                <span>Manage my health records</span>
              </div>
            </div>
            <span className="arrow">›</span>
          </div>

          <div
            className={`specialty ${role === "Doctor" ? "selected" : ""}`}
            onClick={() => setRole("Doctor")}
          >
            <div className="role-left">
              <img src={DoctorIcon} alt="Doctor" />
              <div>
                <h4>Doctor</h4>
                <span>View patient data and prescribe</span>
              </div>
            </div>
            <span className="arrow">›</span>
          </div>

          <div
            className={`specialty ${role === "Pharmacy" ? "selected" : ""}`}
            onClick={() => setRole("Pharmacy")}
          >
            <div className="role-left">
              <img src={PharmacyIcon} alt="Pharmacy" />
              <div>
                <h4>Pharmacy</h4>
                <span>Verify and dispense prescriptions</span>
              </div>
            </div>
            <span className="arrow">›</span>
          </div>
        </div>

        <button
          className={`continue-btn ${role ? "active" : ""}`}
          disabled={!role}
          onClick={handleContinue}
        >
          Continue
        </button>

        <div className="login-footer">
          <p className="links">
            <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a> •{" "}
            <a href="#">Security</a>
          </p>
          <div className="footer-icons">
            <span>🔒 256-bit Encryption</span>
            <span>🩺 HIPAA Compliant</span>
            <span>🧠 Zero-Knowledge</span>
          </div>
        </div>
      </div>
    </div>
   </div>
    </>
  );
};

export default Login;
