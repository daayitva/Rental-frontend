import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiTruck, FiShield, FiMail, FiLock, FiUserPlus, FiCheckCircle, FiAlertCircle, FiPhone } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [user, setUser] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "user"
  });
  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const roles = [
    { id: "user", name: "User", icon: <FiUser className="text-orange-600" /> },
    { id: "driver", name: "Driver", icon: <FiTruck className="text-orange-600" /> },
    
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => {
      const updatedUser = { ...prev, [name]: value };
      
      // Check password match immediately after update
      if (name === "password" || name === "confirmPassword") {
        if (updatedUser.password && updatedUser.confirmPassword) {
          if (updatedUser.password !== updatedUser.confirmPassword) {
            setPasswordError("Passwords do not match");
          } else {
            setPasswordError("");
          }
        } else {
          setPasswordError("");
        }
      }
      
      return updatedUser;
    });
  };

  const sendOtp = async () => {
    if (!user.email) {
      alert("Please enter your email first");
      return;
    }

    setIsSendingOtp(true);
    try {
      await axios.post("http://localhost:10000/api/auth/send-otp", { email: user.email });
      setShowOtpSection(true);
      setCountdown(30);
      alert("OTP sent to your email");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:10000/api/auth/verify-otp", { 
        email: user.email, 
        otp 
      });
      setIsVerified(true);
      alert("Email verified successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isVerified) {
      alert("Please verify your email first");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:10000/api/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        mobile: user.mobile,
        role: user.role
      });
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="w-full max-w-xs">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-2xl p-4"
        >
          <div className="text-center mb-3">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mx-auto w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-1"
            >
              <FiUserPlus className="text-orange-600 text-base" />
            </motion.div>
            <h2 className="text-lg font-bold text-gray-800">Create Account</h2>
          </div>

          {/* Compact Role Selection */}
          <div className="flex mb-2 gap-1">
            {roles.map((role) => (
              <motion.button
                key={role.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setUser(prev => ({...prev, role: role.id}))}
                className={`flex-1 py-1 rounded text-xs ${
                  user.role === role.id
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {role.name}
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-1.5">
            <div className="grid gap-1.5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
                <FiPhone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
                <FiMail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>

              {!showOtpSection && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isSendingOtp}
                  className="text-xs text-orange-600 hover:text-orange-800 font-medium text-left"
                >
                  {isSendingOtp ? "Sending OTP..." : "Send verification OTP"}
                </button>
              )}

              {showOtpSection && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded"
                      maxLength="6"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={isVerified || isLoading}
                      className={`px-2 py-1.5 rounded text-xs ${
                        isVerified ? "bg-green-100 text-green-700" : "bg-orange-600 text-white"
                      }`}
                    >
                      {isVerified ? "Verified" : isLoading ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                  {countdown > 0 ? (
                    <p className="text-2xs text-gray-500">Resend in {countdown}s</p>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-xs text-orange-600 hover:text-orange-800"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              )}

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
                <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-7 pr-2 py-1.5 text-sm border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded focus:ring-2 focus:ring-orange-500`}
                  required
                />
                <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs flex items-center">
                  <FiAlertCircle className="mr-1" /> {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !isVerified || passwordError}
              className={`w-full py-1.5 mt-1 text-xs rounded ${
                isLoading || !isVerified || passwordError
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 text-white"
              }`}
            >
              {isLoading ? "Registering..." : `Register as ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}
            </button>
          </form>

          <p className="text-xs text-center mt-2 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-orange-700 hover:text-orange-500">
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
export default Register;