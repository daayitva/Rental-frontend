import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ChevronDown, UserCheck, Receipt, Banknote } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const { selectedCar } = location.state || {};

  const [activeTab, setActiveTab] = useState('Inclusions');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: 'India (+91)',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        name: storedUser.name || '',
        email: storedUser.email || '',
        mobile: storedUser.mobile || '',
      }));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 text-sm">
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="text-xs text-gray-500">
            Home &gt; Select Car &gt; <span className="text-gray-700 font-medium">Booking</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-base font-semibold text-gray-800 border-b pb-2 mb-4 border-cyan-500">
                  Contact & Pickup Details
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-500 text-xs font-medium">
                        + Alt email
                      </button>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mobile</label>
                    <div className="flex">
                      <div className="relative">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => handleInputChange('countryCode', e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded-l px-3 py-2 pr-6 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-sm"
                        >
                          <option>India (+91)</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Pickup */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pickup</label>
                    <input
                      type="text"
                      value="Karnataka State Open University, Muktha Gangothri, Manasa Gangothri"
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
                    />
                  </div>

                  {/* Proceed */}
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded text-sm transition">
                    Proceed
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-cyan-500 text-white px-4 py-3 text-sm font-semibold">
                  Your Booking Details
                </div>

                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup City :</span>
                    <span className="font-medium">Mysore (Mysuru)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trip Type :</span>
                    <span className="font-medium">Local (8hr/80 km)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup Date :</span>
                    <span className="font-medium">22nd June 2025 at 7:00 AM</span>
                  </div>

                  {/* Selected Car */}
                  {selectedCar ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Car Type :</span>
                        <span className="font-medium">{selectedCar.name} or Equivalent</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Total Fare :</span>
                        <span className="font-bold text-base">₹ {selectedCar.finalPrice}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-red-500">No car selected</div>
                  )}
                </div>

                {/* Tabs */}
                <div className="border-t">
                  <div className="flex text-xs">
                    {['Inclusions', 'Exclusions', 'T&C'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 border-r last:border-r-0 ${
                          activeTab === tab
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 text-sm">
                    {activeTab === 'Inclusions' && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Banknote className="w-4 h-4 text-gray-500" />
                          <span>Base Fare and Fuel Charges</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <span>Driver Allowance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Receipt className="w-4 h-4 text-gray-500" />
                          <span>GST (5%)</span>
                        </div>
                      </div>
                    )}
                    {activeTab === 'Exclusions' && (
                      <div>Exclusions content would go here...</div>
                    )}
                    {activeTab === 'T&C' && (
                      <div>Terms and conditions content would go here...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Booking;
