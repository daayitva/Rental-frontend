import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./CLints/Home";
import Navbar from "./CLints/components/Navbar";
import Register from "./CLints/pages/Register";
import Login from "./CLints/pages/Login";
import Dashboard from "./CLints/pages/Dashboard";
import Splashscreen from "./CLints/Splashscreen"; 
import Carbooking from "./CLints/components/carbooking";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Splashscreen />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/carbooking" element={<Carbooking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
