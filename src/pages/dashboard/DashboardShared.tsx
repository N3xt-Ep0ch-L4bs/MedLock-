import { useState } from "react";
import {
  UserLock,
  UserX,
  Search,
  Calendar,
  File,
  Clock,
  Eye,
  XCircle,
  Plus,
  Shield,
  Users,
  Building2,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import GrantAccess from "../../components/access";
import AishaDp from "../../assets/aisha-dp.png";
import JamesDp from "../../assets/lin-dp.png";
import "../dashboard.css";

interface SharedAccess {
  id: string;
  name: string;
  role: "Doctor" | "Pharmacy" | "Organization";
  specialty?: string;
  organization?: string;
  avatar: string;
  accessGranted: string;
  expiresIn: string;
  recordsShared: number;
  status: "active" | "expiring" | "expired";
  permissions: string[];
  lastAccess?: string;
  totalViews?: number;
  email?: string;
  phone?: string;
}

const mockSharedAccess: SharedAccess[] = [
  {
    id: "1",
    name: "Dr. Aisha Mahmoud",
    role: "Doctor",
    specialty: "Cardiology",
    organization: "City Medical Center",
    avatar: AishaDp,
    accessGranted: "Oct 15, 2024",
    expiresIn: "6 days",
    recordsShared: 8,
    status: "expiring",
    permissions: ["View Records", "View Prescriptions"],
    lastAccess: "2 hours ago",
    totalViews: 24,
    email: "aisha.mahmoud@citymedical.com",
  },
  {
    id: "2",
    name: "Dr. James Lin",
    role: "Doctor",
    specialty: "Primary Care",
    organization: "Wellness Clinic",
    avatar: JamesDp,
    accessGranted: "Oct 1, 2024",
    expiresIn: "22 days",
    recordsShared: 5,
    status: "active",
    permissions: ["View Records"],
    lastAccess: "1 day ago",
    totalViews: 12,
    email: "james.lin@wellnessclinic.com",
  },
  {
    id: "3",
    name: "CVS Pharmacy - Downtown",
    role: "Pharmacy",
    organization: "CVS Health",
    avatar: AishaDp,
    accessGranted: "Sep 28, 2024",
    expiresIn: "Expired",
    recordsShared: 3,
    status: "expired",
    permissions: ["View Prescriptions", "Dispense"],
    lastAccess: "2 weeks ago",
    totalViews: 8,
    email: "downtown@cvs.com",
    phone: "(555) 123-4567",
  },
  {
    id: "4",
    name: "Dr. Sarah Johnson",
    role: "Doctor",
    specialty: "Endocrinology",
    organization: "Metro Health System",
    avatar: JamesDp,
    accessGranted: "Sep 10, 2024",
    expiresIn: "45 days",
    recordsShared: 6,
    status: "active",
    permissions: ["View Records", "View Prescriptions", "Download"],
    lastAccess: "3 days ago",
    totalViews: 18,
    email: "sarah.johnson@metrohealth.com",
  },
];

export default function DashboardShared() {
  const [sharedAccess, setSharedAccess] = useState<SharedAccess[]>(mockSharedAccess);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<SharedAccess | null>(null);

  const filteredAccess = sharedAccess.filter((access) => {
    const matchesSearch =
      access.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (access.organization && access.organization.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterRole === "all" || access.role === filterRole;
    const matchesTab = activeTab === "all" || access.role === activeTab;
    return matchesSearch && matchesFilter && matchesTab;
  });

  const handleRevoke = (id: string) => {
    if (window.confirm("Are you sure you want to revoke access?")) {
      setSharedAccess(sharedAccess.filter((access) => access.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "expiring":
        return "#f59e0b";
      case "expired":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const accessStats = {
    total: sharedAccess.length,
    doctors: sharedAccess.filter((a) => a.role === "Doctor").length,
    pharmacies: sharedAccess.filter((a) => a.role === "Pharmacy").length,
    organizations: sharedAccess.filter((a) => a.role === "Organization").length,
    active: sharedAccess.filter((a) => a.status === "active").length,
    expiring: sharedAccess.filter((a) => a.status === "expiring").length,
    expired: sharedAccess.filter((a) => a.status === "expired").length,
    totalRecordsShared: sharedAccess.reduce((acc, a) => acc + a.recordsShared, 0),
  };

  const tabs = [
    { id: "all", label: "All Access", count: accessStats.total, icon: Users },
    { id: "Doctor", label: "Doctors", count: accessStats.doctors, icon: UserLock },
    { id: "Pharmacy", label: "Pharmacies", count: accessStats.pharmacies, icon: Building2 },
    { id: "Organization", label: "Organizations", count: accessStats.organizations, icon: Building2 },
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="section-header">
        <div>
          <h3>Shared Access</h3>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "0.25rem", margin: 0 }}>
            Manage who has access to your health records
          </p>
        </div>
        <button
          className="grant-btn"
          onClick={() => setIsGrantModalOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={16} /> Grant New Access
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
            <Users size={20} color="#3b82f6" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Total Shared</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{accessStats.total}</div>
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
            <CheckCircle size={20} color="#10b981" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Active</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{accessStats.active}</div>
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
            <AlertTriangle size={20} color="#f59e0b" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Expiring Soon</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{accessStats.expiring}</div>
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
            <File size={20} color="#8b5cf6" />
            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Records Shared</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "#111827" }}>{accessStats.totalRecordsShared}</div>
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
            placeholder="Search by name or organization..."
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
          <Shield size={18} color="#6b7280" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
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
            <option value="all">All Roles</option>
            <option value="Doctor">Doctors</option>
            <option value="Pharmacy">Pharmacies</option>
            <option value="Organization">Organizations</option>
          </select>
        </div>
      </div>

      {/* Access Count */}
      <div style={{ marginBottom: "1rem", color: "#6b7280", fontSize: "0.9rem" }}>
        Showing {filteredAccess.length} of {sharedAccess.length} shared access entries
      </div>

      {/* Access Cards */}
      <div className="doctor-access-grid">
        {filteredAccess.map((access) => (
          <div
            key={access.id}
            className="doctor-card"
            onClick={() => setSelectedAccess(access)}
            style={{ cursor: "pointer" }}
          >
            <div className="doctor-info">
              <img src={access.avatar} alt={access.name} className="doctor-avatar" />
              <div>
                <h4>{access.name}</h4>
                <p>
                  {access.specialty && `${access.specialty} • `}
                  {access.organization}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.25rem",
                    padding: "0.25rem 0.5rem",
                    background: "#eef2ff",
                    color: "#4338ca",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {access.role}
                </span>
              </div>
            </div>
            <div className="doctor-details">
              <div>
                <p>Access granted</p>
                <strong>
                  <Calendar size={12} style={{ marginRight: "0.25rem" }} />
                  {access.accessGranted}
                </strong>
              </div>
              <div>
                <p>Expires in</p>
                <strong
                  className="expiring"
                  style={{
                    color: getStatusColor(access.status),
                  }}
                >
                  {access.expiresIn}
                </strong>
              </div>
              <div>
                <p>Records shared</p>
                <strong>
                  <File size={12} style={{ marginRight: "0.25rem" }} />
                  {access.recordsShared} file{access.recordsShared !== 1 ? "s" : ""}
                </strong>
              </div>
            </div>
            {access.lastAccess && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#6b7280" }}>
                Last access: {access.lastAccess}
              </div>
            )}
            {access.totalViews && (
              <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "#6b7280" }}>
                Total views: {access.totalViews}
              </div>
            )}
            <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.5rem" }}>Permissions:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {access.permissions.map((permission, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                      background: "#f3f4f6",
                      borderRadius: "6px",
                      color: "#374151",
                    }}
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
            <div className="doctor-actions" onClick={(e) => e.stopPropagation()}>
              <button
                className="view-btn"
                onClick={() => setSelectedAccess(access)}
              >
                <Eye size={14} style={{ marginRight: "0.25rem" }} />
                View Details
              </button>
              <button
                className="revoke-btn"
                onClick={() => handleRevoke(access.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <UserX size={14} />
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAccess.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            color: "#6b7280",
          }}
        >
          <UserLock size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No shared access found</p>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Access Viewing Modal */}
      {selectedAccess && (
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
          onClick={() => setSelectedAccess(null)}
        >
          <div
            className="view-access-modal"
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
                <img
                  src={selectedAccess.avatar}
                  alt={selectedAccess.name}
                  style={{ width: "48px", height: "48px", borderRadius: "50%" }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600, color: "#111827" }}>
                    {selectedAccess.name}
                  </h3>
                  <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", color: "#6b7280" }}>
                    {selectedAccess.specialty && `${selectedAccess.specialty} • `}
                    {selectedAccess.organization}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAccess(null)}
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
                    Access Granted
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <Calendar size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedAccess.accessGranted}
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
                    Expires In
                  </label>
                  <p
                    style={{
                      margin: "0.5rem 0 0 0",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: getStatusColor(selectedAccess.status),
                    }}
                  >
                    <Clock size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedAccess.expiresIn}
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
                    Records Shared
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <File size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedAccess.recordsShared} file{selectedAccess.recordsShared !== 1 ? "s" : ""}
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
                    Status
                  </label>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "0.5rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      background: `${getStatusColor(selectedAccess.status)}15`,
                      color: getStatusColor(selectedAccess.status),
                    }}
                  >
                    {selectedAccess.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {selectedAccess.lastAccess && (
                <div
                  style={{
                    padding: "1rem",
                    background: "#f9fafb",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    marginBottom: "1.5rem",
                  }}
                >
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    Last Access
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <Activity size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedAccess.lastAccess}
                  </p>
                </div>
              )}

              {selectedAccess.totalViews && (
                <div
                  style={{
                    padding: "1rem",
                    background: "#f9fafb",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    marginBottom: "1.5rem",
                  }}
                >
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    Total Views
                  </label>
                  <p style={{ margin: "0.5rem 0 0 0", fontSize: "1rem", fontWeight: 600, color: "#111827" }}>
                    <Eye size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                    {selectedAccess.totalViews} view{selectedAccess.totalViews !== 1 ? "s" : ""}
                  </p>
                </div>
              )}

              {(selectedAccess.email || selectedAccess.phone) && (
                <div
                  style={{
                    padding: "1.5rem",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    marginBottom: "1.5rem",
                  }}
                >
                  <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                    Contact Information
                  </label>
                  <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {selectedAccess.email && (
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#374151" }}>
                        <strong>Email:</strong> {selectedAccess.email}
                      </p>
                    )}
                    {selectedAccess.phone && (
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#374151" }}>
                        <strong>Phone:</strong> {selectedAccess.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  padding: "1.5rem",
                  background: "#f9fafb",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  marginBottom: "1.5rem",
                }}
              >
                <label style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>
                  Permissions
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                  {selectedAccess.permissions.map((permission, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 0.75rem",
                        background: "#eef2ff",
                        borderRadius: "8px",
                        color: "#4338ca",
                        fontWeight: 600,
                      }}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shared Records Preview */}
              <div
                style={{
                  background: "#f9fafb",
                  border: "2px dashed #d1d5db",
                  borderRadius: "12px",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  marginTop: "2rem",
                }}
              >
                <File size={64} style={{ color: "#9ca3af", marginBottom: "1rem" }} />
                <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
                  {selectedAccess.recordsShared} record{selectedAccess.recordsShared !== 1 ? "s" : ""} shared with this {selectedAccess.role.toLowerCase()}
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0.5rem 0 0 0" }}>
                  Click "View Shared Records" to see complete list
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
                onClick={() => setSelectedAccess(null)}
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
                <Eye size={16} /> View Shared Records
              </button>
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#ef4444",
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
                onClick={() => {
                  handleRevoke(selectedAccess.id);
                  setSelectedAccess(null);
                }}
              >
                <UserX size={16} /> Revoke Access
              </button>
            </div>
          </div>
        </div>
      )}

      <GrantAccess isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} />
    </div>
  );
}
