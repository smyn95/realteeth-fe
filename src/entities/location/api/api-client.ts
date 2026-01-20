const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY as string;
const KAKAO_BASE_URL = 'https://dapi.kakao.com';

export type ApiError = {
  message: string;
  code?: number;
};

export async function request<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const url = `${KAKAO_BASE_URL}${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Kakao API 요청 실패');
  }

  return response.json();
}
