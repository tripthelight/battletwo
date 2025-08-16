import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (res) => {
  /* const makeElegantSeq = (res) => {
    // P0(i): res=0 수열을 생성하는 9차 다항식 계수 (Horner form, 고정 상수)
    const P0 = [
      -43/90720,  641/40320,  -6401/30240,  811/576,
      -20629/4320, 42007/5760, -360317/90720, 15691/2016,
      -44203/2520, 79
    ];
    // Q(i): res=1일 때 P0(i)에 더해지는 9차 보정 다항식
    const Q = [
      -1117/362880, 1339/10080, -146479/60480, 1163/48,
      -2494489/17280, 83017/160, -98054039/90720, 292643/252,
      -585743/1260, -8
    ];

    const evalPoly = (coeffs, x) => coeffs.reduce((acc, c) => acc * x + c, 0);
    const r = res & 1; // 0/1만 반영
    return Array.from({ length: 10 }, (_, i) =>
      Math.round(evalPoly(P0, i) + r * evalPoly(Q, i))
    );
  }; */

  if (!Number.isInteger(res) || res < 0 || res > 9) {
    throw throwObj('errorComn', 'res Number failed.');
  }

  // D[i][k] = 위치 i의 k차 전진차분 Δ^k y_i(0)
  const D = [
    [ 79,  -8,  16,  -35,   77,  -159,  305,  -542,   879, -1256 ],
    [ 69,   4, -10,   24,  -53,   106, -191,   313,  -473,   676 ],
    [ 74,  16, -28,   34,  -40,    65, -140,   309,  -624,  1116 ],
    [ 78,  -8,  14,  -17,   11,    22, -126,   401, -1051,  2437 ],
    [ 73,   5,   1,   -3,    3,   -25,  130,  -430,  1101, -2406 ],
    [ 72,   8, -17,   32,  -45,    29,   68,  -333,   913, -2074 ],
    [ 77,   7, -14,   17,  -10,   -10,   29,     1,  -165,   552 ],
    [ 75,   8, -21,   50, -111,   240, -518,  1116, -2375,  4932 ],
    [ 88,  -2,  -9,   14,   -5,   -17,   41,   -42,   -33,   283 ],
    [ 84,  -9,  17,  -43,   96,  -186,  321,  -502,   709,  -858 ],
  ];

  // C(res, k) = res choose k
  const binoms = (r, n) => {
    const c = Array(n).fill(0);
    c[0] = 1;
    for (let k = 1; k < n; k++) c[k] = (c[k - 1] * (r - (k - 1))) / k;
    return c;
  };

  const C = binoms(res, 10); // [C(res,0)..C(res,9)]

  // a_i(res) = Σ_k C(res,k) * D[i][k]
  return Array.from({ length: 10 }, (_, i) =>
    Math.round(D[i].reduce((s, d, k) => s + C[k] * d, 0))
  );
};
