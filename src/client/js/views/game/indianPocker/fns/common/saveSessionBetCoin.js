import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
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
  if (window.sessionStorage.betCoin) {
    arr = JSON.parse(window.sessionStorage.betCoin);
  }
  arr.push(ACTIVE_COIN);
  storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));

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
  storageMethod('s', 'SET_ITEM', encryptKey2, decryptVal2_3);

  // storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host === 'player').length);
  storageMethod('s', 'SET_ITEM',
    encryptKey3,
    enc(JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host === 'player').length)
  );

  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptVal3 = findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89]); // extraBetting
  // if (window.sessionStorage.betState === 'extraBetting') {
  // betState === extraBetting
  if (encryptVal1 === encryptVal3) {
    if (window.sessionStorage.coinsPlayerExtBet) {
      storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) + 1);
    } else {
      storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 1);
    }
  };
  // removeMyBetCoin({ coinsPlayer: PLAYER_NUMB, index: data.activeLi });
  removeMyBetCoin({ coinsPlayer: decryptVal2_2, index: data.activeLi });
};
