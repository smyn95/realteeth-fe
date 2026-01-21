const DEFAULT_LIMIT = 20;

/**
 * 검색어로 지역 목록을 필터링하는 순수 함수
 * @param query 검색어
 * @param districts 전체 지역 목록
 * @param limit 최대 결과 개수 (기본값: 20)
 */
export function searchDistricts(query: string, districts: string[], limit: number = DEFAULT_LIMIT): string[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const lowerQuery = trimmedQuery.toLowerCase();

  return districts.filter((district) => district.toLowerCase().includes(lowerQuery)).slice(0, limit);
}

/**
 * 지역 문자열을 표시용으로 변환 (- → 공백)
 * @param district 원본 지역 문자열 (예: "서울특별시-종로구-청운동")
 * @returns 표시용 문자열 (예: "서울특별시 종로구 청운동")
 */
export function formatDistrictName(district: string): string {
  return district.replace(/-/g, ' ');
}
