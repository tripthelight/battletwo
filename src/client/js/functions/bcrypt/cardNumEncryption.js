import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 서버로부터 받은 NUM_1 ~ NUM_40 사이의 숫자 중 랜덤한 숫자를 받아서 1~10 까지의 숫자로 변경 된 idx를 받아서 cardNum hash를 리턴
 * @param {number} _idx  // 0 ~ 39중 랜덤한 숫자를 1~10사이로 변환한 숫자
 * @returns cardNum hash
 */
export default function (_idx) {
  try {
    // --- 은닉된 테이블 (각 항목은 원래 숫자배열을 바이트로 묶어 base64로 인코딩)
    const PACK = ['T0VKTklITUtYVA==', 'R0laRk5QVFNWSw==', 'T0NOTFRHTUZLUw==', 'REtIT1hNSVZFQQ==', 'UERCSVpVT0ZNSg==', 'S0ZPVURCUlpWSQ==', 'TUlQR1NIREFVRg==', 'U0pSV1RER1VYSA==', 'SEpaVVRPWEZRQQ==', 'SlJQRklHU0JETg=='];

    // --- 가벼운 해시로 인덱스 섞기(숫자 노출 없이 PACK 길이에만 의존)
    // 1-based 인덱스를 보존하면서 0-based로만 정규화(랩핑)
    const pickBin = (idx) => {
      const len = PACK.length;
      if (!Number.isFinite(idx)) throw new TypeError('index must be a finite number');
      const i0 = (((idx - 1) % len) + len) % len; // 1→0, 2→1, ..., 10→9
      return PACK[i0];
    };

    // --- base64 → 바이트코드(숫자배열) 복원
    const decodeCodes = (b64) => {
      const bin = typeof atob === 'function' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary'); // Node 환경 대비
      const out = new Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    };
    // --- 기존 로직에 투입할 함수 (조건문/숫자 노출 없음)
    const resultCode = (_index) => {
      const bin = pickBin(_index); // _index=2 → PACK[1] (두 번째)
      const codes = decodeCodes(bin);
      return findCharCode(codes);
    };

    // --- 나머지 원래 흐름
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw { message: 'cardNum length 0 - 2' };
    }

    const encryptCode = resultCode(_idx);
    console.log('encryptCode ########## ', encryptCode);

    const encryptKey = arrNumbs.find((item) => item === encryptCode);
    console.log('encryptKey ########## ', encryptKey);

    return bcrypt.hashSync(encryptKey.toString(), 3);
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', 'card number not crypt.');
  }
}
