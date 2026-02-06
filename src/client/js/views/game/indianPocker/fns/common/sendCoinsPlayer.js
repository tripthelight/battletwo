import storageMethod from '@/client/js/module/storage/storageMethod';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import betStateCheck from '@/client/js/views/game/indianPocker/fns/common/betStateCheck';

export default () => {
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  const encryptVal3 = storageMethod("s", "GET_ITEM", encryptKey3); // betUser
  const encryptVal2 = findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89]); // extraBetting

  // if (window.sessionStorage.betState === 'extraBetting' && window.sessionStorage.betUser === 'true') return betStateCheck();
  // betState === extraBetting && betUser === true
  // ================================================================
  // game state playing 추가 배팅 일 때
  // ================================================================
  console.log("betState === extraBetting =--==--= ", encryptVal1 === encryptVal2);
  console.log("betUser === true =--==--= ", X.dec(encryptVal3));

  if (
    encryptVal1 === encryptVal2 && // betState === extraBetting
    // encryptVal3 === encryptVal_1 // betUser === true
    X.dec(encryptVal3) // betUser === true
  ) return betStateCheck();

  // ================================================================
  // game state basicBetting 기본 배팅 일 때
  // ================================================================
  const encryptKey4 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
  // const coinCount = dec(window.sessionStorage.getItem('coinsPlayer'));
  const coinCount = dec(encryptVal4); // coinsPlayer value number

  const encryptKey5 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
  const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
  // const betCount = Number(window.sessionStorage.getItem('coinsPlayerBet'));
  const betCount = dec(encryptVal5);;

  const originCount = coinCount + betCount;
  request('basicBetting', { coinCount, betCount, originCount });

  // if (window.sessionStorage.betState === 'basicBetting') setTimeout(betStateCheck, timeInterval_1);
  // if (encryptVal1 === encryptKey2) betStateCheck();
};
