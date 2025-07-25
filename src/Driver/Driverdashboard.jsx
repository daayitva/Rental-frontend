import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleModalForm from './VehicleModelForm';
import VehicleDetailModal from './VehicleDetailModal';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DriverDashboard = () => {
  const [driverDetails, setDriverDetails] = useState({});
  const [rentedVehicles, setRentedVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem('email');

  useEffect(() => {
    if (!storedEmail) {
      console.warn('No email found in localStorage');
      navigate('/login');
      return;
    }

    fetchDriverDetails(storedEmail);
  }, [storedEmail]);

  const fetchDriverDetails = async (email) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const res = await axios.get(`http://localhost:10000/api/drivers/getDriverByEmail/${encodedEmail}`);

      // 🔥 Check if the response contains expected data
      if (res.data.driver) {
        setDriverDetails(res.data.driver);
        setRentedVehicles(res.data.vehicles || []);
      } else {
        console.warn('Driver data not found in response:', res.data);
      }
    } catch (err) {
      console.error('Error fetching driver details:', err);
    }
  };

  const fetchVehicles = async (email) => {
    await fetchDriverDetails(email);
  };

  const handleEdit = (vehicle) => {
    setVehicleToEdit(vehicle);
    setShowModal(true);
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:10000/api/drivers/deleteVehicle/${vehicleId}`);
      setRentedVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
  };

  const handleAddVehicle = () => {
    setVehicleToEdit(null);
    setShowModal(true);
  };

  const openVehicleDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const fullName = driverDetails.name || 'Driver';
  const email = driverDetails.email || '';
  const phoneNumber = driverDetails.mobile || '';

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Driver Dashboard</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAddVehicle}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Rent New Vehicle
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <p className="text-lg"><strong>Name:</strong> {fullName}</p>
        <p className="text-lg"><strong>Email:</strong> {email}</p>
        <p className="text-lg"><strong>Phone:</strong> {phoneNumber}</p>
      </div>

      {/* Vehicles */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Previously Rented Vehicles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentedVehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md">
              <figure className="relative">
                <img
                  src={
                    vehicle.photo
                      ? `http://localhost:10000/files/${vehicle.photo}`
                      : 'https://source.unsplash.com/400x200/?vehicle'
                  }
                  alt="Vehicle"
                  className="w-full h-48 object-cover"
                />
                <figcaption className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2 text-sm">
                  {vehicle.make} {vehicle.model}
                </figcaption>
              </figure>
              <div className="p-4">
                <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
                <p><strong>Price:</strong> ₹{vehicle.pricing} / {vehicle.pricingCriteria}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => openVehicleDetails(vehicle)}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex-1"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm flex-1 flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full text-sm flex-1 flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <VehicleModalForm
          onClose={() => {
            setShowModal(false);
            setVehicleToEdit(null);
            fetchVehicles(email);
          }}
          driverId={driverDetails._id}
          vehicleToEdit={vehicleToEdit}
          Role="Driver"
        />
      )}

      {showDetailModal && selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => {
            setSelectedVehicle(null);
            setShowDetailModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DriverDashboard;
