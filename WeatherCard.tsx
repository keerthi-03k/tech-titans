import React from 'react';
import { Thermometer, Wind, Droplets, Eye } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return '☀️';
    } else if (conditionLower.includes('cloud')) {
      return '☁️';
    } else if (conditionLower.includes('rain')) {
      return '🌧️';
    } else if (conditionLower.includes('snow')) {
      return '❄️';
    } else if (conditionLower.includes('thunder')) {
      return '⛈️';
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
      return '🌫️';
    }
    return '🌤️';
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-white transition-all duration-300 hover:bg-white/25 border border-white/40 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1 text-white drop-shadow-lg">{weather.location.name}</h2>
          <p className="text-white text-base font-semibold">{weather.location.region}, {weather.location.country}</p>
          <p className="text-white text-sm mt-1 font-medium">
            Last updated: {formatTime(weather.location.localtime)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-6xl mb-2">{getWeatherIcon(weather.current.condition.text)}</div>
          <p className="text-white text-sm font-bold">{weather.current.condition.text}</p>
        </div>
      </div>

      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-6xl font-light mb-2 text-white drop-shadow-lg">{Math.round(weather.current.temp_c)}°</div>
          <div className="flex items-center space-x-4 text-white">
            <span className="text-sm font-semibold">Feels like {Math.round(weather.current.feelslike_c)}°</span>
          </div>
        </div>
        <div className="text-right text-white">
          <p className="text-2xl font-light">{Math.round(weather.current.temp_f)}°F</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Wind className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Wind</span>
          </div>
          <p className="text-xl font-bold text-white">{Math.round(weather.current.wind_kph)} km/h</p>
          <p className="text-white text-xs font-semibold">{weather.current.wind_dir}</p>
        </div>

        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Humidity</span>
          </div>
          <p className="text-xl font-bold text-white">{weather.current.humidity}%</p>
        </div>

        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Thermometer className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Pressure</span>
          </div>
          <p className="text-xl font-bold text-white">{Math.round(weather.current.pressure_mb)}</p>
          <p className="text-white text-xs font-semibold">mb</p>
        </div>

        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Visibility</span>
          </div>
          <p className="text-xl font-bold text-white">{Math.round(weather.current.vis_km)}</p>
          <p className="text-white text-xs font-semibold">km</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;