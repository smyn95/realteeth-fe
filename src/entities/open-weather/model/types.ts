export type Weather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  uvi: number;
  sunrise: number;
  sunset: number;
};

export type Forecast = {
  date: string;
  dayName: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  pop: number;
};

export type WeatherData = {
  current: Weather;
  daily: Forecast[];
};

// API RESPONSE TYPE
export type OneCallCurrentResponse = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
};

export type OneCallDailyResponse = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  humidity: number;
  wind_speed: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  pop: number;
  uvi: number;
};
