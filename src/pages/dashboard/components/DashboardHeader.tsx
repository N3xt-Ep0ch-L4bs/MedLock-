import { useMemo, useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useLocation } from "react-router-dom";
import { Search, Bell, Settings } from "lucide-react";
import Logo from "../../../assets/logo.png";
import { usePatientProfile } from "../../../hooks/usePatientProfile";
import { useWalletSigner } from "../../../hooks/useWalletSigner";
import { SealWalrusService } from "../../../services/sealWalrusService";
import { useSuiClient } from "@mysten/dapp-kit";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import "../../dashboard.css";

export const DashboardHeader = () => {
  const account = useCurrentAccount();
  const location = useLocation();
  const packageId = import.meta.env.VITE_SUI_PACKAGE_ID || "";
  const network = (import.meta.env.VITE_SUI_NETWORK || "testnet") as
    | "testnet"
    | "mainnet"
    | "devnet";
  const customSealServerIds = (import.meta.env.VITE_SEAL_SERVER_IDS || "")
    .split(",")
    .filter(Boolean);
  const enokiPrivateApiKey = import.meta.env.VITE_ENOKI_PRIVATE_API_KEY;
  const suiClientFromProvider = useSuiClient();
  const walletSigner = useWalletSigner();

  const { walrusId, profileObjectId, recordsId } = usePatientProfile(packageId);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>("");

  // Get route name from location
  const getRouteName = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") {
      return "Dashboard";
    }
    const route = path.split("/dashboard/")[1] || "";
    if (!route) return "Dashboard";
    
    // Map route names to display names
    const routeMap: { [key: string]: string } = {
      "records": "My Records",
      "prescriptions": "Prescriptions",
      "shared": "Shared Access",
      "activity": "Activity Log",
      "settings": "Settings",
    };
    
    return routeMap[route] || route
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const suiClient = useMemo(() => {
    return suiClientFromProvider || new SuiClient({
      url: getFullnodeUrl(network),
    });
  }, [network, suiClientFromProvider]);

  const sealWalrusService = useMemo(() => {
    if (!packageId) return null;
    return new SealWalrusService(
      packageId,
      network,
      customSealServerIds.length > 0 ? customSealServerIds : undefined,
      enokiPrivateApiKey
    );
  }, [packageId, network, customSealServerIds.join(","), enokiPrivateApiKey]);

  // Load profile image and name
  useEffect(() => {
    if (!walrusId || !profileObjectId || !recordsId || !sealWalrusService || !account?.address || !walletSigner) {
      return;
    }

    const loadProfile = async () => {
      try {
        const storedWalrusId = localStorage.getItem(`walrusId_${account.address}`);
        const profileWalrusId = walrusId || storedWalrusId;

        if (profileWalrusId && profileObjectId && recordsId) {
          const walrusProfileData = await sealWalrusService.loadProfile(
            profileWalrusId,
            account.address,
            profileObjectId,
            recordsId,
            walletSigner
          );

          if (walrusProfileData) {
            if (walrusProfileData.profileImage) {
              setProfileImage(walrusProfileData.profileImage);
            }
            if (walrusProfileData.fullName) {
              setProfileName(walrusProfileData.fullName);
            }
          }
        }
      } catch (error) {
        console.error("Error loading profile for header:", error);
      }
    };

    loadProfile();
  }, [walrusId, profileObjectId, recordsId, sealWalrusService, account?.address, walletSigner]);

  // Get initials from profile name or account address
  const getInitials = () => {
    if (profileName) {
      return profileName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (account?.address) {
      return account.address.slice(2, 4).toUpperCase();
    }
    return "EO";
  };

  return (
    <header className="topbar">
      <div className="sidebar-header">
        <img src={Logo} alt="MedLock Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">MedLock</h1>
      </div>
      <div style={{ 
        flex: 1, 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#111827",
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}>
        {getRouteName()}
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
        <div className="profile">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#4338ca",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 600,
            }}>
              {getInitials()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

