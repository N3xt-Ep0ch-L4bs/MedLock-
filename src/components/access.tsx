import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SuccessICon from "../assets/success-icon1.png"
import "react-datepicker/dist/react-datepicker.css";
import "./components.css";

interface ShareAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Provider {
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  image: string;
}

interface Record {
  id: number;
  title: string;
  date: string;
  size: string;
  image: string;
}

const ShareAccessModal = ({ isOpen, onClose }: ShareAccessModalProps) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [duration, setDuration] = useState<string>("7d");
  const [customDate, setCustomDate] = useState<Date | null>(null);

  // ✅ Helper to display readable duration
  const formatDuration = () => {
    if (duration === "custom" && customDate) {
      return `Until ${customDate.toLocaleString()}`;
    }
    const map: Record<string, string> = {
      "24h": "24 hours",
      "7d": "7 days",
      "30d": "30 days",
      "90d": "90 days",
    };
    return map[duration] || "7 days";
  };

    const [showRecords, setShowRecords] = useState(false);
    const [reason, setReason] = useState("");
    const [editingReason, setEditingReason] = useState(false);
    const [reasonInput, setReasonInput] = useState("");


  const providers: Provider[] = [
    {
      name: "Dr. Alisha Mahmoud",
      specialty: "Cardiology",
      hospital: "City Medical Center",
      rating: 4.9,
      reviews: 127,
      image: "src/assets/Mask group (1).png",
    },
    {
      name: "Dr. James Lin",
      specialty: "Primary Care",
      hospital: "Wellness Clinic",
      rating: 4.6,
      reviews: 203,
      image: "src/assets/Vector (6).png",
    },
    {
      name: "Dr. Sarah Chen",
      specialty: "Endocrinology",
      hospital: "University Hospital",
      rating: 4.7,
      reviews: 89,
      image: "src/assets/Vector (7).png",
    },
    {
      name: "Dr. Michael Rodriguez",
      specialty: "Neurology",
      hospital: "Memorial Hospital",
      rating: 4.6,
      reviews: 156,
      image: "src/assets/Vector (8).png",
    },
  ];

  const records: Record[] = [
    { id: 1, title: "Blood Test Results", date: "Oct 28, 2024", size: "2.4 MB", image: "src/assets/record-icon1.png" },
    { id: 2, title: "Chest X-Ray", date: "Oct 15, 2024", size: "8.7 MB", image: "src/assets/record-icon2.png" },
    { id: 3, title: "ECG Report", date: "Sep 10, 2024", size: "3.2 MB", image: "src/assets/record-icon3.png" },
    { id: 4, title: "Lipid Panel", date: "Sep 22, 2024", size: "1.8 MB", image: "src/assets/record-icon4.png" },
    { id: 5, title: "Prescription - Lisinopril", date: "Oct 10, 2024", size: "324 KB", image: "src/assets/record-icon5.png" },
    { id: 6, title: "Urinalysis", date: "Aug 28, 2024", size: "1.1 MB", image: "src/assets/record-icon6.png" },
  ];

  const toggleRecord = (id: number) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="share-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Share Access to Your Records</h2>
        <p className="step-text">Step {step} of 5</p>

        {/* === Step 1: Select Provider === */}
        {step === 1 && (
          <>
            <div className="search-section">
              <input
                type="text"
                placeholder="Search for provider by name, specialty or hospital"
              />
            </div>

            <h4>Providers in Your Network</h4>
            <div className="provider-list">
              {providers.map((p, i) => (
                <div
                  key={i}
                  className={`provider-card ${selectedProvider?.name === p.name ? "selected" : ""}`}
                  onClick={() => setSelectedProvider(p)}
                >
                  <div className="provider-info">
                    <img src={p.image} alt={p.name} className="provider-avatar" />
                    <div>
                      <strong>{p.name}</strong>
                      <p>{p.specialty} • {p.hospital}</p>
                      <span>⭐ {p.rating} ({p.reviews} reviews)</span>
                    </div>
                  </div>
                  <button className="select-btn">
                    {selectedProvider?.name === p.name ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="next-btn" onClick={() => setStep(2)} disabled={!selectedProvider}>
                Continue →
              </button>
            </div>
          </>
        )}

        {/* === Step 2: Select Records === */}
        {step === 2 && (
          <>
            <div className="selected-provider">
              <img src={selectedProvider?.image} alt={selectedProvider?.name} className="provider-avatar-large" />
              <div>
                <h4>{selectedProvider?.name}</h4>
                <p>{selectedProvider?.specialty} • {selectedProvider?.hospital}</p>
              </div>
              <button className="change-btn" onClick={() => setStep(1)}>Change</button>
            </div>

            <div className="recommmend-heading">
              <h4>Choose what to share</h4>
              <p>Select which records {selectedProvider?.name} can access</p>
            </div>

            <div className="recommend-box">
              <p>💡 Based on {selectedProvider?.specialty}, we recommend sharing:</p>
              <div className="recommend-list">
                <button>Blood Test Results</button>
                <button>ECG Report</button>
              </div>
            </div>

            <h4>Select Records to Share</h4>
            <div className="share-records-grid">
              {records.map((r) => (
                <div
                  key={r.id}
                  className={`share-record-card ${selectedRecords.includes(r.id) ? "checked" : ""}`}
                  onClick={() => toggleRecord(r.id)}
                >
                  <img src={r.image} alt={r.title} className="record-thumbnail" />
                  <div>
                    <h5>{r.title}</h5>
                    <p>{r.date} • {r.size}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
              <button
                className="next-btn"
                onClick={() => setStep(3)}
                disabled={selectedRecords.length === 0}
              >
                Continue with {selectedRecords.length} record(s) →
              </button>
            </div>
          </>
        )}

        {/* === Step 3: Configure Access Duration === */}
        {step === 3 && (
          <div className="access-duration">
            <h3>Access Duration</h3>
            <p>Select how long the provider can access your medical records.</p>

            <div className="duration-options">
              {["24h", "7d", "30d", "90d", "custom"].map((option) => (
                <button
                  key={option}
                  className={`duration-btn ${duration === option ? "selected" : ""}`}
                  onClick={() => setDuration(option)}
                >
                  {option === "custom"
                    ? "Custom Date"
                    : option === "24h"
                    ? "24 hours"
                    : option === "7d"
                    ? "7 days"
                    : option === "30d"
                    ? "30 days"
                    : "90 days"}
                </button>
              ))}
            </div>

            {duration === "custom" && (
              <div className="expiry-input">
                <p>Pick expiry date and time:</p>
                <DatePicker
                  selected={customDate}
                  onChange={(date) => setCustomDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={new Date()}
                  placeholderText="Select date and time"
                  className="datepicker-input"
                />
                {customDate && (
                  <p className="expiry-preview">
                    Expires on: {customDate.toLocaleString()}
                  </p>
                )}
              </div>
            )}

            <div className="modal-footer">
              <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
              <button
                className="next-btn"
                onClick={() => setStep(4)}
                disabled={!duration || (duration === "custom" && !customDate)}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* === Step 4: Review and Confirm === */}
        {step === 4 && (
        <div className="review-confirm">
            <h3>Review and Confirm</h3>
            <p className="review-subtext">
            Please review the access details before granting.
            </p>

            <div className="review-summary">
            <div className="review-row">
                <div className="review-label">Doctor</div>
                <div className="review-content">
                <div className="doctor-info">
                    <img src={selectedProvider?.image} alt="" className="review-avatar" />
                    <div>
                    <strong>{selectedProvider?.name}</strong>
                    <p>
                        {selectedProvider?.specialty} • {selectedProvider?.hospital}
                    </p>
                    </div>
                </div>
                </div>
                <button className="edit-link" onClick={() => setStep(1)}>Edit</button>
            </div>

            {/* Records */}
            <div className="review-row">
                <div className="review-label">Records</div>
                <div className="review-content">
                <span>
                    {selectedRecords.length} file{selectedRecords.length !== 1 ? "s" : ""}
                </span>
                <button className="view-link" onClick={() => setShowRecords(true)}>
                    View list
                </button>
                </div>
                <button className="edit-link" onClick={() => setStep(2)}>Edit</button>
            </div>

            {/* Duration */}
            <div className="review-row">
                <div className="review-label">Access duration</div>
                <div className="review-content">
                <span>{formatDuration()}</span>
                </div>
                <button className="edit-link" onClick={() => setStep(3)}>Edit</button>
            </div>

            {/* Expires */}
            <div className="review-row">
                <div className="review-label">Expires on</div>
                <div className="review-content">
                <span>
                    {duration === "custom" && customDate
                    ? customDate.toLocaleString()
                    : new Date(
                        Date.now() +
                            (duration === "24h"
                            ? 86400000
                            : duration === "7d"
                            ? 604800000
                            : duration === "30d"
                            ? 2592000000
                            : 7776000000)
                        ).toLocaleString()}
                </span>
                </div>
                <button className="edit-link" onClick={() => setStep(3)}>Edit</button>
            </div>

            {/* Permissions */}
            <div className="review-row">
                <div className="review-label">Permissions</div>
                <div className="review-content">
                <span>View only</span>
                <button className="view-link" onClick={() => alert("View-only access grants read privileges only.")}>
                    Details
                </button>
                </div>
                <button className="edit-link">Edit</button>
            </div>

            {/* Notifications */}
            <div className="review-row">
                <div className="review-label">Notifications</div>
                <div className="review-content">
                <span>Email and in-app</span>
                <button className="view-link" onClick={() => alert("Doctor and you will be notified by email and in-app alerts.")}>
                    Details
                </button>
                </div>
                <button className="edit-link">Edit</button>
            </div>

            {/* Reason for Sharing */}
            <div className="review-row">
                <div className="review-label">Reason for sharing</div>
                <div className="review-content">
                {reason ? (
                    <span>{reason}</span>
                ) : (
                    <span className="muted">Not specified</span>
                )}
                </div>
                {editingReason ? (
                <div className="reason-input-container">
                    <input
                    type="text"
                    placeholder="Enter reason..."
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    className="reason-input"
                    />
                    <button
                    className="save-link"
                    onClick={() => {
                        setReason(reasonInput);
                        setEditingReason(false);
                    }}
                    >
                    Save
                    </button>
                </div>
                ) : (
                <button className="add-link" onClick={() => setEditingReason(true)}>
                    {reason ? "Edit" : "Add"}
                </button>
                )}
            </div>
            </div>

            <div className="modal-footer">
            <button className="back-btn" onClick={() => setStep(3)}>← Back</button>
            <button className="next-btn" onClick={() => setStep(5)}>Grant Access →</button>
            </div>

            {/* === Records Modal === */}
            {showRecords && (
            <div className="overlay records-modal">
                <div className="records-content">
                <h4>Selected Records</h4>
                <ul>
                    {records
                    .filter((r) => selectedRecords.includes(r.id))
                    .map((r) => (
                        <li key={r.id}>
                        <img src={r.image} alt={r.title} className="record-icon" />
                        <span>{r.title}</span>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setShowRecords(false)} className="close-list">
                    Close
                </button>
                </div>
            </div>
            )}
        </div>
        )}


        {/* === Step 5: Success Confirmation === */}
        {step === 5 && (
          <div className="success-container">
            <div className="success-icon"><img src={SuccessICon} /></div>
            <h2>Access Granted Successfully!</h2>
            <p>{selectedProvider?.name} can now access {selectedRecords.length} of your records.</p>

            <div className="success-details">
              <p><strong>Access expires:</strong> {formatDuration()}</p>
              <p><strong>Notifications:</strong> Doctor notified via email</p>
            </div>

            <div className="success-email">
              <p>Confirmation email sent to your registered address.</p>
              <span>Sent to <strong>you@example.com</strong></span>
            </div>

            <button className="next-btn" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareAccessModal;

