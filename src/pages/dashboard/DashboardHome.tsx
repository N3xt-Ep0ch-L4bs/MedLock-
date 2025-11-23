import { useState } from "react";
import {
  Calendar,
  CloudUpload,
  Copy,
  Eye,
  File,
  Lock,
  Pill,
  Plus,
  UserLock,
  UserX,
  XCircle,
  Check,
} from "lucide-react";
import GrantAccess from "../../components/access";
import RecordIcon from "../../assets/stat-icon1.png";
import PrecriptionIcon from "../../assets/stat-icon2.png";
import DoctorIcon from "../../assets/stat-icon3.png";
import ActivityIcon from "../../assets/stat-icon4.png";
import ResultIcon from "../../assets/record-icon1.png";
import XrayIcon from "../../assets/record-icon2.png";
import LisinoprilIcon from "../../assets/record-icon3.png";
import LipidIcon from "../../assets/record-icon4.png";
import ECGIcon from "../../assets/record-icon5.png";
import UrinalysisIcon from "../../assets/record-icon6.png";
import AishaDp from "../../assets/kile-dp.png";
import JamesDp from "../../assets/lin-dp.png";
import KileDp from "../../assets/aisha-dp.png";
import "../dashboard.css";

interface UploadRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function UploadRecordModal({ isOpen, onClose }: UploadRecordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Upload Health Record</h2>
        <p className="subtitle">Your file will be encrypted before upload</p>

        <div className="upload-box">
          <div className="upload-icon">
            <CloudUpload size={40} color="#3b82f6" />
          </div>
          <p className="upload-text">
            <strong>Drag and drop your file here</strong>
            <br />
            <span>or click to browse</span>
          </p>
          <p className="upload-info">PDF, JPG, PNG — Max 50MB</p>
        </div>
      </div>
    </div>
  );
}

interface TransactionData {
  recipient: string;
  amount: number;
  networkFee: number;
}

interface TransactionApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionData | null;
}

