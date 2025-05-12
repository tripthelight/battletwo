import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
// import { pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import removeMyBetCoin from '@/client/js/views/game/indianPocker/fns/common/removeMyBetCoin';

export default (data) => {
  setTimeout(() => {
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
    const COINS_PLAYER = Number(window.sessionStorage.coinsPlayer) - 1;
    storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
    storageMethod('s', 'SET_ITEM', 'coinsPlayer', COINS_PLAYER);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', JSON.parse(window.sessionStorage.betCoin).filter((coins) => coins.host == 'player').length);

    if (window.sessionStorage.betState == 'extraBetting') {
      if (window.sessionStorage.coinsPlayerExtBet) {
        storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) + 1);
      } else {
        storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 1);
      }
    }
    setTimeout(removeMyBetCoin, timeInterval_1, { coinsPlayer: COINS_PLAYER, index: data.activeLi });
  }, timeInterval_1);
};
