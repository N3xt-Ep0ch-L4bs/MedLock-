import React, { useState } from "react";
import "./pharmacy.css";
import Logo from "../assets/logo.png";
import {
  CheckCircle,
  Search,
  QrCode,
  ArrowLeft,
  ClipboardCopy,
} from "lucide-react";

const PharmacyDashboard = () => {
  const [activeTab, setActiveTab] = useState("Active Prescriptions");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const prescriptions = [
    {
      id: "RX-2847392",
      patient: "John Smith",
      initials: "JS",
      doctor: "Dr. Sarah Chen",
      medication: "Lisinopril 10mg, 30 tablets",
      date: "Jan 15, 2025",
      status: "Ready",
    },
    {
      id: "RX-2847391",
      patient: "Emily Martinez",
      initials: "EM",
      doctor: "Dr. Michael Lee",
      medication: "Metformin 500mg, 60 tablets",
      date: "Jan 15, 2025",
      status: "Active",
    },
    {
      id: "RX-2847390",
      patient: "David Park",
      initials: "DP",
      doctor: "Dr. Lisa Johnson",
      medication: "Atorvastatin 20mg, 90 tablets",
      date: "Jan 14, 2025",
      status: "Flagged",
    },
    {
      id: "RX-2847389",
      patient: "Sarah Johnson",
      initials: "SJ",
      doctor: "Dr. James Wilson",
      medication: "Amoxicillin 500mg, 21 capsules",
      date: "Jan 14, 2025",
      status: "Ready",
    },
  ];

  const recentActivity = [
    { name: "Michael Thompson", action: "Dispensed 15 minutes ago" },
    { name: "Linda White", action: "Dispensed 45 minutes ago" },
    { name: "Patricia Garcia", action: "Dispensed 1 hour ago" },
    { name: "Thomas Anderson", action: "Dispensed 2 hours ago" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Ready":
        return "status-ready";
      case "Active":
        return "status-active";
      case "Flagged":
        return "status-flagged";
      case "Dispensed":
        return "status-dispensed";
      default:
        return "";
    }
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleOpenPrescription = (p) => {
    setSelectedPrescription(p);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="pharmacy-dashboard">
      {/* HEADER */}
      <header className="pharmacy-header">
        <div className="logo-section">
          <img src={Logo} alt="MedLock Logo" className="logo" />
          <h2>MedLock</h2>
          <span className="portal-text">Pharmacy Portal</span>
        </div>
        <div className="user-section">
          <span className="username">Maria Rodriguez</span>
          <span className="roles">PharmD</span>
          <div className="profile-circle">MR</div>
        </div>
      </header>

      {/* MAIN VIEWS */}
      {!selectedPrescription ? (
        <>
          {/* Dashboard */}
          <div className="search">
            <div className="search-input">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by patient name, ID, or prescription number"
              />
            </div>
            <button className="qr-button">
              <QrCode size={18} />
              Scan Prescription QR Code
            </button>
            <button className="history-btn">History</button>
          </div>

          <div className="tabs">
            {["Active Prescriptions", "Pending Verification", "Dispensed Today", "All"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="dashboard-content">
            <div className="prescription-section">
              <div className="section-header">
                <h3>Prescription Queue</h3>
                <p>Showing 1–8 of 24 prescriptions</p>
              </div>

              <table className="prescription-table">
                <thead>
                  <tr>
                    <th>Prescription ID</th>
                    <th>Patient Name</th>
                    <th>Doctor Name</th>
                    <th>Medication</th>
                    <th>Date Prescribed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((p) => (
                    <tr key={p.id}>
                      <td className="id">{p.id}</td>
                      <td>
                        <div className="patient-info">
                          <div className="patient-initials">{p.initials}</div>
                          <span>{p.patient}</span>
                        </div>
                      </td>
                      <td>{p.doctor}</td>
                      <td>{p.medication}</td>
                      <td>{p.date}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="verify-btn"
                          onClick={() => handleOpenPrescription(p)}
                        >
                          {p.status === "Ready"
                            ? "Verify & Dispense"
                            : "View Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="activity-section">
              <h3>Recent Activity</h3>
              <ul>
                {recentActivity.map((a, i) => (
                  <li key={i}>
                    <div>
                      <p className="activity-name">{a.name}</p>
                      <span className="activity-time">{a.action}</span>
                    </div>
                    <CheckCircle className="check-icon" size={18} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Prescription Selected Background */}
          <div className="prescription-selected-container">
            <button
              className="back-button"
              onClick={() => setSelectedPrescription(null)}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div className="prescription-selected-card">
              <h2>Prescription Selected</h2>
              <p className="instruction">
                Review prescription details in the right panel. Click{" "}
                <strong>"Mark as Dispensed"</strong> when ready to complete
                transaction.
              </p>

              <div className="details-grid">
                <div className="detail-box">
                  <span className="label">Patient Name</span>
                  <p className="value">{selectedPrescription.patient}</p>
                </div>
                <div className="detail-box">
                  <span className="label">Prescription ID</span>
                  <p className="value id">{selectedPrescription.id}</p>
                </div>
                <div className="detail-box">
                  <span className="label">Medication</span>
                  <p className="value">{selectedPrescription.medication}</p>
                </div>
                <div className="detail-box">
                  <span className="label">Prescribed By</span>
                  <p className="value">{selectedPrescription.doctor}</p>
                </div>
                <div className="detail-box">
                  <span className="label">Date Prescribed</span>
                  <p className="value">{selectedPrescription.date}</p>
                </div>
                <div className="detail-box">
                  <span className="label">Status</span>
                  <p className="value status">{selectedPrescription.status}</p>
                </div>
              </div>

              <div className="blockchain-box">
                <div className="blockchain-header">
                  <div className="dot"></div>
                  <h4>Blockchain Verified Prescription</h4>
                </div>
                <p className="blockchain-subtext">Authenticated on Sui Network</p>
                <p className="blockchain-description">
                  This prescription has been cryptographically verified and is stored
                  immutably on the blockchain. All dispensation actions will be
                  permanently recorded for audit compliance.
                </p>
              </div>
            </div>

            {/* POPUP ON TOP */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-panel">
                  <div className="popup-header">
                    <div>
                      <p className="popup-id">{selectedPrescription.id}</p>
                      <p className="popup-date">Prescribed on Oct 28, 2024</p>
                    </div>
                    <button className="close-btn" onClick={handleClosePopup}>
                      ✕
                    </button>
                  </div>
                  {/* Patient & Doctor Info Card */}
                    <div className="popup-section info-card">
                      <div className="info-card-row">
                        <div className="info-box patient-box">
                          <span className="label">Patient Name</span>
                          <p className="value">{selectedPrescription.patient}</p>
                        </div>
                        <div className="info-box doctor-box">
                          <span className="label">Doctor Name</span>
                          <p className="value">{selectedPrescription.doctor}</p>
                        </div>
                      </div>
                    </div>

                  <div className="popup-section">
                    <h4>Medication Details</h4>
                    <div className="medication-box">
                      <p className="med-name">{selectedPrescription.medication}</p>
                      <p className="med-info">Strength: 10mg | Form: Tablet</p>
                      <p className="med-info">
                        Quantity: 30 tablets | Refills: 2 remaining
                      </p>
                    </div>
                  </div>

                  <div className="popup-section">
                    <h4>Dosage Instructions</h4>
                    <ul className="dosage-list">
                      <li>Take one tablet by mouth once daily</li>
                      <li>Take with food</li>
                      <li>For high blood pressure management</li>
                    </ul>
                  </div>

                  <div className="popup-section">
                    <h4>Blockchain Verification</h4>
                    <div className="verification-box">
                      <div className="verified-header">
                        <CheckCircle className="verified-icon" />
                        <div>
                          <p className="verified-text">Authentic Prescription ✓</p>
                          <p className="verified-sub">Verified on Sui Blockchain</p>
                        </div>
                      </div>

                      <div className="hash-box">
                        <p className="hash">
                          0x784ac6e4bdf0a3e4dc9e5e8a21cb178a25de43dc32b1199e87b9f5d54
                        </p>
                        <ClipboardCopy size={16} className="copy-icon" />
                      </div>

                      <p className="view-chain">View on Chain ↗</p>
                      <p className="verified-time">
                        Verified: Oct 28, 2024 10:42 AM
                      </p>
                    </div>
                  </div>

                  <div className="popup-section">
                    <h4>Drug Interaction Check</h4>
                    <div className="safe-box">
                      <CheckCircle className="safe-icon" />
                      <p>Safe to dispense – No interactions detected</p>
                    </div>
                    <p className="subtext">
                      Checked against patient’s current medications and allergies.
                    </p>
                  </div>
                  <button className="dispense-btn" onClick={() => setShowConfirmPopup(true)}>
                    Mark as Dispensed
                  </button>
                  <div className="action-links">
                    <p className="contact">📞 Contact Doctor</p>
                    <p className="report">⚠️ Report Issue</p>
                  </div>

                  <div className="popup-section">
                    <h4>Pharmacy Notes</h4>
                    <textarea
                      className="notes-box"
                      placeholder="Add notes for record..."
                    ></textarea>
                    <p className="autosave-note">🕒 Notes auto-save with timestamp</p>
                  </div>
                  {showConfirmPopup && (
                      <div className="popup-overlay">
                        <div className="confirm-popup">
                          <h3>Confirm Dispensation</h3>
                          <p className="note">This action will be recorded on the blockchain.</p>

                          <div className="confirm-info">
                            <div><strong>Patient Name:</strong> Ezekiel Okon</div>
                            <div><strong>Medication:</strong> Lisinopril 10mg, 30 tablets</div>
                            <div><strong>Prescription ID:</strong> RX-2847392</div>
                          </div>

                          <h4>Verification Checklist</h4>
                          <div className="checklist">
                            <label><input type="checkbox" /> Verified patient identity</label>
                            <label><input type="checkbox" /> Counseled patient on medication usage</label>
                            <label className="checked">
                              <input type="checkbox" checked readOnly /> Checked for drug interactions
                            </label>
                            <label><input type="checkbox" /> Patient signature obtained</label>
                          </div>

                          <div className="payment-section">
                            <label>Amount to be paid</label>
                            <input type="text" defaultValue="$15.00" />
                            <p className="warning">
                              Once patient confirms payment, this dispensation will be permanently recorded
                              on the blockchain and cannot be reversed.
                            </p>
                          </div>

                          <div className="confirm-actions">
                            <button className="cancel-btn" onClick={() => setShowConfirmPopup(false)}>
                              ✕ Cancel
                            </button>
                            <button className="confirm-btn"> Confirm Dispensation</button>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PharmacyDashboard;
