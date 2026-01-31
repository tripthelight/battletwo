import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
// import { pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import removeMyBetCoin from '@/client/js/views/game/indianPocker/fns/common/removeMyBetCoin';

export default (data) => {
  const ACTIVE_COIN = {
    host: 'player', // string
    index: data.activeLi, // number
    translateX: data.tx, // number
    translateY: data.ty, // number
    offsetLeft: reactiveState.pcOffsetLeft, // number
    offsetTop: reactiveState.pcOffsetTop, // number
    tm: data.tm, // number
    th: data.th, // number
  };
  let arr = [];
  // if (window.sessionStorage.betCoin) {
  //   arr = JSON.parse(window.sessionStorage.betCoin);
  // }
  const encryptKey1 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
  const encryptVal1_1 = storageMethod("s", "GET_ITEM", encryptKey1);
  if (encryptVal1_1 !== null && encryptVal1_1 !== "" && JSON.parse(encryptVal1_1).length > 0) {
    arr = JSON.parse(encryptVal1_1);
  }
  arr.push(ACTIVE_COIN);
  // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
  storageMethod('s', 'SET_ITEM', encryptKey1, JSON.stringify(arr)); // betCoin

  // 칩 넣기
  // const PLAYER_NUMB = dec(window.sessionStorage.getItem('coinsPlayer')) - 1;
  // const PLAYER_COINS = enc(PLAYER_NUMB);
  const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const decryptVal2_1 = dec(encryptVal2); // coinsPlayer value number
  const decryptVal2_2 = Number(decryptVal2_1) - 1;
  const decryptVal2_3 = enc(decryptVal2_2);
  const encryptKey3 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]);  // coinsPlayerBet

  // storageMethod('s', 'SET_ITEM', 'coinsPlayer', PLAYER_COINS);
  storageMethod('s', 'SET_ITEM', encryptKey2, decryptVal2_3); // coinsPlayer

  // storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host === 'player').length);
  const encryptVal1_2 = storageMethod("s", "GET_ITEM", encryptKey1);
  storageMethod('s', 'SET_ITEM',
    encryptKey3, // coinsPlayerBet
    // enc(JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host === 'player').length)
    enc(JSON.parse(encryptVal1_2).filter((coins) => coins.host === 'player').length)
  );

  const encryptKey4 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal3 = window.sessionStorage.getItem(encryptKey4);
  const encryptVal4 = findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89]); // extraBetting
  // if (window.sessionStorage.betState === 'extraBetting') {
  // betState === extraBetting
  if (encryptVal3 === encryptVal4) {
    const encryptKey5 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    // if (window.sessionStorage.coinsPlayerExtBet) {
    if (encryptVal5 !== '') {
      // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) + 1);
      storageMethod('s', 'SET_ITEM',
        encryptKey5, // coinsPlayerExtBet
        enc(Number(dec(encryptVal5)) + 1)
      );
    } else {
      // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 1);
      storageMethod('s', 'SET_ITEM',
        encryptKey5, // coinsPlayerExtBet
        enc(encryptNumOfStr(textDE([101, 119, 101, 114]))) // 'ewer' : 1
      );
    }
  };
  // removeMyBetCoin({ coinsPlayer: PLAYER_NUMB, index: data.activeLi });
  removeMyBetCoin({ coinsPlayer: decryptVal2_2, index: data.activeLi });
};
