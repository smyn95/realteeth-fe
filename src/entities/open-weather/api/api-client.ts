const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const BASE_URL = 'https://api.openweathermap.org';

export type ApiError = {
  message: string;
  code?: number;
};

export async function request<T>(endpoint: string, params: Record<string, string | number> = {}, options?: RequestInit): Promise<T> {
  const searchParams = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  });

  const url = `${BASE_URL}${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    const error: ApiError = {
      message: '날씨 정보를 가져오는 중 오류가 발생했습니다.',
      code: response.status,
    };

    if (response.status === 401) error.message = '인증에 실패했습니다.';
    if (response.status === 429) error.message = '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';

    throw error;
  }

  return response.json() as Promise<T>;
}
