import type { Coordinates } from "@/entities/location";

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type WeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type WeatherWind = {
  speed: number;
  deg: number;
};

export type WeatherResponse = {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: WeatherWind;
  name: string;
  dt: number;
  timezone: number;
  id: number;
};

export type Weather = {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  updatedAt: Date;
};
