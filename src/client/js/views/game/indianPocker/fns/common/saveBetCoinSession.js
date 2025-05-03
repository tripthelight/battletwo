import { timeInterval_1 } from '@/client/js/functions/variable';
import sendCoinsPlayer from '@/client/js/views/game/indianPocker/fns/common/sendCoinsPlayer';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';

export default (_host, _x, _y) => {
  setTimeout(() => {
    // 1) 마우스나 터치를 이용해서
    // 1) PLAYER BLOCK -> BETTING ZONE으로 올일 때 탐
    // 2) ENEMY의 배팅(기본, call, raise)을 받으면
    // 2) ENEMY BLOCK -> BETTING ZONE으로 내려올 때 탐
    // 3) PLAYER의 ALLIN 후 ENEMY의 올인 일 때
    // 3) ENEMY BLOCK -> BETTING ZONE으로 내려올 때 탐

    const POS_COIN = {
      host: _host,
      translateX: _x,
      translateY: _y,
    };
    let arr = [];
    if (window.sessionStorage.betCoinPos) {
      arr = JSON.parse(window.sessionStorage.betCoinPos);
    }
    arr.push(POS_COIN);
    window.sessionStorage.setItem('betCoinPos', JSON.stringify(arr));

    if (window.sessionStorage.betState === 'basicBetting') setTimeout(SET_BASIC_BETTING.betCoinStateAddEnd, timeInterval_1, _host);
    else setTimeout(sendCoinsPlayer, timeInterval_1);
  }, timeInterval_1);
};
