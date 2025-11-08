import React from "react";
import {
  Search,
  Filter,
  Users,
  FileText,
  Lock,
  CheckCircle,
  Clock,
  Bell,
} from "lucide-react";

const DoctorDashboard = () => {
  const patients = [
    { name: "Ezekiel Okon", age: 34, gender: "Male", id: "HLK-2847", lastVisit: "2 weeks ago", color: "bg-blue-500" },
    { name: "Sarah Chen", age: 42, gender: "Female", id: "HLK-3192", lastVisit: "Today", color: "bg-red-500" },
    { name: "Michael Park", age: 29, gender: "Male", id: "HLK-2804", lastVisit: "Yesterday", color: "bg-green-500" },
  ];

  const notifications = [
    { icon: <Bell className="text-blue-500" size={16} />, text: "Lisa Johnson granted you access to medical records", time: "15 minutes ago" },
    { icon: <FileText className="text-green-500" size={16} />, text: "Prescription for Sarah Chen dispensed by CityMed Pharmacy", time: "1 hour ago" },
    { icon: <Clock className="text-yellow-500" size={16} />, text: "System maintenance scheduled for tonight at 11 PM", time: "3 hours ago" },
    { icon: <FileText className="text-indigo-500" size={16} />, text: "New lab results uploaded for Michael Park", time: "Yesterday" },
  ];

  const activities = [
    { icon: <CheckCircle className="text-green-500" size={18} />, text: "You prescribed Lisinopril 10mg to Sarah Chen", time: "1 hour ago" },
    { icon: <Users className="text-blue-500" size={18} />, text: "Access granted by John Doe", time: "3 hours ago" },
    { icon: <FileText className="text-gray-500" size={18} />, text: "You viewed lab results for Michael Park", time: "Yesterday, 4:32 PM" },
    { icon: <CheckCircle className="text-green-500" size={18} />, text: "You prescribed Metformin 500mg to Ezekiel Okon", time: "2 days ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 p-6">MedLock</h1>
          <nav className="px-4">
            <ul className="space-y-2">
              <li className="p-3 bg-blue-50 text-blue-600 rounded-lg font-medium">Dashboard</li>
              <li className="p-3 hover:bg-gray-100 rounded-lg">Patients</li>
              <li className="p-3 hover:bg-gray-100 rounded-lg">Prescriptions</li>
              <li className="p-3 hover:bg-gray-100 rounded-lg">Settings</li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full text-green-600 font-bold">AM</div>
            <div>
              <p className="font-semibold">Dr. Aisha Mahmoud</p>
              <p className="text-sm text-gray-500">Cardiologist</p>
              <p className="text-xs text-gray-400">ID: DOC-1647</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm w-1/2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name or ID"
              className="w-full outline-none text-sm"
            />
          </div>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Users className="text-blue-500" />
            <h2 className="text-2xl font-bold mt-2">28</h2>
            <p className="text-gray-500 text-sm">Active Patients</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <FileText className="text-green-500" />
            <h2 className="text-2xl font-bold mt-2">15</h2>
            <p className="text-gray-500 text-sm">Prescriptions (This Week)</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Lock className="text-orange-500" />
            <h2 className="text-2xl font-bold mt-2">5</h2>
            <p className="text-gray-500 text-sm">Pending Access Requests</p>
          </div>
        </div>

        {/* Today's Patients & Notifications */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-3">Today's Patients</h3>
            <div className="grid grid-cols-3 gap-4">
              {patients.map((p, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${p.color} text-white font-bold rounded-full h-10 w-10 flex items-center justify-center`}>
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.age} • {p.gender}</p>
                        <p className="text-xs text-gray-400">{p.id}</p>
                      </div>
                    </div>
                    <div className="text-green-600 text-sm font-medium">Active Access</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Last visit: {p.lastVisit}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <h3 className="text-lg font-semibold mt-8 mb-3">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-sm divide-y border border-gray-100">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition">
                  {a.icon}
                  <div>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-gray-500">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Notifications</h3>
            <div className="bg-white rounded-xl shadow-sm divide-y border border-gray-100">
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 transition">
                  {n.icon}
                  <div>
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-gray-500">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
