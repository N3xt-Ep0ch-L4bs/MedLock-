import { NavLink, useNavigate } from "react-router-dom";
import {
  useDisconnectWallet,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import {
  ShieldCheck,
  FileText,
  ClipboardCheck,
  User,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import "../../dashboard.css";

export const DashboardSidebar = () => {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const navigate = useNavigate();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Sign out clicked");
    
    try {
      // Clear any stored profile data from localStorage
      if (account?.address) {
        localStorage.removeItem(`walrusId_${account.address}`);
        localStorage.removeItem(`backupKey_${account.address}`);
        console.log("Cleared localStorage for address:", account.address);
      }
      
      // Disconnect wallet
      console.log("Calling disconnect...");
      disconnect();
      console.log("Disconnect called");
      
      // Redirect to login page after disconnecting
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <ShieldCheck size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/records"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <FileText size={18} /> My Records
        </NavLink>

        <NavLink
          to="/dashboard/prescriptions"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <ClipboardCheck size={18} /> Prescriptions
        </NavLink>

        <NavLink
          to="/dashboard/shared"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <User size={18} /> Shared Access
        </NavLink>

        <NavLink
          to="/dashboard/activity"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <Activity size={18} /> Activity Log
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
          style={{ textDecoration: "none", display: "block" }}
        >
          <Settings size={18} /> Settings
        </NavLink>
      </nav>
      <button 
        className="logout-link" 
        onClick={handleSignOut}
        type="button"
        style={{ 
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          fontFamily: "inherit",
          fontSize: "inherit",
        }}
      >
        <LogOut size={18} /> Sign Out
      </button>
    </aside>
  );
};

