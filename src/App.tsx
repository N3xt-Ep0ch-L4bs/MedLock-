import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Doctor from "./pages/doctor";
import Login from "./pages/login";
import PharmacyHistory from "./pages/PharmacyHistory";
import About from "./pages/about";
import How from "./pages/how";
import PharmacyDashboard from "./pages/pharmacy";
import Dashboard from "./pages/dashboard";
import Support from "./pages/support";
import "./App.css";
import { Import } from "lucide-react";
import LearnMore from "./pages/learnmore";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/howitworks" element={<How />} />
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/pharmacy" element={<PharmacyDashboard />} />
        <Route path="/pharmacyHistory" element={<PharmacyHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

