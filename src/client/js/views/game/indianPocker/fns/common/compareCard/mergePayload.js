import { pack } from '@/client/js/module/splitArray';
import buildHashs from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildHashs';
import buildNumPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildNumPayload';
import createTShape from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTShape';
import createTCasePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTCasePayload';

export default () => {
  // const shuffleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // shuffleArr : 0 ~ 9 사이의 정수가 랜덤하게 shuffle된 배열
  const shuffleArr = Array.from({ length: (0b0101 << 1) }, (_, i) => i).reduce((acc, x) => {
      const idx = Math.floor(Math.random() * (acc.length + 1));
      return [...acc.slice(0, idx), x, ...acc.slice(idx)];
    }, []);
  // shuffle 된 순서대로 payload 정렬
  const shuffleStr = (arr) => pack(shuffleArr.map((n) => arr[n]));

  const { HASHES: HS } = buildHashs(); // card nums 와 매칭된 hash 배열의 마지막은 seed 임
  const { N_PAYLOADS: NP } = buildNumPayload(HS, shuffleArr.length);
  const { T_SHAPE_PAYLOADS: TSP, T_SHAPE_SEED } = createTShape(HS);
  const { T_CASE_PAYLOADS: TCP } = createTCasePayload(HS, shuffleArr.length);

  const HASHES = [
    ...shuffleArr.map((n) => HS[n]), // 0~9 재배열
    // ...HS.slice(10), // 10~끝 유지
    ...HS.slice((0b0001 << 3) + 0b0010), // 10~끝 유지
  ];
  const N_PAYLOADS = shuffleStr(NP);
  const T_SHAPE_PAYLOADS = pack(TSP);
  const T_CASE_PAYLOADS = shuffleStr(TCP);

  // console.log('hash : ', HASHES);
  // console.log('number payload String : ', N_PAYLOADS);
  // console.log('T shape payload String : ', T_SHAPE_PAYLOADS);
  // console.log('T case payload String : ', T_CASE_PAYLOADS);

  return {
    HASHES,
    N_PAYLOADS,
    T_SHAPE_SEED,
    T_SHAPE_PAYLOADS,
    T_CASE_PAYLOADS,
  };
};
