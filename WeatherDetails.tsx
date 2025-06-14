import React from 'react';
import { Sun, Moon, Compass, Gauge, CloudRain, Zap } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherDetailsProps {
  weather: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-white' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-white' };
    if (uv <= 7) return { level: 'High', color: 'text-white' };
    if (uv <= 10) return { level: 'Very High', color: 'text-white' };
    return { level: 'Extreme', color: 'text-white' };
  };

  const uvInfo = getUVLevel(weather.current.uv);

  const detailItems = [
    {
      icon: <Sun className="w-5 h-5" />,
      label: 'UV Index',
      value: `${weather.current.uv} - ${uvInfo.level}`,
      color: 'text-white'
    },
    {
      icon: <Compass className="w-5 h-5" />,
      label: 'Wind Direction',
      value: `${weather.current.wind_degree}° ${weather.current.wind_dir}`,
      color: 'text-white'
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      label: 'Pressure',
      value: `${weather.current.pressure_mb} mb`,
      color: 'text-white'
    },
    {
      icon: <CloudRain className="w-5 h-5" />,
      label: 'Precipitation',
      value: `${weather.current.precip_mm} mm`,
      color: 'text-white'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Cloud Cover',
      value: `${weather.current.cloud}%`,
      color: 'text-white'
    },
    {
      icon: <Moon className="w-5 h-5" />,
      label: 'Wind Gust',
      value: `${Math.round(weather.current.gust_kph)} km/h`,
      color: 'text-white'
    }
  ];

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 text-white border border-white/40 shadow-2xl">
      <h3 className="text-xl font-bold mb-6 flex items-center text-white drop-shadow-lg">
        <span className="w-1 h-6 bg-white/80 rounded-full mr-3"></span>
        Weather Details
      </h3>
      
      <div className="space-y-4">
        {detailItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-white/15 rounded-xl hover:bg-white/20 transition-all duration-300 group border border-white/30 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-300 border border-white/30">
                <div className="text-white group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
              <span className="text-white font-bold">{item.label}</span>
            </div>
            <span className={`font-bold ${item.color} drop-shadow-sm`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/15 rounded-xl border border-white/30 shadow-lg">
        <h4 className="font-bold mb-3 text-white">Air Quality</h4>
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">Overall Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
            <span className="font-bold text-white">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;