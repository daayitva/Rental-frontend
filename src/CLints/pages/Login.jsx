import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



import {
  FiMail,
  FiLock,
  FiLogIn,
  FiUser,
  FiTruck,
} from "react-icons/fi";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState("user");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: "user", name: "User", icon: <FiUser /> },
    { id: "driver", name: "Driver", icon: <FiTruck /> },
  ];

  // 🔁 Auto redirect if token already exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      if (role === "driver") {
        navigate("/Driver-Dashboard");
      } else if (role === "user") {
        navigate("/home");
      }
    }
  }, [navigate]);

  // 🌀 Animation for role change
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [activeRole]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
console.log("Sending login data:", { email: user.email, role: activeRole });
    try {
      const res = await axios.post("http://localhost:10000/api/auth/login", {
       
        ...user,
        role: activeRole,
        
      });
console.log("Login payload:", { ...user, role: activeRole });

      const { token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", activeRole);
      localStorage.setItem("email", user.email);
      toast.success(`Logged in successfully as ${activeRole}`);

      setTimeout(() => {
        if (activeRole === "driver") {
          navigate("/Driver-Dashboard");
        } else if (activeRole === "user") {
          navigate("/home");
        } else {
          toast.error("Unknown role");
        }
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="w-full max-w-xs">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <FiLogIn className="text-orange-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-xs mt-1">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Login as</label>
            <div className="flex space-x-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id)}
                  className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-all ${
                    activeRole === role.id
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  } ${animate && activeRole === role.id ? "animate-bounce" : ""}`}
                >
                  <span className="text-sm mb-1">{role.icon}</span>
                  {role.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-sm" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full text-sm pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-3 w-3 text-orange-600 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-1.5 text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-orange-600 hover:text-orange-500">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white text-sm font-medium transition ${
                isLoading ? "bg-orange-400" : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isLoading ? "Signing in..." : `Sign in as ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-orange-600 hover:text-orange-500">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
