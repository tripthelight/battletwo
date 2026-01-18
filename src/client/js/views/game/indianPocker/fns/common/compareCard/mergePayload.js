import { pack } from '@/client/js/module/splitArray';
import buildHashs from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildHashs';
import buildNumPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildNumPayload';
import createTShape from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTShape';
import createTCasePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTCasePayload';

export default (_c) => {
  const shuffleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // 0~9를 랜덤하게 shuffle
  const shuffled = shuffleArr.slice().reduceRight((arr, _, i) => {
    const j = (Math.random() * (i + 1)) | 0; // 0 ~ i
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
  }, shuffleArr.slice());
  // shuffle 된 순서대로 payload 정렬
  const shuffleStr = (arr) => pack(shuffled.map((n) => arr[n]));

  const { HASHES: HS } = buildHashs(_c); // card nums 와 매칭된 hash 배열의 마지막은 seed 임
  const { N_PAYLOADS: NP } = buildNumPayload(HS, _c, shuffleArr.length);
  const { T_SHAPE_PAYLOADS: TSP, T_SHAPE_SEED } = createTShape(HS);
  const { T_CASE_PAYLOADS: TCP } = createTCasePayload(HS, _c, shuffleArr.length);

  const HASHES = [
    ...shuffled.map((n) => HS[n]), // 0~9 재배열
    ...HS.slice(10), // 10~끝 유지
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
