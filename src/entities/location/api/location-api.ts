import type { Coordinates, LocationSearchResult } from '../model/types';
import { request } from './api-client';

type AddressDocument = {
  address_name: string;
  x: string;
  y: string;
  address?: {
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
};

type LocationApiResponse<T> = {
  documents: T[];
};

/**
 * 주소 -> 좌표 조회
 */
export async function getCoordinatesByLocation(address: string): Promise<Coordinates> {
  const data = await request<LocationApiResponse<AddressDocument>>('/v2/local/search/address.json', {
    query: address,
  });

  if (!data.documents[0]) {
    throw new Error('해당 장소의 정보를 찾을 수 없습니다.');
  }

  const { x, y } = data.documents[0];
  return { lat: Number(y), lon: Number(x) };
}

/**
 * 좌표 → 주소명 변환
 */
export async function getLocationNameByCoords(lat: number, lon: number): Promise<string> {
  const data = await request<LocationApiResponse<AddressDocument>>('/v2/local/geo/coord2address.json', {
    x: String(lon),
    y: String(lat),
  });

  const document = data.documents[0];
  if (!document?.address) {
    throw new Error('좌표에 해당하는 주소 정보가 없습니다.');
  }

  const { region_1depth_name, region_2depth_name, region_3depth_name } = document.address;

  return [region_1depth_name, region_2depth_name, region_3depth_name].filter(Boolean).join(' ');
}
