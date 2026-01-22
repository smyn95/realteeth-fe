import { transformCurrent, transformDaily, transformHourly } from '../lib/utils';
import type { CurrentResponse, DailyResponse, Forecast, HourlyForecast, HourlyResponse, Weather } from '../model/types';
import { request } from './api-client';

type OneCallResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentResponse;
  daily: DailyResponse[];
  hourly: HourlyResponse[];
};

type WeatherData = {
  current: Weather;
  daily: Forecast[];
  hourly: HourlyForecast[];
};

export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  const response = await request<OneCallResponse>('/data/3.0/onecall', {
    lat,
    lon,
    exclude: 'minutely, alerts',
  });

  const { current, daily, hourly } = response;

  return {
    current: transformCurrent(current, daily),
    daily: transformDaily(daily),
    hourly: transformHourly(hourly),
  };
}
