import React, { useEffect, useState } from 'react';
import './styles/model.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VehicleModalForm = ({ onClose, vehicleToEdit, Role }) => {
  const navigate = useNavigate();

  const [vehicleData, setVehicleData] = useState({
    Email: '',
    vehicleType: '',
    make: '',
    model: '',
    purchaseYear: '',
    registrationNumber: '',
    identificationNumber: '',
    plateNumber: '',
    driverNumber: '',
    aadhar: '',
    licence: '',
    pricing: '',
    VehicleNumber: '',
    time: '',
    pricingCriteria: '',
    fuelType: '',
    photo: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const vehicleTypes = ["Car", "Bike", "Van", "Truck", "SUV"];
  const pricingOptions = ["hour", "day", "week", "month"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setVehicleData(prev => ({ ...prev, Email: storedEmail }));
    }
  }, []);

  useEffect(() => {
    if (vehicleToEdit) {
      setVehicleData(vehicleToEdit);
      if (vehicleToEdit.photo) {
        setPreviewImage(`http://localhost:10000/files/${vehicleToEdit.photo}`);
      }
    }
  }, [vehicleToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setVehicleData(prev => ({ ...prev, photo: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setVehicleData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(vehicleData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (vehicleToEdit && vehicleToEdit._id) {
        await axios.put(`http://localhost:10000/api/vehicles/updateVehicle/${vehicleToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Vehicle updated successfully!");
      } else {
        const res = await axios.post("http://localhost:10000/api/vehicles/addVehicle", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data === "Data Stored ") {
          alert("✅ Vehicle added successfully!");
        }
      }
      onClose();
      navigate(Role === "Admin" ? "/adminhome" : "/driverhome");
    } catch (error) {
      console.error("❌ Error submitting vehicle:", error);
      alert("Error saving vehicle. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{vehicleToEdit ? '✏️ Edit Vehicle' : '🚗 Rent New Vehicle'}</h3>
        <form onSubmit={handleSubmit} className="vehicle-form">
          <select 
            name="vehicleType" 
            value={vehicleData.vehicleType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>

          <input 
            name="make" 
            value={vehicleData.make} 
            onChange={handleChange} 
            placeholder="Make" 
            required 
          />
          <input 
            name="model" 
            value={vehicleData.model} 
            onChange={handleChange} 
            placeholder="Model" 
            required 
          />
          <input 
            type="number" 
            name="purchaseYear" 
            value={vehicleData.purchaseYear} 
            onChange={handleChange} 
            placeholder="Purchase Year" 
            required 
          />
          <input 
            name="registrationNumber" 
            value={vehicleData.registrationNumber} 
            onChange={handleChange} 
            placeholder="Registration Number" 
            required 
          />
          <input 
            name="identificationNumber" 
            value={vehicleData.identificationNumber} 
            onChange={handleChange} 
            placeholder="Identification Number" 
            required 
          />
          <input 
            name="plateNumber" 
            value={vehicleData.plateNumber} 
            onChange={handleChange} 
            placeholder="Plate Number" 
            required 
          />
          <input 
            name="driverNumber" 
            value={vehicleData.driverNumber} 
            onChange={handleChange} 
            placeholder="Driver Number" 
            required 
          />

          <label>Vehicle Photo</label>
          <input 
            type="file" 
            name="photo" 
            accept="image/*" 
            onChange={handleChange} 
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Vehicle Preview"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            />
          )}

          <input 
            name="aadhar" 
            value={vehicleData.aadhar} 
            onChange={handleChange} 
            placeholder="Aadhar Details" 
            required 
          />
          <input 
            name="licence" 
            value={vehicleData.licence} 
            onChange={handleChange} 
            placeholder="License Details" 
            required 
          />
          <input 
            type="number" 
            name="pricing" 
            value={vehicleData.pricing} 
            onChange={handleChange} 
            placeholder="Pricing (₹)" 
            required 
          />
          <input 
            type="number" 
            name="VehicleNumber" 
            value={vehicleData.VehicleNumber} 
            onChange={handleChange} 
            placeholder="Vehicle Count" 
            required 
          />
          <input 
            name="time" 
            value={vehicleData.time} 
            onChange={handleChange} 
            placeholder="Time Duration (e.g. 5 days)" 
            required 
          />

          <select 
            name="pricingCriteria" 
            value={vehicleData.pricingCriteria} 
            onChange={handleChange} 
            required
          >
            <option value="">Pricing Criteria</option>
            {pricingOptions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select 
            name="fuelType" 
            value={vehicleData.fuelType} 
            onChange={handleChange} 
            required
          >
            <option value="">Fuel Type</option>
            {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
          </select>

          <div className="modal-buttons">
            <button type="submit">{vehicleToEdit ? 'Update' : 'Submit'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModalForm;