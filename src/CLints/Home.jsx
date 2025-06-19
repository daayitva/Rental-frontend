import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRightLeft, 
  ChevronDown, 
  ChevronUp,
  Star,
  Car,
  Clock,
  Shield,
  Users,
  MapPin,
  DollarSign,
  CheckCircle,
  RefreshCw,
  Navigation,
  Award,
  FileText,
  Calendar
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ONE WAY');
  const [startDate, setStartDate] = useState(new Date('2025-06-18'));
  const [selectedTime, setSelectedTime] = useState('7:00 AM');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const popularCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Kochi', 'Goa'
  ];

  // Generate time slots from 12:00 AM to 11:45 PM in 15-minute intervals
  const timeSlots = Array.from({ length: 96 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const period = hours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  });

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeDropdown(false);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    if (!fromLocation || !toLocation) {
      alert('Please select both pickup and drop locations');
      return;
    }

    navigate('/carbooking', {
      state: {
        tripType: activeTab,
        fromLocation,
        toLocation,
        date: formatDate(startDate),
        time: selectedTime
      }
    });
  };

  const tabs = ['ONE WAY', 'ROUND TRIP', 'LOCAL', 'AIRPORT'];

  const appRatings = [
    { name: 'App Store', icon: '📱', rating: '4.2K+ Reviews', stars: 4.5 },
    { name: 'Google', icon: '🌐', rating: '6.1K+ Reviews', stars: 4.5 },
    { name: 'Play Store', icon: '📱', rating: '15.5K+ Reviews', stars: 4.5 }
  ];

  const features = [
    {
      icon: <Car className="w-5 h-5" />,
      title: 'Clean and',
      subtitle: 'Hygienic Car'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Transparent',
      subtitle: 'Billing'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Expert',
      subtitle: 'Chauffeurs'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: '2000+',
      subtitle: 'cities'
    }
  ];

  const services = [
    {
      title: 'ROUNDTRIP CABS',
      description: 'Premium roundtrip services with comfortable drives from your doorstep & back.',
      features: [
        { icon: <Users className="w-4 h-4" />, title: 'Expert', subtitle: 'Chauffeurs' },
        { icon: <Shield className="w-4 h-4" />, title: 'Safety', subtitle: 'Certified' },
        { icon: <RefreshCw className="w-4 h-4" />, title: 'Multiple', subtitle: 'Stops' }
      ],
      image: 'https://images.pexels.com/photos/7144186/pexels-photo-7144186.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'ONEWAY DROPS',
      description: '15 lakh+ one way routes at rock bottom rates across India.',
      features: [
        { icon: <Navigation className="w-4 h-4" />, title: '15 Lakh', subtitle: 'Routes' },
        { icon: <DollarSign className="w-4 h-4" />, title: 'Lowest', subtitle: 'Fares' },
        { icon: <CheckCircle className="w-4 h-4" />, title: 'All Inclusive', subtitle: 'Prices' }
      ],
      image: 'https://images.pexels.com/photos/7144265/pexels-photo-7144265.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'LOCAL RENTALS',
      description: 'Flexible hourly rentals for business meetings or shopping.',
      features: [
        { icon: <Clock className="w-4 h-4" />, title: 'Flexible', subtitle: 'Packages' },
        { icon: <Car className="w-4 h-4" />, title: 'Cab At Your', subtitle: 'Disposal' },
        { icon: <RefreshCw className="w-4 h-4" />, title: 'Multiple', subtitle: 'Stops' }
      ],
      image: 'https://images.pexels.com/photos/7144304/pexels-photo-7144304.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'AIRPORT TRANSFERS',
      description: 'Reliable airport transfers across all major airports.',
      features: [
        { icon: <Award className="w-4 h-4" />, title: 'Reliability', subtitle: 'Guaranteed' },
        { icon: <DollarSign className="w-4 h-4" />, title: 'Lowest', subtitle: 'Fares' },
        { icon: <Users className="w-4 h-4" />, title: 'Courteous', subtitle: 'Chauffeurs' }
      ],
      image: 'https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-700 min-h-[450px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/15676797/pexels-photo-15676797.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="show"
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              SERVICES ACROSS 2000+ CITIES
            </h1>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-5 max-w-4xl mx-auto"
            variants={slideUp}
            initial="hidden"
            animate="show"
          >
            {/* Tabs */}
            <div className="flex flex-wrap mb-4 bg-gray-100 rounded-md p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-[#FF6B35] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#FF6B35]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <div className="space-y-1 relative">
                <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">FROM</label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    onFocus={() => setShowFromDropdown(true)}
                    onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                    className="w-full pl-7 pr-2 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#FF6B35] focus:border-transparent"
                  />
                </div>
                {showFromDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                    {popularCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setFromLocation(city);
                          setShowFromDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">TO</label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Drop Location"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    onFocus={() => setShowToDropdown(true)}
                    onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                    className="w-full pl-7 pr-2 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#FF6B35] focus:border-transparent"
                  />
                  <button 
                    onClick={handleSwapLocations}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#FF6B35]"
                  >
                    <ArrowRightLeft className="w-3 h-3 cursor-pointer" />
                  </button>
                </div>
                {showToDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                    {popularCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setToLocation(city);
                          setShowToDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">DATE</label>
                <div className="relative">
                  <div 
                    className="w-full px-2 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#FF6B35] focus:border-transparent cursor-pointer flex items-center justify-between"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                  >
                    <span>{formatDate(startDate)}</span>
                    {showDatePicker ? (
                      <ChevronUp className="text-gray-400 w-3 h-3" />
                    ) : (
                      <ChevronDown className="text-gray-400 w-3 h-3" />
                    )}
                  </div>
                  {showDatePicker && (
                    <div className="absolute z-20 mt-1">
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        inline
                        className="border border-gray-300 rounded-md shadow-lg bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">TIME</label>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedTime}
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                    className="w-full px-2 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-[#FF6B35] focus:border-transparent cursor-pointer"
                    readOnly
                  />
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                </div>
                {showTimeDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <motion.button 
                className="bg-[#FF6B35] hover:bg-[#E05D2E] text-white font-medium py-2 px-6 rounded-md text-xs shadow-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
              >
                EXPLORE CABS
              </motion.button>
            </div>
          </motion.div>

          {/* Rating Badge */}
          <motion.div 
            className="text-center mt-4"
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
              <div className="flex items-center mr-1">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center mr-1">
                  <Star className="w-2 h-2 text-yellow-800 fill-yellow-800" />
                </div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-yellow-800 fill-yellow-800" />
                </div>
              </div>
              <span>India's Top Rated Car Rental Service</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Ratings */}
      <section className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {appRatings.map((app, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-3 hover:bg-[#FFF5F2] rounded-md transition-colors"
                  variants={item}
                >
                  <div className="text-2xl mb-1">{app.icon}</div>
                  <h3 className="font-medium text-xs mb-1">{app.name}</h3>
                  <StarRating rating={app.stars} />
                  <p className="text-gray-600 text-[10px] mt-1">({app.rating})</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-[#FFF5F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-[#FF6B35]">WHAT SETS CAR RENTAL APART?</h2>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-5 shadow-sm"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="text-center p-3 hover:bg-[#FFF5F2] rounded-md transition-colors"
                  variants={item}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 bg-[#FF6B35] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 text-[#FF6B35]">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-xs">{feature.title}</h3>
                  <p className="font-medium text-xs text-[#FF6B35]">{feature.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-6"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold text-[#FF6B35]">OUR SERVICES</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                variants={item}
                whileHover={{ y: -3 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="p-4 md:w-2/3">
                    <h3 className="text-sm font-bold text-[#FF6B35] mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-xs mb-3">{service.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {service.features.map((feat, featIndex) => (
                        <div key={featIndex} className="text-center">
                          <div className="w-8 h-8 bg-[#FFF5F2] rounded-full flex items-center justify-center mx-auto mb-1 text-[#FF6B35]">
                            {feat.icon}
                          </div>
                          <p className="text-[10px] font-medium">{feat.title}</p>
                          <p className="text-[10px] text-gray-500">{feat.subtitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 bg-[#FFF5F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <h2 className="text-xl font-bold text-[#FF6B35] mb-4">
                India's Largest Intercity and Local Cab Services
              </h2>
              <p className="text-gray-700 text-xs leading-relaxed mb-4">
                We are <strong> Car Rentals</strong>, an online cab booking aggregator, 
                providing customers with reliable and premium Intercity and Local car 
                rental services. Over the last decade, we are uniquely placed as the 
                largest chauffeur driven car rental company in India in terms of 
                geographical reach.
              </p>
            </motion.div>
            <motion.div variants={item}>
              <img 
                src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Car Interior"
                className="w-full rounded-lg shadow-sm"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Road Trip Section */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-xl font-bold text-[#FF6B35] mb-4"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Exploring India, one road trip at a time
          </motion.h2>
          
          <motion.div 
            className="space-y-4 text-gray-700 text-xs leading-relaxed"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={item}>
              To us, a road trip is one of the most exhilarating ways to travel the length and breadth of India. There's always something to look at, something to explore and to experience. Because we love travelling by road so much, we've been striving to make sure you have a great experience too.
            </motion.p>
            <motion.p variants={item}>
              We wanted more of you to go on a road trip, and more of you to experience the same joys of travel that we do. Instead of driving, why not sit back and take our <strong>chauffeur driven cabs</strong> on your next vacation?
            </motion.p>
            <motion.p variants={item}>
              We believe that the time you spend on your vacation should be entirely yours. So now, we are in <a href="#" className="text-[#FF6B35] hover:underline">2000+ cities across India</a> - to help you travel to wherever your heart desires.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Travel Services Section */}
      <section className="py-10 bg-[#FFF5F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-xl font-bold text-[#FF6B35] mb-4"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            No matter where you travel - we've got a cab for you
          </motion.h2>
          
          <motion.div 
            className="text-gray-700 text-xs leading-relaxed space-y-4"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.p variants={item}>
              Planning a weekend getaway? Our outstation cab services will help you explore the best destinations, visit all the must-see places and taste the best local food.
            </motion.p>
            <motion.p variants={item}>
              Did you just land at an airport or railway station closest to your destination? No problem! You can use our airport taxi, the transit pick up service to cover the last mile.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-gray-800">
              Trust us when we say: <strong className="text-[#FF6B35]">Travel begins with Car Rental</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;