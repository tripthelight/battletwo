import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
// import { pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import removeMyBetCoin from '@/client/js/views/game/indianPocker/fns/common/removeMyBetCoin';

export default (data) => {
  const ACTIVE_COIN = {
    host: 'player',
    index: data.activeLi,
    translateX: data.tx,
    translateY: data.ty,
    offsetLeft: reactiveState.pcOffsetLeft,
    offsetTop: reactiveState.pcOffsetTop,
    tm: data.tm,
    th: data.th,
  };
  let arr = [];
  if (window.sessionStorage.betCoin) {
    arr = JSON.parse(window.sessionStorage.betCoin);
  }
  arr.push(ACTIVE_COIN);
  // 칩 넣기
  const PLAYER_NUMB = dec(window.sessionStorage.getItem('coinsPlayer')) - 1;
  const PLAYER_COINS = enc(PLAYER_NUMB);
  storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
  storageMethod('s', 'SET_ITEM', 'coinsPlayer', PLAYER_COINS);
  storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host === 'player').length);

  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // if (window.sessionStorage.betState === 'extraBetting') {
  if (encryptVal1 === 'extraBetting') {
    if (window.sessionStorage.coinsPlayerExtBet) {
      storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) + 1);
    } else {
      storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 1);
    }
  };
  removeMyBetCoin({ coinsPlayer: PLAYER_NUMB, index: data.activeLi });
};
