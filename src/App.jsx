// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


// Import components/pages
import Home from "./CLints/Home";
import Register from "./CLints/pages/Register";
import Login from "./CLints/pages/Login";
import Splashscreen from "./CLints/Splashscreen";
import Carbooking from "./CLints/components/carbooking";
import Booking from "./CLints/components/booking";
import DriverDashboard from "./Driver/Driverdashboard";

const App = () => {
  // ✅ Corrected key: 'userRole'
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        {/* 🌟 Splash Screen */}
        <Route path="/" element={<Splashscreen />} />

        {/* 🌐 Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🏠 User Routes */}
        <Route
          path="/home"
          element={
            token && role === "user" ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/carbooking"
          element={
            token && role === "user" ? (
              <Carbooking />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/booking"
          element={
            token && role === "user" ? (
              <Booking />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🚚 Driver Route */}
        <Route
          path="/Driver-Dashboard"
          element={
            token && role === "driver" ? (
              <DriverDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔁 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* ✅ Toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
