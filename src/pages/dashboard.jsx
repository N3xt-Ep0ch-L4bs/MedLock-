import React, { useState } from "react";
import Logo from "../assets/logo.png"
import RecordIcon from "../assets/stat-icon1.png";
import PrecriptionIcon from "../assets/stat-icon2.png";
import DoctorIcon from "../assets/stat-icon3.png";
import ActivityIcon from "../assets/stat-icon4.png";
import ResultIcon from "../assets/record-icon1.png";
import XrayIcon from "../assets/record-icon2.png";
import LisinoprilIcon from "../assets/record-icon3.png";
import LipidIcon from "../assets/record-icon4.png";
import ECGIcon from "../assets/record-icon5.png";
import UrinalysisIcon from "../assets/record-icon6.png";
import AishaDp from "../assets/kile-dp.png";
import JamesDp from "../assets/lin-dp.png";
import KileDp from "../assets/aisha-dp.png";
import GrantAccess from "../components/access"
import {
  BadgeQuestionMark,
  Bell,
  Calendar,
  CloudUpload,
  File,
  Settings,
  Lock,
  Search,
  LogOut,
  Copy,
  Plus,
  ShieldCheck,
  User,
  FileText,
  ClipboardCheck,
  Activity,
  Heart,
  Eye,
  UserLock,
  UserX,
  Pill,
} from "lucide-react";
import "./dashboard.css";

