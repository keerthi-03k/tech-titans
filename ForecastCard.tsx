import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay;
  isToday: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, isToday }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDateNumber = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white transition-all duration-300 hover:bg-white/25 hover:scale-105 border border-white/40 group shadow-xl">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg mb-1 text-white drop-shadow-sm">{formatDate(forecast.date)}</h3>
        {!isToday && (
          <p className="text-white text-sm font-semibold">{getDateNumber(forecast.date)}</p>
        )}
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {getWeatherIcon(forecast.day.condition.text)}
        </div>
        <p className="text-white text-sm font-bold mb-3">{forecast.day.condition.text}</p>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white drop-shadow-sm">{Math.round(forecast.day.maxtemp_c)}°</div>
          <div className="text-white text-sm font-semibold">{Math.round(forecast.day.mintemp_c)}°</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Rain</span>
          </div>
          <span className="text-sm font-bold text-white">{forecast.day.daily_chance_of_rain}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Wind</span>
          </div>
          <span className="text-sm font-bold text-white">{Math.round(forecast.day.maxwind_kph)} km/h</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-semibold">Humidity</span>
          <span className="text-sm font-bold text-white">{forecast.day.avghumidity}%</span>
        </div>

        <div className="pt-3 border-t border-white/40">
          <div className="flex justify-between text-xs text-white font-semibold">
            <span>☀️ {forecast.astro.sunrise}</span>
            <span>🌙 {forecast.astro.sunset}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;