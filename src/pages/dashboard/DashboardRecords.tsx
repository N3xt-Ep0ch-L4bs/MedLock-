import { useState } from "react";
import {
  Calendar,
  File,
  Lock,
  Search,
  Filter,
  Download,
  Eye,
  Share2,
  Trash2,
  Plus,
  CloudUpload,
  BarChart3,
  FileText,
  Image,
  Pill,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import ResultIcon from "../../assets/record-icon1.png";
import XrayIcon from "../../assets/record-icon2.png";
import LisinoprilIcon from "../../assets/record-icon3.png";
import LipidIcon from "../../assets/record-icon4.png";
import ECGIcon from "../../assets/record-icon5.png";
import UrinalysisIcon from "../../assets/record-icon6.png";
import "../dashboard.css";

interface Record {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  icon: string;
  sharedWith: number;
  encrypted: boolean;
  status: "private" | "shared";
  provider?: string;
  description?: string;
  lastAccessed?: string;
}

const mockRecords: Record[] = [
  {
    id: "1",
    title: "Blood Test Results",
    type: "Lab Results",
    date: "Oct 23, 2024",
    size: "4 MB",
    icon: ResultIcon,
    sharedWith: 2,
    encrypted: true,
    status: "shared",
    provider: "City Medical Lab",
    description: "Complete blood count with differential",
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    title: "Chest X-Ray",
    type: "Imaging",
    date: "Oct 15, 2024",
    size: "7 MB",
    icon: XrayIcon,
    sharedWith: 0,
    encrypted: true,
    status: "private",
    provider: "Radiology Center",
    description: "Frontal and lateral chest X-ray",
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    title: "Prescription - Lisinopril",
    type: "Prescription",
    date: "Oct 10, 2024",
    size: "3.4 KB",
    icon: LisinoprilIcon,
    sharedWith: 1,
    encrypted: true,
    status: "shared",
    provider: "Dr. Aisha Mahmoud",
    description: "10mg once daily for hypertension",
    lastAccessed: "3 days ago",
  },
  {
    id: "4",
    title: "Lipid Panel",
    type: "Lab Results",
    date: "Sep 22, 2024",
    size: "4 MB",
    icon: LipidIcon,
    sharedWith: 1,
    encrypted: true,
    status: "shared",
    provider: "City Medical Lab",
    description: "Cholesterol and triglyceride levels",
    lastAccessed: "1 week ago",
  },
  {
    id: "5",
    title: "ECG Report",
    type: "Imaging",
    date: "Sep 10, 2024",
    size: "2 MB",
    icon: ECGIcon,
    sharedWith: 0,
    encrypted: true,
    status: "private",
    provider: "Cardiology Clinic",
    description: "12-lead electrocardiogram",
    lastAccessed: "2 weeks ago",
  },
  {
    id: "6",
    title: "Urinalysis",
    type: "Lab Results",
    date: "Sep 10, 2024",
    size: "2 MB",
    icon: UrinalysisIcon,
    sharedWith: 0,
    encrypted: true,
    status: "private",
    provider: "City Medical Lab",
    description: "Complete urinalysis with microscopy",
    lastAccessed: "2 weeks ago",
  },
  {
    id: "7",
    title: "MRI Scan - Brain",
    type: "Imaging",
    date: "Aug 28, 2024",
    size: "15 MB",
    icon: XrayIcon,
    sharedWith: 1,
    encrypted: true,
    status: "shared",
    provider: "Advanced Imaging Center",
    description: "T1 and T2 weighted MRI brain scan",
    lastAccessed: "3 weeks ago",
  },
  {
    id: "8",
    title: "Complete Blood Count",
    type: "Lab Results",
    date: "Aug 15, 2024",
    size: "3 MB",
    icon: ResultIcon,
    sharedWith: 0,
    encrypted: true,
    status: "private",
    provider: "City Medical Lab",
    description: "CBC with automated differential",
    lastAccessed: "1 month ago",
  },
  {
    id: "9",
    title: "Prescription - Metformin",
    type: "Prescription",
    date: "Aug 10, 2024",
    size: "2.8 KB",
    icon: LisinoprilIcon,
    sharedWith: 1,
    encrypted: true,
    status: "shared",
    provider: "Dr. James Lin",
    description: "500mg twice daily for diabetes",
    lastAccessed: "1 month ago",
  },
  {
    id: "10",
    title: "CT Scan - Chest",
    type: "Imaging",
    date: "Jul 25, 2024",
    size: "12 MB",
    icon: XrayIcon,
    sharedWith: 2,
    encrypted: true,
    status: "shared",
    provider: "Radiology Center",
    description: "Contrast-enhanced CT chest scan",
    lastAccessed: "2 months ago",
  },
  {
    id: "11",
    title: "Thyroid Function Test",
    type: "Lab Results",
    date: "Jul 18, 2024",
    size: "2.5 MB",
    icon: ResultIcon,
    sharedWith: 0,
    encrypted: true,
    status: "private",
    provider: "City Medical Lab",
    description: "TSH, T3, T4 levels",
    lastAccessed: "2 months ago",
  },
  {
    id: "12",
    title: "Prescription - Atorvastatin",
    type: "Prescription",
    date: "Jul 5, 2024",
    size: "3.2 KB",
    icon: LisinoprilIcon,
    sharedWith: 1,
    encrypted: true,
    status: "shared",
    provider: "Dr. Aisha Mahmoud",
    description: "20mg once daily at bedtime",
    lastAccessed: "2 months ago",
  },
];

export default function DashboardRecords() {
  const [records, setRecords] = useState<Record[]>(mockRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (record.provider && record.provider.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterType === "all" || record.type === filterType;
    const matchesTab = activeTab === "all" || record.type === activeTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const recordStats = {
    total: records.length,
    labResults: records.filter((r) => r.type === "Lab Results").length,
    imaging: records.filter((r) => r.type === "Imaging").length,
    prescriptions: records.filter((r) => r.type === "Prescription").length,
    shared: records.filter((r) => r.status === "shared").length,
    private: records.filter((r) => r.status === "private").length,
    totalSize: records.reduce((acc, r) => {
      const size = parseFloat(r.size);
      return acc + (r.size.includes("MB") ? size : size / 1000);
    }, 0),
  };

  const tabs = [
    { id: "all", label: "All Records", count: recordStats.total, icon: FileText },
    { id: "Lab Results", label: "Lab Results", count: recordStats.labResults, icon: FileText },
    { id: "Imaging", label: "Imaging", count: recordStats.imaging, icon: Image },
    { id: "Prescription", label: "Prescriptions", count: recordStats.prescriptions, icon: Pill },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="records-header">
        <div>
          <h3>My Health Records</h3>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem", margin: 0 }}>
            Manage and organize your health records
          </p>
        </div>
        <button
          className="upload-btn"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={16} /> Upload New Record
        </button>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <FileText size={20} color="#3b82f6" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Total Records</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{recordStats.total}</div>
        </div>
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <Users size={20} color="#10b981" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Shared Records</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{recordStats.shared}</div>
        </div>
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <Shield size={20} color="#8b5cf6" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Private Records</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{recordStats.private}</div>
        </div>
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <BarChart3 size={20} color="#f59e0b" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Total Storage</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>
            {recordStats.totalSize.toFixed(1)} MB
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "2px solid #e5e7eb",
          overflowX: "auto",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
                color: activeTab === tab.id ? "#3b82f6" : "#6b7280",
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: "pointer",
                fontSize: "0.9rem",
                whiteSpace: "nowrap",
                marginBottom: "-2px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
                fontFamily: '"Figtree", sans-serif',
              }}
            >
              <Icon size={16} />
              {tab.label}
              <span
                style={{
                  background: activeTab === tab.id ? "#dbeafe" : "#f3f4f6",
                  color: activeTab === tab.id ? "#3b82f6" : "#6b7280",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: "300px",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="text"
            placeholder="Search records by name, type, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "0.9rem",
              outline: "none",
              fontFamily: '"Figtree", sans-serif',
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Filter size={18} color="#6b7280" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              fontSize: "0.9rem",
              outline: "none",
              cursor: "pointer",
              fontFamily: '"Figtree", sans-serif',
            }}
          >
            <option value="all">All Types</option>
            <option value="Lab Results">Lab Results</option>
            <option value="Imaging">Imaging</option>
            <option value="Prescription">Prescription</option>
          </select>
        </div>
      </div>

      {/* Records Count */}
      <div style={{ marginBottom: "1rem", color: "#6b7280", fontSize: "0.9rem" }}>
        Showing {filteredRecords.length} of {records.length} records
      </div>

      {/* Records Grid */}
      <div className="records-grid">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="record-card"
            onClick={() => setSelectedRecord(record)}
            style={{ cursor: "pointer" }}
          >
            <img src={record.icon} alt={record.type} />
            <h4 className="record-title">{record.title}</h4>
            <p className="record-meta">
              <Calendar size={14} /> {record.date} • <File size={13} /> {record.size}
            </p>
            {record.provider && (
              <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.5rem 0" }}>
                Provider: {record.provider}
              </p>
            )}
            {record.description && (
              <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: "0.25rem 0", fontStyle: "italic" }}>
                {record.description}
              </p>
            )}
            <div className="record-tags">
              {record.sharedWith > 0 && (
                <span className="record-tag">
                  Shared with {record.sharedWith} {record.sharedWith === 1 ? "doctor" : "doctors"}
                </span>
              )}
              {record.encrypted && <span className="record-tag">Encrypted</span>}
              <span className="record-tag">{record.type}</span>
            </div>
            <div className="record-footer">
              <span>
                <Lock size={13} /> {record.status === "private" ? "Private" : "Shared"}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRecord(record);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="View"
                >
                  <Eye size={16} color="#6b7280" />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Share"
                >
                  <Share2 size={16} color="#6b7280" />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Download"
                >
                  <Download size={16} color="#6b7280" />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="More options"
                >
                  ⋯
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#6b7280",
          }}
        >
          <File size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No records found</p>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Record Viewing Modal */}
      {selectedRecord && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "2rem",
          }}
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="view-record-modal"
            style={{
              background: "white",
              borderRadius: "16px",
              padding: 0,
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f9fafb",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={selectedRecord.icon} alt={selectedRecord.type} style={{ width: "48px", height: "48px" }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>
                    {selectedRecord.title}
                  </h3>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", color: "#6b7280" }}>{selectedRecord.type}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#6b7280",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "2rem", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem", marginBottom: "2rem" }}>
                <div
                  style={{
                    padding: "1rem",
                    background: "#f9fafb",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    Date
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <Calendar size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedRecord.date}
                  </p>
                </div>
                <div
                  style={{
                    padding: "1rem",
                    background: "#f9fafb",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    File Size
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <File size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedRecord.size}
                  </p>
                </div>
                {selectedRecord.provider && (
                  <div
                    style={{
                      padding: "1rem",
                      background: "#f9fafb",
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      gridColumn: "span 2",
                    }}
                  >
                    <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                      Provider
                    </label>
                    <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                      {selectedRecord.provider}
                    </p>
                  </div>
                )}
              </div>

              {selectedRecord.description && (
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    Description
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem", color: "#374151", lineHeight: "1.6" }}>
                    {selectedRecord.description}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {selectedRecord.sharedWith > 0 && (
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#dbeafe",
                      color: "#1e40af",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Users size={14} />
                    Shared with {selectedRecord.sharedWith} {selectedRecord.sharedWith === 1 ? "doctor" : "doctors"}
                  </span>
                )}
                {selectedRecord.encrypted && (
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Lock size={14} />
                    Encrypted
                  </span>
                )}
                <span
                  style={{
                    padding: "0.5rem 1rem",
                    background: selectedRecord.status === "shared" ? "#dbeafe" : "#f3f4f6",
                    color: selectedRecord.status === "shared" ? "#1e40af" : "#374151",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Lock size={14} />
                  {selectedRecord.status === "shared" ? "Shared" : "Private"}
                </span>
                <span
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#f3f4f6",
                    color: "#374151",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedRecord.type}
                </span>
              </div>

              {/* Record Preview Area */}
              <div
                style={{
                  background: "#f9fafb",
                  border: "2px dashed #d1d5db",
                  borderRadius: "12px",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                <File size={64} style={{ color: "#9ca3af", marginBottom: "1rem" }} />
                <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
                  Record preview would appear here
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0.5rem 0 0 0" }}>
                  Click "View Full Record" to see complete details
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "1.5rem 2rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end",
                background: "#f9fafb",
              }}
            >
              <button
                onClick={() => setSelectedRecord(null)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Close
              </button>
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#f3f4f6",
                  color: "#111827",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Share2 size={16} /> Share
              </button>
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#f3f4f6",
                  color: "#111827",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Download size={16} /> Download
              </button>
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Eye size={16} /> View Full Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
