import { useLocationStore } from '@/shared';
import { useCallback, useEffect, useRef, useState } from 'react';

const GEOLOCATION_ERROR_MESSAGES = {
  NOT_SUPPORTED: '브라우저가 위치 정보를 지원하지 않습니다.',
  PERMISSION_DENIED: '위치 접근 권한이 거부되었습니다. 설정에서 허용해주세요.',
  POSITION_UNAVAILABLE: '현재 위치 정보를 사용할 수 없습니다.',
  TIMEOUT: '위치 정보 요청 시간이 초과되었습니다.',
  UNKNOWN: '위치 정보를 가져오는데 실패했습니다.',
} as const;

export function useGeolocation(autoDetect = false) {
  const { setCoordinates, coordinates } = useLocationStore();

  const [status, setStatus] = useState({
    isLoading: false,
    error: null as string | null,
  });

  const hasAutoDetected = useRef(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus({ isLoading: false, error: GEOLOCATION_ERROR_MESSAGES.NOT_SUPPORTED });
      return;
    }

    setStatus({ isLoading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const lat = Number(latitude.toFixed(2));
        const lon = Number(longitude.toFixed(2));

        setCoordinates({ lat, lon });

        setStatus({ isLoading: false, error: null });
      },
      (geoError) => {
        let message: string;
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            message = GEOLOCATION_ERROR_MESSAGES.PERMISSION_DENIED;
            break;
          case geoError.POSITION_UNAVAILABLE:
            message = GEOLOCATION_ERROR_MESSAGES.POSITION_UNAVAILABLE;
            break;
          case geoError.TIMEOUT:
            message = GEOLOCATION_ERROR_MESSAGES.TIMEOUT;
            break;
          default:
            message = GEOLOCATION_ERROR_MESSAGES.UNKNOWN;
        }

        setStatus({ isLoading: false, error: message });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [setCoordinates]);

  useEffect(() => {
    if (autoDetect && !hasAutoDetected.current && !coordinates) {
      hasAutoDetected.current = true;
      requestLocation();
    }
  }, [autoDetect, coordinates, requestLocation]);

  return {
    requestLocation,
    ...status,
  };
}
