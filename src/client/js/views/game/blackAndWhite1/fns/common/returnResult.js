import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';

/**
 * 0, 1, 2 정수를 받아서 해당하는 round result 문자를 리턴
 * @param {number} n 0("lose"), 1("win"), 2("drew")
 * @returns {string} "lose" | "win" | "drew"
 */
export default function (n) {
  switch (n) {
    case dec(enc(encryptNumOfStr(_t([101, 101, 101, 119, 119, 119, 119, 98])))): // "eeewwwwb" : 0 : lose
      return new TextDecoder().decode(new Uint8Array([108, 111, 115, 101])); // "lose"
    case dec(enc(encryptNumOfStr(_t([101, 101, 101, 119, 119, 119, 119, 119])))): // "eeewwwww" : 1 : win
      return new TextDecoder().decode(new Uint8Array([119, 105, 110])); // "win"
    case dec(enc(encryptNumOfStr(_t([119, 119, 119, 101, 101, 101, 101, 112])))): // "wwweeeep" : 2 : drew
      return new TextDecoder().decode(new Uint8Array([100, 114, 101, 119])); // "drew"
    default: break;
  };
}
