import { transformCurrent, transformDaily } from '../lib/utils';
import type { OneCallCurrentResponse, OneCallDailyResponse, WeatherData } from '../model/types';
import { request } from './api-client';

type OneCallResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OneCallCurrentResponse;
  daily: OneCallDailyResponse[];
};

export async function fetchWeatherDetails(lat: number, lon: number): Promise<WeatherData> {
  const response = await request<OneCallResponse>('/data/3.0/onecall', {
    lat,
    lon,
    exclude: 'minutely,hourly,alerts',
  });

  return {
    current: transformCurrent(response.current, response.daily),
    daily: transformDaily(response.daily),
  };
}
