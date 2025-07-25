import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Phone,
  Send,
  User,
  MessageSquare
} from 'lucide-react';

const CarBooking = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const cars = [
    {
      id: '1',
      name: 'Hyundai i20',
      image: 'https://imgd.aeplcdn.com/0x0/n/cw/ec/44741/i20-exterior-right-front-three-quarter-2.jpeg',
      originalPrice: 3000,
      discountedPrice: 2700,
      finalPrice: 2700,
      savings: 300,
      distance: 'up to 150 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      rating: 4.5,
      trips: 120
    },
    {
      id: '2',
      name: 'Tata Nexon',
      image: 'https://imgd.aeplcdn.com/0x0/n/cw/ec/45629/nexon-exterior-right-front-three-quarter-3.jpeg',
      originalPrice: 3500,
      discountedPrice: 3200,
      finalPrice: 3200,
      savings: 300,
      distance: 'up to 150 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      rating: 4.7,
      trips: 98,
      isLimitedOffer: true
    },
    {
      id: '3',
      name: 'Kia Seltos',
      image: 'https://imgd.aeplcdn.com/0x0/n/cw/ec/46367/seltos-exterior-right-front-three-quarter-6.jpeg',
      originalPrice: 4000,
      discountedPrice: 4000,
      finalPrice: 4000,
      savings: 0,
      distance: 'up to 150 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      rating: 4.6,
      trips: 85,
      surge: 4
    },
    {
      id: '4',
      name: 'Toyota Innova',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      originalPrice: 5000,
      discountedPrice: 4700,
      finalPrice: 4700,
      savings: 300,
      distance: 'up to 150 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      rating: 4.8,
      trips: 75
    },
    {
      id: '5',
      name: 'Toyota Innova Crysta',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      originalPrice: 5700,
      discountedPrice: 5700,
      finalPrice: 5700,
      savings: 0,
      distance: 'up to 150 km',
      features: ['Top Rated Cabs & Chauffeurs', 'Includes Toll, State Tax & GST'],
      rating: 4.9,
      trips: 60,
      unlockDiscount: 500
    }
  ];

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDetails = (carId) => {
    setShowDetails(showDetails === carId ? null : carId);
  };

  const handleSelect = (carId) => {
    const selected = cars.find((car) => car.id === carId);
    setSelectedCar(selected);
    navigate('/booking', { state: { selectedCar: selected } });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const responses = [
        "I can help you choose the best car for your trip. What are you looking for?",
        "The Hyundai i20 is a great choice for comfort and fuel efficiency.",
        "For larger groups, I'd recommend the Toyota Innova.",
        "The Tata Nexon currently has a special limited-time offer!",
        "All our vehicles come with professional drivers and insurance coverage.",
        "You can modify your booking anytime up to 1 hour before pickup."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your travel expert. How can I help you choose the perfect car for your trip?",
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  useEffect(() => {
    if (showChat && messages.length === 0) {
      startNewChat();
    }
  }, [showChat]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">Select Car</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
              Bangalore <ChevronRight className="w-5 h-5 inline mx-2" /> Mysuru (One way)
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
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
              <button className="text-cyan-500 font-semibold hover:text-cyan-600">
                Modify
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow relative overflow-hidden">
              {car.isLimitedOffer && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Badge className="w-3 h-3 mr-1" />
                    LIMITED OFFER
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 flex items-center space-x-4">
                    <div className="w-28 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {car.rating} ({car.trips} trips)
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                        <Star className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Top Rated Cabs</span>
                        <span className="text-xs text-gray-500"> & Chauffeurs</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">Protection</span>
                        <span className="text-xs text-gray-500"> Included</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 text-center lg:text-left">
                    {car.savings > 0 && (
                      <div className="mb-1">
                        <span className="text-gray-400 line-through text-sm">₹{car.originalPrice}</span>
                        <span className="text-green-600 text-sm ml-2">Save ₹{car.savings}</span>
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
                      className="text-cyan-500 text-sm flex items-center mt-2 hover:text-cyan-600"
                    >
                      Details
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showDetails === car.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <div className="lg:col-span-2">
                    <button
                      onClick={() => handleSelect(car.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg"
                    >
                      Select
                    </button>

                    {car.unlockDiscount && (
                      <div className="mt-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs text-center font-medium">
                        Unlock +{car.unlockDiscount} Discount
                      </div>
                    )}

                    {car.isLimitedOffer && (
                      <button className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                        BOOK NOW!
                      </button>
                    )}
                  </div>
                </div>

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

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Our travel experts are available 24/7 to help you find the perfect car for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:09045450000" className="flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 090 4545 0000
              </a>
              <button
                onClick={() => setShowChat(true)}
                className="flex items-center justify-center border border-cyan-500 text-cyan-500 hover:bg-cyan-50 px-6 py-3 rounded-lg font-semibold"
              >
                <Shield className="w-5 h-5 mr-2" />
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Popup */}
      {showChat && (
        <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg w-80 z-50 flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b bg-cyan-600 text-white rounded-t-xl">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-2">
                <User className="w-4 h-4" />
              </div>
              <h4 className="font-semibold">Travel Expert</h4>
            </div>
            <button 
              onClick={() => setShowChat(false)} 
              className="text-white hover:text-cyan-200 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs p-3 rounded-lg ${message.sender === 'user' 
                    ? 'bg-cyan-500 text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-3 bg-gray-50 rounded-b-xl">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button 
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ''}
                className={`ml-2 p-2 rounded-full ${newMessage.trim() === '' 
                  ? 'text-gray-400' 
                  : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100'}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Our experts typically reply within 1 minute
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Floating Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        </button>
      )}
      
      <Footer />
    </div>
  );
};

export default CarBooking;