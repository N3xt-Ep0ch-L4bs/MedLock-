import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Building2, User, Pill, Plus, Search, Settings, Eye, Edit, Trash2 } from "lucide-react";
import "./organization.css";

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  organization: string;
  licenseNumber: string;
  status: "active" | "inactive";
}

interface Pharmacy {
  id: string;
  pharmacyName: string;
  email: string;
  pharmacyType: string;
  licenseNumber: string;
  city: string;
  status: "active" | "inactive";
}

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "doctors" | "pharmacies">("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data - in real app, this would come from API
  const doctors: Doctor[] = [
    {
      id: "DOC-001",
      firstName: "Sarah",
      lastName: "Chen",
      email: "sarah.chen@hospital.com",
      specialty: "Cardiology",
      organization: "City Medical Center",
      licenseNumber: "MD-12345",
      status: "active",
    },
    {
      id: "DOC-002",
      firstName: "Michael",
      lastName: "Lee",
      email: "michael.lee@hospital.com",
      specialty: "Pediatrics",
      organization: "City Medical Center",
      licenseNumber: "MD-12346",
      status: "active",
    },
    {
      id: "DOC-003",
      firstName: "Lisa",
      lastName: "Johnson",
      email: "lisa.johnson@hospital.com",
      specialty: "Internal Medicine",
      organization: "City Medical Center",
      licenseNumber: "MD-12347",
      status: "active",
    },
  ];

  const pharmacies: Pharmacy[] = [
    {
      id: "PHARM-001",
      pharmacyName: "CityMed Pharmacy",
      email: "contact@citymed.com",
      pharmacyType: "Retail Pharmacy",
      licenseNumber: "PH-54321",
      city: "New York",
      status: "active",
    },
    {
      id: "PHARM-002",
      pharmacyName: "HealthPlus Pharmacy",
      email: "info@healthplus.com",
      pharmacyType: "Chain Pharmacy",
      licenseNumber: "PH-54322",
      city: "Los Angeles",
      status: "active",
    },
  ];

  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter(d => d.status === "active").length,
    totalPharmacies: pharmacies.length,
    activePharmacies: pharmacies.filter(p => p.status === "active").length,
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPharmacies = pharmacies.filter(
    (pharmacy) =>
      pharmacy.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="organization-dashboard">
      {/* Sidebar */}
      <aside className="org-sidebar">
        <div className="org-sidebar-header">
          <img src={Logo} alt="MedLock Logo" className="org-sidebar-logo" />
          <h1 className="org-sidebar-title">MedLock</h1>
        </div>
        <nav className="org-sidebar-nav">
          <button
            className={`org-sidebar-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Building2 size={20} />
            Overview
          </button>
          <button
            className={`org-sidebar-link ${activeTab === "doctors" ? "active" : ""}`}
            onClick={() => setActiveTab("doctors")}
          >
            <User size={20} />
            Doctors
          </button>
          <button
            className={`org-sidebar-link ${activeTab === "pharmacies" ? "active" : ""}`}
            onClick={() => setActiveTab("pharmacies")}
          >
            <Pill size={20} />
            Pharmacies
          </button>
        </nav>
        <div className="org-sidebar-footer">
          <button className="org-sidebar-link" onClick={() => navigate("/admin")}>
            <Settings size={20} />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="org-main-area">
        {/* Header */}
        <header className="org-header">
          <div>
            <h2 style={{ 
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#111827",
              fontFamily: '"Figtree", sans-serif',
              margin: 0,
            }}>
              {activeTab === "overview" && "Organization Dashboard"}
              {activeTab === "doctors" && "Doctors Management"}
              {activeTab === "pharmacies" && "Pharmacies Management"}
            </h2>
            <p style={{ 
              fontSize: "0.875rem",
              color: "#6b7280",
              margin: "0.25rem 0 0 0",
              fontFamily: '"Figtree", sans-serif',
            }}>
              City Medical Center
            </p>
          </div>
          <div className="org-header-actions">
            <div className="org-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="org-add-btn"
              onClick={() => navigate("/admin")}
            >
              <Plus size={18} />
              Add {activeTab === "doctors" ? "Doctor" : activeTab === "pharmacies" ? "Pharmacy" : "Member"}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="org-content">
          {activeTab === "overview" && (
            <div className="org-overview">
              {/* Stats Cards */}
              <div className="org-stats-grid">
                <div className="org-stat-card">
                  <div className="org-stat-icon" style={{ background: "#dbeafe" }}>
                    <User size={24} color="#2563eb" />
                  </div>
                  <div className="org-stat-content">
                    <h3>{stats.totalDoctors}</h3>
                    <p>Total Doctors</p>
                    <span className="org-stat-badge">{stats.activeDoctors} Active</span>
                  </div>
                </div>

                <div className="org-stat-card">
                  <div className="org-stat-icon" style={{ background: "#fce7f3" }}>
                    <Pill size={24} color="#db2777" />
                  </div>
                  <div className="org-stat-content">
                    <h3>{stats.totalPharmacies}</h3>
                    <p>Total Pharmacies</p>
                    <span className="org-stat-badge">{stats.activePharmacies} Active</span>
                  </div>
                </div>

                <div className="org-stat-card">
                  <div className="org-stat-icon" style={{ background: "#dcfce7" }}>
                    <Building2 size={24} color="#16a34a" />
                  </div>
                  <div className="org-stat-content">
                    <h3>1</h3>
                    <p>Organization</p>
                    <span className="org-stat-badge">Active</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="org-section">
                <div className="org-section-header">
                  <h3>Quick Actions</h3>
                </div>
                <div className="org-actions-grid">
                  <button className="org-action-card" onClick={() => navigate("/admin")}>
                    <Plus size={32} color="#4338ca" />
                    <h4>Register Doctor</h4>
                    <p>Add a new doctor to your organization</p>
                  </button>
                  <button className="org-action-card" onClick={() => navigate("/admin")}>
                    <Plus size={32} color="#4338ca" />
                    <h4>Register Pharmacy</h4>
                    <p>Add a new pharmacy to your organization</p>
                  </button>
                  <button className="org-action-card" onClick={() => setActiveTab("doctors")}>
                    <User size={32} color="#4338ca" />
                    <h4>View Doctors</h4>
                    <p>Manage all doctors in your organization</p>
                  </button>
                  <button className="org-action-card" onClick={() => setActiveTab("pharmacies")}>
                    <Pill size={32} color="#4338ca" />
                    <h4>View Pharmacies</h4>
                    <p>Manage all pharmacies in your organization</p>
                  </button>
                </div>
              </div>

              {/* Recent Doctors */}
              <div className="org-section">
                <div className="org-section-header">
                  <h3>Recent Doctors</h3>
                  <button className="org-view-all" onClick={() => setActiveTab("doctors")}>
                    View All
                  </button>
                </div>
                <div className="org-table-container">
                  <table className="org-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Email</th>
                        <th>License</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.slice(0, 5).map((doctor) => (
                        <tr key={doctor.id}>
                          <td>
                            <strong>{doctor.firstName} {doctor.lastName}</strong>
                          </td>
                          <td>{doctor.specialty}</td>
                          <td>{doctor.email}</td>
                          <td>{doctor.licenseNumber}</td>
                          <td>
                            <span className={`org-status-badge ${doctor.status}`}>
                              {doctor.status}
                            </span>
                          </td>
                          <td>
                            <div className="org-action-buttons">
                              <button className="org-action-btn" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="org-action-btn" title="Edit">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="org-list-view">
              <div className="org-list-header">
                <h3>All Doctors ({filteredDoctors.length})</h3>
                <button className="org-add-btn" onClick={() => navigate("/admin")}>
                  <Plus size={18} />
                  Add Doctor
                </button>
              </div>
              <div className="org-table-container">
                <table className="org-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialty</th>
                      <th>Email</th>
                      <th>Organization</th>
                      <th>License Number</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <tr key={doctor.id}>
                          <td>
                            <strong>{doctor.firstName} {doctor.lastName}</strong>
                          </td>
                          <td>{doctor.specialty}</td>
                          <td>{doctor.email}</td>
                          <td>{doctor.organization}</td>
                          <td>{doctor.licenseNumber}</td>
                          <td>
                            <span className={`org-status-badge ${doctor.status}`}>
                              {doctor.status}
                            </span>
                          </td>
                          <td>
                            <div className="org-action-buttons">
                              <button className="org-action-btn" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="org-action-btn" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="org-action-btn" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                          No doctors found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "pharmacies" && (
            <div className="org-list-view">
              <div className="org-list-header">
                <h3>All Pharmacies ({filteredPharmacies.length})</h3>
                <button className="org-add-btn" onClick={() => navigate("/admin")}>
                  <Plus size={18} />
                  Add Pharmacy
                </button>
              </div>
              <div className="org-table-container">
                <table className="org-table">
                  <thead>
                    <tr>
                      <th>Pharmacy Name</th>
                      <th>Type</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>License Number</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPharmacies.length > 0 ? (
                      filteredPharmacies.map((pharmacy) => (
                        <tr key={pharmacy.id}>
                          <td>
                            <strong>{pharmacy.pharmacyName}</strong>
                          </td>
                          <td>{pharmacy.pharmacyType}</td>
                          <td>{pharmacy.email}</td>
                          <td>{pharmacy.city}</td>
                          <td>{pharmacy.licenseNumber}</td>
                          <td>
                            <span className={`org-status-badge ${pharmacy.status}`}>
                              {pharmacy.status}
                            </span>
                          </td>
                          <td>
                            <div className="org-action-buttons">
                              <button className="org-action-btn" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="org-action-btn" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="org-action-btn" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "2rem" }}>
                          No pharmacies found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;