function UploadRecordModal({ isOpen, onClose }) {
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

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [isShareModalOpen, setShareModalOpen] = useState(false);


  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <a className="sidebar-link active">
            <ShieldCheck size={18} /> Dashboard
          </a>
          <a className="sidebar-link">
            <FileText size={18} /> My Records
          </a>
          <a className="sidebar-link">
            <ClipboardCheck size={18} /> Prescriptions
          </a>
          <a className="sidebar-link">
            <User size={18} /> Shared Access
          </a>
          <a className="sidebar-link">
            <Activity size={18} /> Activity Log
          </a>
          <a className="sidebar-link">
            <Settings size={18} /> Settings
          </a>
          <a className="sidebar-link">
            <BadgeQuestionMark size={18} /> Help
          </a>
        </nav>
        <a className="logout-link">
          <LogOut size={18} /> Sign Out
        </a>
      </aside>
      <div>
        <header className="topbar">
          <div className="sidebar-header">
            <img src={Logo} alt="MedLock Logo" className="sidebar-logo" />
            <h1 className="sidebar-title">MedLock</h1>
          </div>
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search your record, prescriptions…"
            />
          </div>
          <div className="topbar-right">
            <Bell size={20} className="icon" />
            <Settings size={20} className="icon" />
            <div className="profile">EO</div>
          </div>
        </header>

        <div className="main-area">
          <main className="main-content">
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
                <a href="#" className="view-all">View All 12 Records →</a>
            </div>
          <div className="records-section">
            <div className="records-grid">
                <div className="record-card">
                  <img src={ResultIcon} />
                <h4 className="record-title">Blood Test Results</h4>
                <p className="record-meta"><Calendar size={14} /> Oct 23, 2024 • <File size={13} /> 4 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Shared with 2 doctors</span>
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span><Lock size={13} /> Private</span>
                    <span>⋯</span>
                </div>
                </div>

                <div className="record-card">
                  <img src={XrayIcon} />
                <h4 className="record-title">Chest X-Ray</h4>
                <p className="record-meta"><Calendar size={14} /> Oct 15, 2024 • <File size={13} /> 7 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span><Lock size={13} /> Private</span>
                    <span>⋯</span>
                </div>
                </div>

                <div className="record-card">
                  <img src={LisinoprilIcon} />
                <h4 className="record-title">Prescription - Lisinopril</h4>
                <p className="record-meta"><Calendar size={14} /> Oct 10, 2024 • <File size={13} /> 3.4 KB</p>
                <div className="record-tags">
                    <span className="record-tag">Shared with 1 pharmacy</span>
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span><Lock size={13} /> Private</span>
                    <span>⋯</span>
                </div>
                </div>
                <div className="record-card">
                  <img src={LipidIcon} />
                <h4 className="record-title">Lipid Panel</h4>
                <p className="record-meta"><Calendar size={14} /> Sep 22, 2024 •<File size={13} />4 MB</p>
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
                <p className="record-meta"><Calendar size={14} /> Sep 10, 2024 •<File size={13} /> 2 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span><Lock size={13} /> Private</span>
                    <span>⋯</span>
                </div>
                </div>
                <div className="record-card">
                  <img src={UrinalysisIcon} />
                <h4 className="record-title">Urinalysis</h4>
                <p className="record-meta"><Calendar size={14} /> Sep 10, 2024 • <File size={13} /> 2 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span><Lock size={13} /> Private</span>
                    <span>⋯</span>
                </div>
                </div>
                    </div>
                    </div>
                </div>
                </main> <section className="prescriptions-section">
          <div className="section-header">
            <h3>Active Prescriptions</h3>
            <a href="#" className="view-all">View All Prescriptions →</a>
          </div>

          <div className="prescription-card">
            <div className="prescription-info">
              <div className="doc">
                <img src={KileDp} alt="Dr. Aisha" className="doctor-avatar" />
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
                <img src={JamesDp} alt="Dr. James" className="doctor-avatar" />
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
                <img src={AishaDp} alt="Dr. Aisha" className="doctor-avatar" />
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
                <img src={AishaDp} alt="Dr. Aisha" className="doctor-avatar" />
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
                <button className="view-btn">View What’s Shared</button>
                <button className="revoke-btn">Revoke</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-info">
                <img src={JamesDp} alt="Dr. James" className="doctor-avatar" />
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
                <button className="view-btn">View What’s Shared</button>
                <button className="revoke-btn">Revoke</button>
              </div>
            </div>
          </div>

          <button className="grant-btn" onClick={() => setShareModalOpen(true)}>
            + Grant New Access
          </button>

        </section>
        <section className="recent-activity">
          <div className="recent-heading">
          <h3>Recent Activity</h3>
          <a href="#" className="view-all">View All Activity →</a>
          </div>
          <div className="activity-timeline">
        <div className="activity-item">
          <div className="activity-icon upload"><CloudUpload size={15} /></div>
          <div className="activity-content">
            <p>You uploaded <strong>Blood Test Results</strong></p>
            <span className="activity-time">2 hours ago</span>
            <div className="activity-hash">0x8f4a...ed2 <Copy size={11} /></div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon share"><UserLock size={15} /></div>
          <div className="activity-content">
            <p>You shared <strong>MRI Scan</strong> with <strong>Dr. James Lin</strong></p>
            <span className="activity-time">Yesterday at 3:45 PM</span>
            <div className="activity-hash">0x7c2b...fa41 <Copy size={11} /></div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon access"><Eye size={15} /></div>
          <div className="activity-content">
            <p><strong>Dr. Aisha Mahmoud</strong> accessed your <strong>Chest X-Ray</strong></p>
            <span className="activity-time">Yesterday at 10:30 AM</span>
            <div className="activity-hash">0x9e5c...a7b3 <Copy size={11} /></div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon rx"><Pill size={15} /></div>
          <div className="activity-content">
            <p><strong>Dr. Aisha Mahmoud</strong> prescribed <strong>Lisinopril 10mg</strong></p>
            <span className="activity-time">2 days ago</span>
            <div className="activity-hash">0x3df1...c8e5 <Copy size={11} /></div>
          </div>
        </div>

        <div className="activity-item">
          <div className="activity-icon revoke"><UserX size={15} /></div>
          <div className="activity-content">
            <p>You revoked access for <strong>Dr. Sarah Chen</strong></p>
            <span className="activity-time">3 days ago</span>
            <div className="activity-hash">0x6b8d...f2c9 <Copy size={11} /></div>
          </div>
        </div>
      </div>
        </section>
        <UploadRecordModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
          <GrantAccess
            isOpen={isShareModalOpen}
            onClose={() => setShareModalOpen(false)}
          />

      </div>
    </div>
    </div>
  );
};

export default Dashboard;
