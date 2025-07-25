import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔁 Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // 👇 Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  // 👇 Handle logout click
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="bg-[#FF6B35] text-white px-3 py-1 rounded-lg font-bold text-lg">
              Car rental
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-[#FF6B35] text-white px-3 py-1 rounded-lg text-sm">
              <Phone className="w-3 h-3 mr-1" />
              <span>24x7</span>
              <span className="ml-1 font-medium">090 4545 0000</span>
            </div>

            <button className="border border-gray-300 px-3 py-1 rounded-lg text-gray-700 hover:border-[#FF6B35] text-sm transition-colors">
              Download App
            </button>

            {/* 🔁 Conditionally render Login or Logout */}
            {!isLoggedIn ? (
              <button
                onClick={handleLoginClick}
                className="bg-[#FF6B35] text-white px-4 py-1 rounded-lg hover:bg-[#E05D2E] text-sm transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 text-sm transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
