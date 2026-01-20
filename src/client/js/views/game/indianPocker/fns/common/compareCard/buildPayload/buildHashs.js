import { publicCardNumbs as pucn } from '@/client/store/encryptionStore';
import rand32 from '@/client/js/module/base64/rand32';
import fnv1a32 from '@/client/js/module/base64/fnv1a32';

export default () => {
  const pu = pucn();
  const SEED = rand32(); // 공통 seed

  const n = Math.floor(Math.random() * (16 - 11 + 1)) + 11; // 11 ~ 16
  const HASHES = [];
  for (let i = 0; i < n; i++) {
    const isLast = i === n - 1; // 마지막
    const isHead = i < 10; // 실제 head hash
    if (isLast) {
      HASHES.push(SEED);
    } else if (isHead) {
      HASHES.push(fnv1a32(pu[i], SEED));
    } else {
      HASHES.push(rand32());
    }
  };
  return { HASHES };
};
