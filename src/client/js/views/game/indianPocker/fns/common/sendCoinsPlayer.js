import { dec } from '@/client/js/module/crypts/obf8lower';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import betStateCheck from '@/client/js/views/game/indianPocker/fns/common/betStateCheck';

export default () => {
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser

  // if (window.sessionStorage.betState === 'extraBetting' && window.sessionStorage.betUser === 'true') return betStateCheck();

  // if (encryptVal1 === 'extraBetting' && window.sessionStorage.betUser === 'true') return betStateCheck();
  if (
    encryptVal1 === 'extraBetting' &&
    encryptKey3 === encryptVal_1 // betUser === true
  ) return betStateCheck();
  // 기본 배팅일 때 만 탐
  const coinCount = dec(window.sessionStorage.getItem('coinsPlayer'));
  const betCount = Number(window.sessionStorage.getItem('coinsPlayerBet'));
  const originCount = coinCount + betCount;
  request('basicBetting', { coinCount, betCount, originCount });

  // if (window.sessionStorage.betState === 'basicBetting') setTimeout(betStateCheck, timeInterval_1);
  // if (encryptVal1 === encryptKey2) betStateCheck();
};
