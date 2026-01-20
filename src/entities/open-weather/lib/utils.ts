import type { Forecast, OneCallCurrentResponse, OneCallDailyResponse, Weather } from '../model/types';

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function formatTemperature(temp: number): string {
  return `${temp}°`;
}

export function formatWindSpeed(speed: number): string {
  return `${speed} m/s`;
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`;
}

export function capitalizeDescription(description: string): string {
  if (!description) return '';
  return description.charAt(0).toUpperCase() + description.slice(1);
}

// UV 지수 레벨 변환
export function getUviLevel(uvi: number): string {
  if (uvi <= 2) return '낮음';
  if (uvi <= 5) return '보통';
  if (uvi <= 7) return '높음';
  if (uvi <= 10) return '매우높음';
  return '위험';
}

// Unix timestamp → 시간 포맷 (HH:mm)
export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

// 강수 확률 포맷 (0~1 → 퍼센트)
export function formatPop(pop: number): string {
  return `${Math.round(pop * 100)}%`;
}

export function transformDaily(daily: OneCallDailyResponse[]): Forecast[] {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return daily.slice(1, 8).map((item) => {
    const dateObj = new Date(item.dt * 1000);
    const date = dateObj.toISOString().split('T')[0];

    return {
      date,
      dayName: dayNames[dateObj.getDay()],
      minTemp: Math.round(item.temp.min),
      maxTemp: Math.round(item.temp.max),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      pop: item.pop,
    };
  });
}

export function transformCurrent(current: OneCallCurrentResponse, daily: OneCallDailyResponse[]): Weather {
  const todayForecast = daily[0];

  return {
    temperature: current.temp,
    feelsLike: current.feels_like,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    description: current.weather[0].description,
    icon: current.weather[0].icon,
    tempMin: todayForecast.temp.min,
    tempMax: todayForecast.temp.max,
    uvi: current.uvi,
    sunrise: current.sunrise,
    sunset: current.sunset,
  };
}
