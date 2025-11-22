import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useConnectWallet, useCurrentWallet, useWallets } from "@mysten/dapp-kit";
import { isEnokiWallet, EnokiWallet, AuthProvider } from "@mysten/enoki";
import MedLockLogo from "../assets/logo.png";
import PatientIcon from "../assets/patient.png";
import DoctorIcon from "../assets/doctor.png";
import PharmacyIcon from "../assets/pharmacy.png";
import LoginImage from "../assets/login-image.png"; 
import "./pages.css";

const Login = () => {
  const [role, setRole] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { mutate: connectWallet } = useConnectWallet();
  const { currentWallet, isConnected } = useCurrentWallet();
  const wallets = useWallets();

  // Get Enoki wallets and find Google wallet
  const googleWallet = useMemo(() => {
    const enokiWallets = wallets.filter(isEnokiWallet);
    const walletsByProvider = enokiWallets.reduce(
      (map, wallet) => map.set(wallet.provider, wallet),
      new Map<AuthProvider, EnokiWallet>()
    );
    return walletsByProvider.get("google");
  }, [wallets]);

  // Navigate to appropriate dashboard after successful connection
  useEffect(() => {
    if (isConnected && currentWallet && role) {
      setIsConnecting(false);
      if (role === "Patient") {
        navigate("/dashboard");
      } else if (role === "Doctor") {
        navigate("/doctor");
      } else if (role === "Pharmacy") {
        navigate("/pharmacy");
      }
    }
  }, [isConnected, currentWallet, role, navigate]);

  const goToIdentityStep = () => {
    if (!role) return; 
    setStep(2);
  };

  const handleGoogleContinue = async () => {
    if (!role) return;
    
    if (!googleWallet) {
      alert("Google wallet is not available. Please check your Enoki configuration.");
      return;
    }
    
    setIsConnecting(true);
    
    try {
      // Connect to Enoki Google wallet - this will trigger Google OAuth flow
      connectWallet(
        {
          wallet: googleWallet,
        },
        {
          onSuccess: () => {
            // Navigation will happen in useEffect when isConnected becomes true
            console.log("Successfully connected to Enoki Google wallet");
          },
          onError: (error) => {
            console.error("Failed to connect wallet:", error);
            setIsConnecting(false);
            alert("Failed to connect. Please try again.");
          },
        }
      );
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="login-container">
      {step === 1 && (
        <>
          <img src={LoginImage} className="login-img" alt="illustration" />
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
                role="button"
                tabIndex={0}
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
                role="button"
                tabIndex={0}
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
                role="button"
                tabIndex={0}
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
              onClick={goToIdentityStep}
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
        </>
      )}

      {step === 2 && (
        <div className="identity-step">
          <div className="identity-left">
              <img src={LoginImage} alt="verification illustration" className="identity-image" />
          </div>

          <div className="identity-right">
            <button className="back-link" onClick={() => setStep(1)}>← Back</button>

            <img src={MedLockLogo} alt="MedLock Logo" className="identity-logo" />
            <h2 className="identity-title">MedLock</h2>

            <button className="selected-role">{role}</button>

            <button 
              className="google-btn" 
              onClick={handleGoogleContinue}
              disabled={isConnecting}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="google-icon"
              />
              {isConnecting ? "Connecting..." : "Continue with Google"}
            </button>

            <p className="privacy-links">
              <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a> •{" "}
              <a href="#">Security</a>
            </p>

            <div className="security-tags">
              <span>🔒 256-bit Encryption</span>
              <span>🩺 HIPAA Compliant</span>
              <span>🧠 Zero-Knowledge</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