const TransactionApprovalModal = ({
  isOpen,
  onClose,
  transaction,
}: TransactionApprovalModalProps) => {
  if (!isOpen || !transaction) return null;

  const { recipient, amount, networkFee } = transaction;
  const total = ((Number(amount) || 0) + (Number(networkFee) || 0)).toFixed(3);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Please approve the transaction</h2>
        <div className="transaction-details">
          <p>
            <strong>Recipient:</strong> {recipient}
          </p>
          <p>
            <strong>Amount:</strong> {amount} SUI
          </p>
          <p>
            <strong>Estimated Network Fee:</strong> {networkFee} SUI
          </p>
          <p>
            <strong>Total to Approve:</strong> {total} SUI
          </p>
        </div>
        <div className="transaction-actions">
          <button
            className="confirm-btn"
            onClick={() => {
              console.log("Transaction confirmed!");
              onClose();
            }}
          >
            <Check size={16} /> Confirm Transaction
          </button>
          <button className="cancel-btn" onClick={onClose}>
            <XCircle size={16} /> Cancel Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardHome() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState<boolean>(false);
  const [pendingTransaction, setPendingTransaction] = useState<TransactionData | null>(null);

  const handlePharmacyRequest = () => {
    setPendingTransaction({
      recipient: "CVS Pharmacy - Downtown",
      amount: 24.5,
      networkFee: 0.001,
    });
    setTransactionModalOpen(true);
  };

  return (
    <>
      <div className="welcome-card">
        <div className="welcome-text">
          <h2>Good afternoon, Ezekiel 👋</h2>
          <p>Your health data is secure and encrypted</p>
        </div>
        <button
          className="upload-btn"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={16} /> Upload New Record
        </button>
      </div>

      <div className="caads">
        <div className="stats-container">
          <div className="stat-card">
            <img src={RecordIcon} />
            <h4 className="stat-title">Records</h4>
            <p className="stat-value">12</p>
            <p className="stat-note">↑ 2 this month</p>
          </div>

          <div className="stat-card">
            <img src={PrecriptionIcon} />
            <h4 className="stat-title">Active Prescriptions</h4>
            <p className="stat-value">3</p>
            <p className="stat-note">No change</p>
          </div>

          <div className="stat-card">
            <img src={DoctorIcon} />
            <h4 className="stat-title">Doctors</h4>
            <p className="stat-value">2</p>
            <p className="stat-note">Current access</p>
          </div>

          <div className="stat-card">
            <img src={ActivityIcon} />
            <h4 className="stat-title">Activity Events</h4>
            <p className="stat-value">24</p>
            <p className="stat-note">Last 7 days</p>
          </div>
        </div>

        <div className="records-header">
          <h3>My Health Records</h3>
          <a href="#" className="view-all">
            View All 12 Records →
          </a>
        </div>

        <div className="records-section">
          <div className="records-grid">
            <div className="record-card">
              <img src={ResultIcon} />
              <h4 className="record-title">Blood Test Results</h4>
              <p className="record-meta">
                <Calendar size={14} /> Oct 23, 2024 •{" "}
                <File size={13} /> 4 MB
              </p>
              <div className="record-tags">
                <span className="record-tag">
                  Shared with 2 doctors
                </span>
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span>
                  <Lock size={13} /> Private
                </span>
                <span>⋯</span>
              </div>
            </div>

            <div className="record-card">
              <img src={XrayIcon} />
              <h4 className="record-title">Chest X-Ray</h4>
              <p className="record-meta">
                <Calendar size={14} /> Oct 15, 2024 •{" "}
                <File size={13} /> 7 MB
              </p>
              <div className="record-tags">
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span>
                  <Lock size={13} /> Private
                </span>
                <span>⋯</span>
              </div>
            </div>

            <div className="record-card">
              <img src={LisinoprilIcon} />
              <h4 className="record-title">
                Prescription - Lisinopril
              </h4>
              <p className="record-meta">
                <Calendar size={14} /> Oct 10, 2024 •{" "}
                <File size={13} /> 3.4 KB
              </p>
              <div className="record-tags">
                <span className="record-tag">
                  Shared with 1 pharmacy
                </span>
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span>
                  <Lock size={13} /> Private
                </span>
                <span>⋯</span>
              </div>
            </div>

            <div className="record-card">
              <img src={LipidIcon} />
              <h4 className="record-title">Lipid Panel</h4>
              <p className="record-meta">
                <Calendar size={14} /> Sep 22, 2024 •
                <File size={13} />4 MB
              </p>
              <div className="record-tags">
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span> Shared with 1 Doctor</span>
                <span>⋯</span>
              </div>
            </div>

            <div className="record-card">
              <img src={ECGIcon} />
              <h4 className="record-title">ECG Report</h4>
              <p className="record-meta">
                <Calendar size={14} /> Sep 10, 2024 •
                <File size={13} /> 2 MB
              </p>
              <div className="record-tags">
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span>
                  <Lock size={13} /> Private
                </span>
                <span>⋯</span>
              </div>
            </div>

            <div className="record-card">
              <img src={UrinalysisIcon} />
              <h4 className="record-title">Urinalysis</h4>
              <p className="record-meta">
                <Calendar size={14} /> Sep 10, 2024 •{" "}
                <File size={13} /> 2 MB
              </p>
              <div className="record-tags">
                <span className="record-tag">Encrypted</span>
              </div>
              <div className="record-footer">
                <span>
                  <Lock size={13} /> Private
                </span>
                <span>⋯</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="prescriptions-section">
        <div className="section-header">
          <h3>Active Prescriptions</h3>
          <a href="#" className="view-all">
            View All Prescriptions →
          </a>
        </div>

        <div className="prescription-card">
          <div className="prescription-info">
            <div className="doc">
              <img
                src={KileDp}
                alt="Dr. Aisha"
                className="doctor-avatar"
              />
              <div>
                <h4>Dr. Aisha Mahmoud</h4>
                <p>Cardiologist</p>
              </div>
            </div>
            <div className="med-info">
              <h4>Lisinopril 10mg</h4>
              <p>Once daily, take with food</p>
              <small>30 days supply</small>
            </div>
          </div>
          <div className="prescription-meta">
            <span className="status active">● Active</span>
            <p>Oct 28, 2024</p>
            <button>View Details</button>
          </div>
        </div>
        <div className="prescription-card">
          <div className="prescription-info">
            <div className="doc">
              <img
                src={JamesDp}
                alt="Dr. James"
                className="doctor-avatar"
              />
              <div>
                <h4>Dr. James Lin</h4>
                <p>Primary Care</p>
              </div>
            </div>
            <div className="med-info">
              <h4>Metformin 500mg</h4>
              <p>Twice daily with meals</p>
              <small>90 days supply</small>
            </div>
          </div>
          <div className="prescription-meta">
            <span className="status active">● Active</span>
            <p>Oct 15, 2024</p>
            <button>View Details</button>
          </div>
        </div>

        <div className="prescription-card">
          <div className="prescription-info">
            <div className="doc">
              <img
                src={AishaDp}
                alt="Dr. Aisha"
                className="doctor-avatar"
              />
              <div>
                <h4>Dr. Aisha Mahmoud</h4>
                <p>Cardiologist</p>
              </div>
            </div>
            <div className="med-info">
              <h4>Atorvastatin 20mg</h4>
              <p>Once daily at bedtime</p>
              <small>30 days supply</small>
            </div>
          </div>
          <div className="prescription-meta">
            <span className="status dispensed">✔ Dispensed</span>
            <p>Oct 10, 2024</p>
            <button>View Details</button>
          </div>
        </div>
      </section>
      <section className="doctors-access">
        <h3>Doctors with Access</h3>

        <div className="doctor-access-grid">
          <div className="doctor-card">
            <div className="doctor-info">
              <img
                src={AishaDp}
                alt="Dr. Aisha"
                className="doctor-avatar"
              />
              <div>
                <h4>Dr. Aisha Mahmoud</h4>
                <p>Cardiology • City Medical Center</p>
              </div>
            </div>
            <div className="doctor-details">
              <div>
                <p>Access granted</p>
                <strong>Oct 15, 2024</strong>
              </div>
              <div>
                <p>Expires in</p>
                <strong className="expiring">6 days</strong>
              </div>
              <div>
                <p>Records shared</p>
                <strong>8 files</strong>
              </div>
            </div>
            <div className="doctor-actions">
              <button className="view-btn">View What's Shared</button>
              <button className="revoke-btn">Revoke</button>
            </div>
          </div>

          <div className="doctor-card">
            <div className="doctor-info">
              <img
                src={JamesDp}
                alt="Dr. James"
                className="doctor-avatar"
              />
              <div>
                <h4>Dr. James Lin</h4>
                <p>Primary Care • Wellness Clinic</p>
              </div>
            </div>
            <div className="doctor-details">
              <div>
                <p>Access granted</p>
                <strong>Oct 1, 2024</strong>
              </div>
              <div>
                <p>Expires in</p>
                <strong className="expiring">22 days</strong>
              </div>
              <div>
                <p>Records shared</p>
                <strong>5 files</strong>
              </div>
            </div>
            <div className="doctor-actions">
              <button className="view-btn">View What's Shared</button>
              <button className="revoke-btn">Revoke</button>
            </div>
          </div>
        </div>
        <button
          className="grant-btn"
          onClick={() => setShareModalOpen(true)}
        >
          + Grant New Access
        </button>
      </section>

      <section className="recent-activity">
        <div className="recent-heading">
          <h3>Recent Activity</h3>
          <a href="#" className="view-all">
            View All Activity →
          </a>
        </div>

        <div className="activity-timeline">
          <div className="activity-item">
            <div className="activity-icon">
              <CloudUpload size={15} />
            </div>
            <div className="activity-content">
              <p>Uploaded Blood Test Results</p>
              <span className="activity-time">2 hours ago</span>
              <div className="activity-hash">
                0xA2B3C4... <Copy size={11} />
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <UserLock size={15} />
            </div>
            <div className="activity-content">
              <p>Granted Dr. Aisha access to ECG Report</p>
              <span className="activity-time">1 day ago</span>
              <div className="activity-hash">
                0xD4E5F6... <Copy size={11} />
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <Eye size={15} />
            </div>
            <div className="activity-content">
              <p>Dr. James viewed Metformin Prescription</p>
              <span className="activity-time">2 days ago</span>
              <div className="activity-hash">
                0xG7H8I9... <Copy size={11} />
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <Pill size={15} />
            </div>
            <div className="activity-content">
              <p>Dispensed Atorvastatin to Pharmacy</p>
              <span className="activity-time">3 days ago</span>
              <div className="activity-hash">
                0xJ1K2L3... <Copy size={11} />
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <UserX size={15} />
            </div>
            <div className="activity-content">
              <p>Revoked Dr. Aisha access to Urinalysis</p>
              <span className="activity-time">4 days ago</span>
              <div className="activity-hash">
                0xM4N5O6... <Copy size={11} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TransactionApprovalModal
        isOpen={isTransactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        transaction={pendingTransaction}
      />
      <UploadRecordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <GrantAccess
        isOpen={isShareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  );
}

