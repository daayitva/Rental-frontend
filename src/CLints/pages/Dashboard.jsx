import React from 'react';
import {
  FiBell,
  FiSearch,
  FiFilter,
  FiMapPin,
  FiUser,
  FiHome,
  FiClipboard,
} from 'react-icons/fi';

const carData = [
  {
    brand: 'Audi',
    model: 'Q7 50 Quattro',
    rating: 4.5,
    fuel: '90L',
    transmission: 'Manual',
    capacity: '5 People',
    price: '$88/day',
    img: 'https://cdn.motor1.com/images/mgl/0ANZV/s3/2021-audi-q7.jpg',
  },
  {
    brand: 'BMW',
    model: 'X5 M Competition',
    rating: 4.7,
    fuel: '85L',
    transmission: 'Automatic',
    capacity: '5 People',
    price: '$95/day',
    img: 'https://cdn.motor1.com/images/mgl/6ZJjZ/s3/2023-bmw-x5-m-competition.jpg',
  },
  {
    brand: 'Lexus',
    model: 'RX 350',
    rating: 4.6,
    fuel: '72L',
    transmission: 'Automatic',
    capacity: '5 People',
    price: '$82/day',
    img: 'https://cdn.motor1.com/images/mgl/9Yq4G/s1/2023-lexus-rx-350.jpg',
  },
  {
    brand: 'Tesla',
    model: 'Model X',
    rating: 4.8,
    fuel: 'Electric',
    transmission: 'Automatic',
    capacity: '7 People',
    price: '$105/day',
    img: 'https://cdn.motor1.com/images/mgl/7MpAe/s3/2023-tesla-model-x.jpg',
  },
  {
    brand: 'Toyota',
    model: 'Land Cruiser',
    rating: 4.4,
    fuel: '110L',
    transmission: 'Automatic',
    capacity: '7 People',
    price: '$75/day',
    img: 'https://cdn.motor1.com/images/mgl/2ZqXe/s3/2021-toyota-land-cruiser-300.jpg',
  },
];

const brands = ['BMW', 'Audi', 'Lexus', 'Tesla', 'Toyota'];

export default function UserDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-lg font-semibold flex items-center gap-1 text-orange-600">
            <FiMapPin className="text-orange-500" /> New York, USA
          </p>
        </div>
        <div className="bg-white p-2 rounded-full shadow">
          <FiBell size={20} />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <div className="flex items-center bg-white p-2 rounded-lg flex-grow shadow">
          <FiSearch className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search car..." className="outline-none w-full" />
        </div>
        <div className="bg-orange-500 p-3 rounded-lg text-white">
          <FiFilter />
        </div>
      </div>

      {/* Top Brands */}
      <h2 className="font-bold text-lg mb-2">Top Brands</h2>
      <div className="flex gap-6 overflow-auto pb-2 mb-4">
        {brands.map((brand) => (
          <div key={brand} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <img src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`} alt={brand} className="w-8 h-8" />
            </div>
            <span className="text-sm mt-1">{brand}</span>
          </div>
        ))}
      </div>

      {/* Car Listings */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">Popular Cars</h2>
        <span className="text-orange-500 text-sm cursor-pointer">See All</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {carData.map((car, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 shadow relative"
          >
            <div className="absolute top-4 right-4 text-red-500">
              ❤
            </div>
            <img
              src={car.img}
              alt={car.model}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-base truncate">{car.brand} {car.model}</h3>
                <span className="text-sm text-yellow-500">⭐ {car.rating}</span>
              </div>
              <div className="flex gap-4 text-gray-500 text-sm my-2">
                <span>⛽ {car.fuel}</span>
                <span>⚙ {car.transmission}</span>
                <span>👤 {car.capacity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{car.price}</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 flex justify-around items-center rounded-t-xl">
        <FiHome size={24} className="text-orange-500" />
        <FiSearch size={24} className="text-gray-400" />
        <FiClipboard size={24} className="text-gray-400" />
        <FiUser size={24} className="text-gray-400" />
      </div>
    </div>
  );
}
