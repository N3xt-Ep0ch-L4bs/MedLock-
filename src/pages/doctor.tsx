import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Pill, Settings, Users, Grid2x2, ArrowLeft } from "lucide-react";
import "./doctor.css";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  initials: string;
}

interface Stat {
  img: string;
  label: string;
  value: number;
}

interface Activity {
  img: string;
  text: string;
  time: string;
}

interface Notification {
  icon: string;
  text: string;
  time: string;
}

interface PrescriptionData {
  date: string;
  patient: string;
  medication: string;
  dosage: string;
  status: string;
  dispensed: string;
}

interface Document {
  id: number;
  title: string;
  provider: string;
  date: string;
  size: string;
}

interface Prescription {
  id: number;
  name: string;
  note: string;
  started: string;
  status: string;
}

interface Note {
  id: number;
  date: string;
  text: string;
}

interface Vitals {
  bp: string;
  heartRate: string;
  weight: string;
  height: string;
  bmi: string;
}

interface PatientDetail {
  id: number;
  name: string;
  age: number;
  gender: string;
  initials: string;
  patientId: string;
  allergies: string;
  lastSeen: string;
  documents: Document[];
  prescriptions: Prescription[];
  notes: Note[];
  vitals: Vitals;
  medicalHistory: string[];
}

const DoctorDashboard = () => {
  const patients: Patient[] = [
    { id: 1, name: "Ezekiel Okon", age: 34, gender: "Male", lastVisit: "2 weeks ago", initials: "EO" },
    { id: 2, name: "Sarah Chen", age: 42, gender: "Female", lastVisit: "Today", initials: "SC" },
    { id: 3, name: "Michael Park", age: 29, gender: "Male", lastVisit: "Yesterday", initials: "MP" },
  ];

  const stats: Stat[] = [
    { img: "src/assets/stat-header1.png", label: "Active Patients", value: 28 },
    { img: "src/assets/stat-icon2 (1).png", label: "Prescriptions (This Week)", value: 15 },
    { img: "src/assets/stat-header3.png", label: "Pending Access Requests", value: 5 },
  ];

  const activities: Activity[] = [
    { img: "src/assets/record-icon3.png", text: "You prescribed Lisinopril 10mg to Sarah Chen", time: "1 hour ago" },
    { img: "src/assets/activity-icon2.png", text: "Access granted by John Doe", time: "3 hours ago" },
    { img: "src/assets/record-icon4.png", text: "You viewed lab results for Michael Park", time: "Yesterday, 4:32 PM" },
    { img: "src/assets/stat-icon2 (1).png", text: "You prescribed Metformin 500mg to Ezekiel Okon", time: "2 days ago" },
  ];

  const notifications: Notification[] = [
    { icon: "🔓", text: "Lisa Johnson granted you access to medical records", time: "15 minutes ago" },
    { icon: "💊", text: "Prescription for Sarah Chen dispensed by CityMed Pharmacy", time: "1 hour ago" },
    { icon: "⚙️", text: "System maintenance scheduled for tonight at 11 PM", time: "3 hours ago" },
    { icon: "🧾", text: "New lab results uploaded for Michael Park", time: "Yesterday" },
  ];

  const prescriptionData: PrescriptionData[] = [
    { date: "Nov 1, 2024 10:30 AM", patient: "Ezekiel Okon", medication: "Lisinopril 10mg", dosage: "Once daily", status: "Active", dispensed: "Not yet" },
    { date: "Oct 30, 2024 2:15 PM", patient: "Sarah Chen", medication: "Atorvastatin 20mg", dosage: "Once daily", status: "Dispensed", dispensed: "Oct 31, 2024" },
  ];

  const samplePatientDetail: PatientDetail = {
    id: 1,
    name: "Ezekiel Okon",
    age: 34,
    gender: "Male",
    initials: "EO",
    patientId: "MLK-2547",
    allergies: "Penicillin, Peanuts",
    lastSeen: "6 days ago",
    documents: [
      { id: 1, title: "Blood Test Results", provider: "City Medical Center", date: "Oct 28, 2024", size: "2.4 MB" },
      { id: 2, title: "ECG Report", provider: "CardioCenter Clinic", date: "Sep 10, 2024", size: "3.2 MB" },
      { id: 3, title: "Lipid Panel", provider: "Quest Diagnostics", date: "Sep 22, 2024", size: "1.6 MB" },
      { id: 4, title: "Chest X-Ray", provider: "City Medical Center - Radiology", date: "Oct 15, 2024", size: "8.7 MB" },
    ],
    prescriptions: [
      { id: 1, name: "Lisinopril 10mg", note: "Once daily", started: "Oct 1, 2024", status: "Active" },
      { id: 2, name: "Metformin 500mg", note: "Twice daily", started: "Sep 15, 2024", status: "Active" },
    ],
    notes: [
      { id: 1, date: "Oct 28, 2024", text: "Patient reports improved symptoms since starting Lisinopril. Blood pressure readings have stabilized." },
      { id: 2, date: "Sep 10, 2024", text: "Initial consultation for hypertension management. Patient has family history of cardiovascular disease." },
    ],
    vitals: { bp: "120/80 mmHg", heartRate: "72 bpm", weight: "165 lbs", height: "5'10\"", bmi: "23.7" },
    medicalHistory: ["Hypertension", "Appendectomy (2015)", "Family history: Father - CAD, Mother - Type 2 Diabetes"],
  };

  const [activePage, setActivePage] = useState<string>("dashboard");
  const [selectedPatient, setSelectedPatient] = useState<PatientDetail | null>(null);
  const [newNote, setNewNote] = useState<string>("");
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  const [searchPatient, setSearchPatient] = useState<string>("");
  const [searchMedication, setSearchMedication] = useState<string>("");

  const handleOpenPatient = (p: Patient) => {
    if (p.name === "Ezekiel Okon") setSelectedPatient(structuredClone(samplePatientDetail));
    else setSelectedPatient({
      id: p.id,
      name: p.name,
      age: p.age,
      gender: p.gender,
      initials: p.initials,
      patientId: `MLK-10${p.id}`,
      allergies: "None",
      lastSeen: p.lastVisit,
      documents: [],
      prescriptions: [],
      notes: [],
      vitals: { bp: "—", heartRate: "—", weight: "—", height: "—", bmi: "—" },
      medicalHistory: [],
    });
    window.scrollTo(0, 0);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const newNoteObj: Note = { id: Date.now(), date: new Date().toLocaleDateString(), text: newNote.trim() };
    setSelectedPatient(prev => prev ? ({ ...prev, notes: [...prev.notes, newNoteObj] }) : null);
    setNewNote("");
  };

  const toggleExpanded = (id: number) => setExpandedNoteId(expandedNoteId === id ? null : id);
  const handleBack = () => setSelectedPatient(null);

  const filteredData = prescriptionData.filter(
    item => item.patient.toLowerCase().includes(searchPatient.toLowerCase()) &&
            item.medication.toLowerCase().includes(searchMedication.toLowerCase())
  );

  // ---------------- Page content ----------------
  let mainContent: React.ReactNode;
  if (selectedPatient) {
    mainContent = (
      <div className="patient-page">
        <button className="back-btn" onClick={handleBack}><ArrowLeft size={16} /> Back to Dashboard</button>
        <div className="patient-details">
          <div className="patient-main">
            {/* Patient Top */}
            <div className="patient-top card">
              <div className="avatar-large">{selectedPatient.initials}</div>
              <div>
                <h2>{selectedPatient.name} <small>• {selectedPatient.patientId}</small></h2>
                <p className="patient-meta-row">{selectedPatient.age} • {selectedPatient.gender} • Last seen: {selectedPatient.lastSeen}</p>
                <span className="allergy">⚠️ Allergies: {selectedPatient.allergies}</span>
              </div>
            </div>

            {/* Documents */}
            <div className="card">
              <h3>Documents</h3>
              {selectedPatient.documents.length ? selectedPatient.documents.map((d) => (
                <div className="doc-item" key={d.id}>
                  <div className="doc-left">
                    <div className="doc-icon">PDF</div>
                    <div className="doc-meta">
                      <h4>{d.title}</h4>
                      <p>{d.provider} • {d.date} • {d.size}</p>
                    </div>
                  </div>
                  <div className="btn-row">
                    <button className="btn">View</button>
                    <button className="btn">Download</button>
                  </div>
                </div>
              )) : <p className="small-muted">No documents yet.</p>}
            </div>

            <div className="notes-card card">
              <h3>My Notes for This Patient</h3>
              <div className="add-note">
                <textarea placeholder="Write a new note about this patient..." value={newNote} onChange={e => setNewNote(e.target.value)}></textarea>
                <button className="btn" onClick={handleAddNote}>Add Note</button>
              </div>
              <div className="notes-list">
                {selectedPatient.notes.length ? selectedPatient.notes.map(n => (
                  <div key={n.id} className="note-item">
                    <div className="note-header">
                      <strong>{n.date}</strong>
                      <button className="read-more" onClick={() => toggleExpanded(n.id)}>
                        {expandedNoteId === n.id ? "Show less" : "Read more"}
                      </button>
                    </div>
                    <p>{expandedNoteId === n.id ? n.text : n.text.length > 120 ? `${n.text.slice(0,120)}...` : n.text}</p>
                  </div>
                )) : <p className="small-muted">No notes yet.</p>}
              </div>
            </div>
          </div>

          <aside className="patient-right">
            <div className="vitals-card">
              <h3>Active Prescriptions</h3>
              {selectedPatient.prescriptions.length ? selectedPatient.prescriptions.map(rx => (
                <div className="prescription-item" key={rx.id}>
                  <div>
                    <strong>{rx.name}</strong>
                    <p className="small-muted">{rx.note} • Started: {rx.started}</p>
                  </div>
                  <div className="rx-right">
                    <span className="rx-status">{rx.status}</span>
                    <button className="btn">Refill</button>
                  </div>
                </div>
              )) : <p className="small-muted">No active prescriptions.</p>}
            </div>

            <div className="vitals-card">
              <h3>Latest Vitals</h3>
              <div className="vitals-grid">
                <div className="vital"><strong>BP</strong><p>{selectedPatient.vitals.bp}</p></div>
                <div className="vital"><strong>Heart Rate</strong><p>{selectedPatient.vitals.heartRate}</p></div>
                <div className="vital"><strong>Weight</strong><p>{selectedPatient.vitals.weight}</p></div>
                <div className="vital"><strong>Height</strong><p>{selectedPatient.vitals.height}</p></div>
                <div className="vital"><strong>BMI</strong><p>{selectedPatient.vitals.bmi}</p></div>
              </div>
            </div>

            <div className="history-card card">
              <div className="history-header">
                <h3>Medical History</h3>
                <p className="small-muted">Past conditions, surgeries & family background</p>
              </div>
              {selectedPatient.medicalHistory.length ? (
                <ul className="history-list">
                  {selectedPatient.medicalHistory.map((item,i) => (
                    <li key={i} className="history-item"><span className="history-icon">🩺</span> <span className="history-text">{item}</span></li>
                  ))}
                </ul>
              ) : <p className="small-muted">No medical history recorded.</p>}
            </div>

            <div className="action-container">
              <div className="main-card">
                <h2 className="main-card-title">Patient Actions</h2>
                <div className="nested-cards">
                  <div className="nested-card request-records"><h3>Request Records</h3></div>
                  <div className="nested-card send-message"><h3>Send Message</h3></div>
                  <div className="nested-card schedule"><h3>Schedule</h3></div>
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>
    );
  } else if (activePage === "prescriptions") {
    mainContent = (
      <div className="prescriptions-container">
        <h2>Prescriptions</h2>
        <p>Manage all prescriptions you've created</p>

        <div className="prescriptions-summary">
          <div className="summary-card total"><h3>47</h3><p>Total Prescriptions This Month</p></div>
          <div className="summary-card active"><h3>15</h3><p>Active Prescriptions</p></div>
          <div className="summary-card dispensed"><h3>32</h3><p>Dispensed This Month</p></div>
        </div>

        <div className="filters">
          <input type="text" placeholder="Search patients by name..." value={searchPatient} onChange={e=>setSearchPatient(e.target.value)} />
          <input type="text" placeholder="Search medication..." value={searchMedication} onChange={e=>setSearchMedication(e.target.value)} />
        </div>

        <table className="prescriptions-table">
          <thead>
            <tr>
              <th>Date</th><th>Patient Name</th><th>Medication</th><th>Dosage</th><th>Status</th><th>Dispensed</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? filteredData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>{item.patient}</td>
                <td>{item.medication}</td>
                <td>{item.dosage}</td>
                <td className={item.status.toLowerCase()}>{item.status}</td>
                <td>{item.dispensed}</td>
                <td><button className="view-btn">View</button></td>
              </tr>
            )) : (
              <tr><td colSpan={7} style={{textAlign:"center"}}>No prescriptions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    mainContent = (
      <>
        <div className="stats-container">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-header">
                <img src={stat.img} alt={stat.label} className="stat-icon" />
                <h3 className="stat-title">{stat.label}</h3>
              </div>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        <section className="patients-section">
          <h3>Today's Patients</h3>
          <div className="records-grid">
            {patients.map(p => (
              <div className="patient-card" key={p.id} onClick={() => handleOpenPatient(p)}>
                <div className="patient-info">
                  <div className="avatar">{p.initials}</div>
                  <div>
                    <h4>{p.name}</h4>
                    <p className="patient-meta">{p.age} • {p.gender} • Last visit: {p.lastVisit}</p>
                    <span className="status active">🟢 Active Access</span>
                  </div>
                </div>
                <span className="chevron">›</span>
              </div>
            ))}
          </div>
        </section>

        <section className="activity-notifications">
          <div className="activity" style={{ flex: 2 }}>
            <h3>Recent Activity</h3>
            {activities.map((a,i) => (
              <div className="activity-content" key={i}>
                <img src={a.img} alt="activity" className="activity-img" />
                <div className="activity-details">
                  <p>{a.text}</p>
                  <span className="small-muted">{a.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="notifications">
            <h3>Notifications</h3>
            {notifications.map((n,i) => (
              <div className="notification-item" key={i}>
                <p>{n.icon} {n.text}</p>
                <span className="notification-time small-muted">{n.time}</span>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="MedLock Logo" style={{ width: "26px", height: "26px" }} />
          <h1>MedLock</h1>
        </div>
        <nav className="sidebar-nav">
          <div className={`sidebar-link ${activePage==="dashboard"?"active":""}`} onClick={()=>setActivePage("dashboard")}><Grid2x2 width={16}/> Dashboard</div>
          <div className={`sidebar-link ${activePage==="patients"?"active":""}`} onClick={()=>setActivePage("patients")}><Users width={16}/> Patients</div>
          <div className={`sidebar-link ${activePage==="prescriptions"?"active":""}`} onClick={()=>setActivePage("prescriptions")}><Pill width={16}/> Prescriptions</div>
          <div className={`sidebar-link ${activePage==="settings"?"active":""}`} onClick={()=>setActivePage("settings")}><Settings width={16}/> Settings</div>
        </nav>
        <div className="doctor-info" style={{ marginTop: "auto", padding: "1rem", borderTop: "1px solid #e5e7eb" }}>
          <h4>Dr. Aisha Mahmoud</h4>
          <p>Cardiologist</p>
          <small className="small-muted">ID: DOC-1647</small>
        </div>
      </aside>

      <main className="main-area">
        <header className="doctor-topbar">
          <h2 style={{ 
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#111827",
            fontFamily: '"Figtree", sans-serif',
            margin: 0,
          }}>
            {activePage === "dashboard" ? "Dashboard" : activePage === "prescriptions" ? "Prescriptions" : activePage === "patients" ? "Patients" : "Settings"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="text" placeholder="Search patients by name or ID" style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontSize: "14px" }}/>
            </div>
            <button className="filter-btn">Filter</button>
          </div>
        </header>

        <div style={{ padding: "2rem 2.5rem", width: "100%", boxSizing: "border-box" }}>
          {mainContent}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;

