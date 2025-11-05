import React from "react";
import {
  Bell,
  Settings,
  Search,
  LogOut,
  Plus,
  ShieldCheck,
  User,
  FileText,
  ClipboardCheck,
  Activity,
  Heart,
} from "lucide-react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="MedLock Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">MedLock</h1>
        </div>
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
            <LogOut size={18} /> Logout
          </a>
        </nav>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="main-area">
        {/* ===== TOP NAVBAR ===== */}
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search your record, prescriptions…" />
          </div>
          <div className="topbar-right">
            <Bell size={20} className="icon" />
            <Settings size={20} className="icon" />
            <div className="profile">EO</div>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="main-content">
          {/* WELCOME SECTION */}
          <div className="welcome-card">
            <div className="welcome-text">
              <h2>Good afternoon, Ezekiel 👋</h2>
              <p>Your health data is secure and encrypted</p>
            </div>
            <button className="upload-btn">
              <Plus size={16} /> Upload New Record
            </button>
          </div>

          {/* STATS CARDS */}
          <div className="stats-container">
            <div className="stat-card">
                <h4 className="stat-title">Records</h4>
                <p className="stat-value">12</p>
                <p className="stat-note">↑ 2 this month</p>
            </div>

            <div className="stat-card">
                <h4 className="stat-title">Active Prescriptions</h4>
                <p className="stat-value">3</p>
                <p className="stat-note">No change</p>
            </div>

            <div className="stat-card">
                <h4 className="stat-title">Doctors</h4>
                <p className="stat-value">2</p>
                <p className="stat-note">Current access</p>
            </div>

            <div className="stat-card">
                <h4 className="stat-title">Activity Events</h4>
                <p className="stat-value">24</p>
                <p className="stat-note">Last 7 days</p>
            </div>
         </div>

            <div className="records-header">
                <h3>My Health Records</h3>
                <a href="#" className="view-all">View All 12 Records →</a>
            </div>
          {/* MY HEALTH RECORDS */}
          <div className="records-section">
            <div className="records-grid">
                <div className="record-card">
                <h4 className="record-title">Blood Test Results</h4>
                <p className="record-meta">Oct 23, 2024 • 4 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Shared with 2 doctors</span>
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span>🔒 Private</span>
                    <span>⋯</span>
                </div>
                </div>

                <div className="record-card">
                <h4 className="record-title">Chest X-Ray</h4>
                <p className="record-meta">Oct 15, 2024 • 7 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span>🔒 Private</span>
                    <span>⋯</span>
                </div>
                </div>

                <div className="record-card">
                <h4 className="record-title">Prescription - Lisinopril</h4>
                <p className="record-meta">Oct 10, 2024 • 3.4 KB</p>
                <div className="record-tags">
                    <span className="record-tag">Shared with 1 pharmacy</span>
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span>🔒 Private</span>
                    <span>⋯</span>
                </div>
                </div>

                <div className="record-card">
                <h4 className="record-title">ECG Report</h4>
                <p className="record-meta">Sep 10, 2024 • 2 MB</p>
                <div className="record-tags">
                    <span className="record-tag">Encrypted</span>
                </div>
                <div className="record-footer">
                    <span>🔒 Private</span>
                    <span>⋯</span>
                </div>
                </div>
            </div>
            </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
