import { pack } from '@/client/js/module/splitArray';
import buildHashs from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildHashs';
import buildNumPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildNumPayload';
import createTShape from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTShape';
import createTCasePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/createTCasePayload';

import fnv1a32 from '@/client/js/module/base64/fnv1a32';
import rand32 from '@/client/js/module/base64/rand32';
import buildPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildPayload';
import findPayloadPrivate from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findPayloadPrivate';
import buildCasePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildCasePayload';
import findTPayloadPrivate from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findTPayloadPrivate';

export default (_c) => {
  // ———————————————————————————————————————————————————————————
  // HASHS —————————————————————————————————————————————————————
  // ———————————————————————————————————————————————————————————
  const SEED = rand32();
  // const HASHES = [
  //   fnv1a32(_c, SEED),
  //   rand32(),
  //   rand32(),
  //   rand32(),
  //   SEED
  // ];

  const n = Math.floor(Math.random() * (14 - 4 + 1)) + 4;
  const HASHES = [];
  const IDX = Math.floor(Math.random() * (n + 1));
  Array.from({ length: n + 1 }, (_, i) => (i === IDX ? fnv1a32(_c, SEED) : rand32()))
    .reduce((acc, v) => (acc.push(v), acc), HASHES);
  HASHES.push(SEED);

  // ———————————————————————————————————————————————————————————
  // T SHAPE ———————————————————————————————————————————————————
  // ———————————————————————————————————————————————————————————
  const { T_SHAPE_PAYLOADS, T_SHAPE_SEED } = createTShape(HASHES);

  // ———————————————————————————————————————————————————————————
  // T PAYLOAD —————————————————————————————————————————————————
  // ———————————————————————————————————————————————————————————
  const { mode, recs } = findTPayloadPrivate(HASHES[IDX], HASHES[HASHES.length - 1]);

  return {
    HASHES,
    IDX,
    N_PAYLOADS: pack([ buildPayload(findPayloadPrivate(HASHES[IDX], HASHES[HASHES.length - 1]), HASHES[IDX]) ]),
    T_SHAPE_SEED,
    T_SHAPE_PAYLOADS: pack(T_SHAPE_PAYLOADS),
    T_CASE_PAYLOADS: pack([ buildCasePayload(mode, recs, HASHES[IDX]) ]),
  };
};
