// [min, max] 범위(둘 다 포함)에서 랜덤 정수 반환
// exclude가 [min, max] 안에 있으면 그 숫자만 제외하고 균등 추출
export default (min, max, exclude) => {
  // return Math.floor(Math.random() * (max - min + 1)) + min;

  // 균등 매핑: [min, max]에서 exclude 하나를 제거한 크기(span)로 뽑은 뒤 보정
  const span = max - min;                  // (max - min + 1) - 1
  const r = Math.floor(Math.random() * span); // 0..span-1
  const v = min + r;                       // min..max-1
  return v >= exclude ? v + 1 : v;         // exclude 건너뛰기
};
