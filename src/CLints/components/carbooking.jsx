import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { 
  Calendar, 
  Clock, 
  Star, 
  Shield, 
  Receipt, 
  ChevronDown,
  ChevronRight,
  Badge,
  Home,
  Phone
} from 'lucide-react';

const CarBooking = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const cars = [
    {
      id: '1',
      name: 'Wagon R',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      originalPrice: 2429,
      discountedPrice: 2123,
      finalPrice: 2123,
      savings: 306,
      distance: 'up to 149 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST']
    },
    {
      id: '2',
      name: 'Toyota Etios',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      originalPrice: 2479,
      discountedPrice: 2166,
      finalPrice: 2166,
      savings: 313,
      distance: 'up to 149 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST']
    },
    {
      id: '3',
      name: 'Ertiga',
      image: 'https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      originalPrice: 2959,
      discountedPrice: 2963,
      finalPrice: 2963,
      savings: 0,
      distance: 'up to 149 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      isLimitedOffer: true,
      surge: 4
    },
    {
      id: '4',
      name: 'Toyota Innova',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      originalPrice: 5005,
      discountedPrice: 4692,
      finalPrice: 4692,
      savings: 313,
      distance: 'up to 149 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST']
    },
    {
      id: '5',
      name: 'Toyota Innova Crysta',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      originalPrice: 5710,
      discountedPrice: 5710,
      finalPrice: 5710,
      savings: 0,
      distance: 'up to 149 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      unlockDiscount: 423
    }
  ];

  const toggleDetails = (carId) => {
    setShowDetails(showDetails === carId ? null : carId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      {/* Breadcrumb & Trip Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Select Car</span>
          </div>

          {/* Trip Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-900">
                Bangalore <ChevronRight className="w-5 h-5 inline mx-2" /> Mysuru (One way)
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg mr-4">
                  <Calendar className="w-4 h-4 text-gray-600 mr-2" />
                  <div>
                    <span className="text-xs text-gray-500 block">Pick up</span>
                    <span className="text-sm font-medium">20-06-2025</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-600 mr-2" />
                  <div>
                    <span className="text-xs text-gray-500 block">Time</span>
                    <span className="text-sm font-medium">7:00 AM</span>
                  </div>
                </div>
              </div>
              
              <button className="text-cyan-500 font-semibold hover:text-cyan-600 transition-colors">
                Modify
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Car List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {cars.map((car) => (
            <div 
              key={car.id} 
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Limited Offer Badge */}
              {car.isLimitedOffer && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Badge className="w-3 h-3 mr-1" />
                    LIMITED OFFER
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Car Image & Info */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 sm:w-32 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-500">or equivalent</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-3">
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                          <Star className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">Top Rated Cabs</span>
                          <span className="text-xs text-gray-500">& Chauffeurs</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                          <Receipt className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 block">Includes Toll,</span>
                          <span className="text-xs text-gray-500">State Tax & GST</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="lg:col-span-3">
                    <div className="text-center lg:text-left">
                      {car.savings > 0 && (
                        <div className="mb-2">
                          <span className="text-gray-400 line-through text-sm">₹{car.originalPrice}</span>
                          <span className="text-green-600 text-sm font-medium ml-2">
                            Save ₹{car.savings}
                          </span>
                        </div>
                      )}
                      
                      {car.surge && (
                        <div className="text-orange-600 text-sm font-medium mb-1">
                          ₹{car.originalPrice} Surged by ₹{car.surge}
                        </div>
                      )}
                      
                      <div className="text-3xl font-bold text-cyan-600 mb-1">
                        ₹{car.finalPrice}
                      </div>
                      <div className="text-sm text-gray-500">{car.distance}</div>
                      
                      <button 
                        onClick={() => toggleDetails(car.id)}
                        className="text-cyan-500 text-sm font-medium flex items-center justify-center lg:justify-start mt-2 hover:text-cyan-600 transition-colors"
                      >
                        Details 
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                          showDetails === car.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Select Button */}
                  <div className="lg:col-span-2">
                    <button 
                      onClick={() => setSelectedCar(car.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Select
                    </button>
                    
                    {car.unlockDiscount && (
                      <div className="mt-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs text-center font-medium">
                        Unlock +{car.unlockDiscount} Discount
                      </div>
                    )}
                    
                    {car.isLimitedOffer && (
                      <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                        BOOK NOW!
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable Details */}
                {showDetails === car.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Vehicle Features</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Air Conditioning</li>
                          <li>• GPS Navigation</li>
                          <li>• Music System</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Inclusions</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Fuel Cost</li>
                          <li>• Driver Allowance</li>
                          <li>• Toll & State Tax</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cancellation</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Free cancellation up to 1 hour before trip</li>
                          <li>• ₹250 cancellation fee thereafter</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-6">
              Our travel experts are available 24/7 to help you find the perfect car for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 090 4545 0000
              </button>
              <button className="flex items-center justify-center border border-cyan-500 text-cyan-500 hover:bg-cyan-50 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Shield className="w-5 h-5 mr-2" />
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CarBooking;