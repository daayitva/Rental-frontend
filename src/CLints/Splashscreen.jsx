import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RentalHero() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + 1;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/home'), 500); // Redirect after animation
          return 100;
        }
        return newValue;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fixed-size animated circular progress */}
      <div className="relative w-[28rem] h-[28rem]">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          {/* Track */}
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2.5"
          />
          {/* Animated progress */}
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-8xl font-bold text-orange-500 tracking-tight">
            RENTAL
          </h1>
          {progress < 100 && (
            <p className="mt-2 text-lg text-gray-500 font-medium">
              Loading {progress}%
            </p>
          )}
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-orange-100 opacity-30 blur-xl"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-orange-200 opacity-20 blur-xl"></div>
      </div>
    </div>
  );
}
