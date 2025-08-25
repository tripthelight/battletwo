import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import removeElement from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/removeElement';

export default () => {
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false

  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;

  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const encryptKey3 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
  const encryptKey4 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal4 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  const encryptKey5 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
  const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
  const encryptKey6 = findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]); // basicBetReady
  const encryptKey7 = findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]); // drewReady

  storageMethod('s', 'SET_ITEM', encryptKey4, encryptVal4); // betState, basicBetting
  storageMethod('s', 'SET_ITEM',
    encryptKey3, // extFirstBet
    X.enc(decodeTF(textDE([106, 111, 98, 116, 97]))) // "jobta" : false
  );

  storageMethod('s', 'REMOVE_ITEM', encryptKey7); // drewReady
  storageMethod('s', 'REMOVE_ITEM', encryptKey6); // basicBetReady

  // 무료 회원 - 첫 진입 시, 기본 배팅 20 코인
  // 유료 회원 - 첫 진입 시, 기본 배팅 금액 DB 조회 필요
  if (encryptVal1 === null && encryptVal2 === null) {
    storageMethod('s', 'SET_ITEM',
      encryptKey1,
      enc(encryptNumOfStr(textDE([101, 119, 114, 111]))) // 'ewro' : 20
    );
    storageMethod('s', 'SET_ITEM',
      encryptKey2,
      enc(encryptNumOfStr(textDE([119, 119, 98, 111]))) // 'wwbo' : 20
    );
  };

  if (
    encryptVal5 !== null &&
    encryptVal5 !== '' &&
    dec(encryptVal5) === encryptNumOfStr(textDE([119, 101, 101, 114])) // weer : 0001
  ) {
    storageMethod('s', 'SET_ITEM', 'basicBettingState', true);
  } else {
    storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
  };

  removeElement();
};
