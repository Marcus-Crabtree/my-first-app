"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user location from IP
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        const { city, latitude, longitude } = ipData;

        // Get weather data from Open-Meteo (no API key required)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=3`
        );
        const weatherData = await weatherResponse.json();

        // Map weather codes to conditions
        const getWeatherCondition = (code: number): string => {
          if (code === 0) return "Clear";
          if (code <= 3) return "Cloudy";
          if (code <= 67) return "Rainy";
          if (code <= 77) return "Snowy";
          if (code <= 82) return "Rainy";
          if (code <= 86) return "Snowy";
          return "Stormy";
        };

        const forecast = weatherData.daily.time.slice(0, 3).map((date: string, i: number) => ({
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round(weatherData.daily.temperature_2m_max[i]),
          condition: getWeatherCondition(weatherData.daily.weather_code[i])
        }));

        setWeather({
          location: city,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition: getWeatherCondition(weatherData.current.weather_code),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: Math.round(weatherData.current.wind_speed_10m),
          forecast
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load weather");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 bg-black/70 border-2 border-cyan-400/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.5)] min-w-40 sm:min-w-50">
        <div className="text-cyan-400 text-xs sm:text-sm animate-pulse">Loading weather...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 bg-black/70 border-2 border-red-400/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm shadow-[0_0_20px_rgba(239,68,68,0.5)] min-w-40 sm:min-w-50">
        <div className="text-red-400 text-xs sm:text-sm">{error || "Weather unavailable"}</div>
      </div>
    );
  }

  return (
    <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50 bg-black/80 border-2 border-cyan-400/60 rounded-lg p-3 sm:p-4 backdrop-blur-md shadow-[0_0_25px_rgba(34,211,238,0.6)] w-50 sm:w-70">
      {/* Location */}
      <div className="text-cyan-300 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
        <span className="text-sm sm:text-lg">📍</span>
        {weather.location}
      </div>

      {/* Current Weather */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-4">
        <div>
          <div className="text-3xl sm:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            {weather.temperature}°
          </div>
          <div className="text-cyan-200 text-xs sm:text-sm mt-0.5 sm:mt-1">{weather.condition}</div>
        </div>
        <div className="text-2xl sm:text-4xl">
          {weather.condition === "Clear" && "☀️"}
          {weather.condition === "Cloudy" && "☁️"}
          {weather.condition === "Rainy" && "🌧️"}
          {weather.condition === "Snowy" && "❄️"}
          {weather.condition === "Stormy" && "⛈️"}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2.5 sm:mb-4 text-[10px] sm:text-xs">
        <div className="bg-cyan-400/10 rounded p-1.5 sm:p-2 border border-cyan-400/30">
          <div className="text-cyan-400/70">Humidity</div>
          <div className="text-cyan-200 font-semibold">{weather.humidity}%</div>
        </div>
        <div className="bg-cyan-400/10 rounded p-1.5 sm:p-2 border border-cyan-400/30">
          <div className="text-cyan-400/70">Wind</div>
          <div className="text-cyan-200 font-semibold">{weather.windSpeed} mph</div>
        </div>
      </div>

      {/* Forecast */}
      <div className="border-t border-cyan-400/30 pt-2 sm:pt-3">
        <div className="text-cyan-400 text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2">3-Day Forecast</div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
          {weather.forecast.map((day, i) => (
            <div key={i} className="bg-cyan-400/10 rounded p-1.5 sm:p-2 text-center border border-cyan-400/30">
              <div className="text-cyan-300 font-semibold mb-0.5 sm:mb-1">{day.day}</div>
              <div className="text-white font-bold text-xs sm:text-sm">{day.temp}°</div>
              <div className="text-cyan-200/70 text-[9px] sm:text-[10px] mt-0.5 sm:mt-1">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
