import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Doctor from "./pages/doctor";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Router>
  );
}

export default App;
