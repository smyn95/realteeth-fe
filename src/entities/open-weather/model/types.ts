export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Temp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

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
  pressure?: number;
  visibility?: number;
  clouds?: number;
};

export type Forecast = {
  date: string;
  dayName: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  pop: number;
  sunrise: number;
  sunset: number;
  humidity: number;
  windSpeed: number;
  uvi: number;
  temp: Temp;
  feelsLike: FeelsLike;
  rain?: number;
  snow?: number;
  summary?: string;
};

export type HourlyForecast = {
  time: string;
  dt: number;
  temp: number;
  icon: string;
  pop: number;
  description: string;
};

export type CurrentResponse = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
};

export type DailyResponse = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number;
  uvi: number;
  rain?: number;
  snow?: number;
};

export type HourlyResponse = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherCondition[];
  pop: number;
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
};
