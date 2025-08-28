/**
 * 주어진 문자 집합에서 랜덤하게 선택하여 지정된 길이의 문자열을 생성합니다.
 *
 * @param {Array<string|number>} chars - 사용할 문자들의 배열 (문자열 또는 숫자 가능).
 * @param {number} length - 생성할 문자열의 길이.
 * @returns {string} 랜덤하게 생성된 문자열.
 *
 * @example
 * generateRandomString(['e', 'w'], 4);   // 예: "ewwe"
 * generateRandomString(['e'], 3);        // 예: "eee"
 * generateRandomString(['w'], 6);        // 예: "wwwwww"
 * generateRandomString(['c', 'f'], 4);   // 예: "ffcf"
 * generateRandomString(['s', 'r', 2], 8); // 예: "s2rss2rs"
 */
// develoment mode
/*
function generateRandomString(chars, length) {
  const pool = chars.map(String); // 숫자도 문자열로 변환
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    result += pool[randomIndex];
  }
  return result;
};
*/
/**
 * 주어진 문자 집합에서 랜덤하게 선택해 지정 길이의 문자열을 만듭니다.
 * 성능 최적화: crypto.getRandomValues 사용(가능 시), O(n) 한 바퀴.
 *
 * @param {Array<string|number>} chars 사용할 문자(문자/숫자 혼합 가능). 예: ['s','r',2]
 * @param {number} length 생성할 길이(자연수)
 * @returns {string} 랜덤 문자열
 *
 * @example
 * GRS(['e','w'],4);   // 예: "ewwe"
 * GRS(['e'],3);       // 예: "eee"
 * GRS(['w'],6);       // 예: "wwwwww"
 * GRS(['c','f'],4);   // 예: "ffcf"
 * GRS(['s','r',2],8); // 예: "s2rss2rs"
 */
// product mode
export const GRS = (()=>{
  // ── 내부 이름 난독 & 단일 패스 로직 ─────────────────────────────────────────
  const $=typeof crypto<'u'&&crypto&&crypto.getRandomValues,          // 랜덤 소스 탐지
        _=(n)=>{                                                      // 난수 묶음 가져오기
          const a=new Uint32Array(n);
          return $? (crypto.getRandomValues(a),a)
                  : (/* 얇은 폴백 */(t=>{for(let i=0;i<n;i++) t[i]=(Math.random()*0x100000000)>>>0;})(a),a);
        };
  return (S,L)=>{
    // 입력 방어 (가벼운 연산만)
    (S&&L>=0)||(()=>{throw Error('args');})();

    // 문자 풀(한 번만 문자열화), 길이/모듈 사전 계산
    const p=(Array.isArray(S)?S:[S]).map(String), m=p.length|0, n=L|0;
    let r="";                                      // 결과 버퍼
    if((m|0)===0) return r;                        // 빈 풀 방어
    const R=_(n);                                  // 난수 덩어리 1회 생성

    // 단일 O(n) 루프: 모듈 인덱싱으로 바로 선택
    for(let i=0;i<n;i++){ r+=p[ R[i]%m ]; }
    return r;
  };
})();
