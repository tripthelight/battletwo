import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import betCoinsData from '@/client/js/views/game/indianPocker/fns/common/betCoinsData/betCoinsData';
import { obfuscateInt32 as o } from '@/client/js/module/crypts/encryptNumber';
import sendCoinsPlayer from '@/client/js/views/game/indianPocker/fns/common/sendCoinsPlayer';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';

export default (_host, _x, _y) => {
  // 1) 마우스나 터치를 이용해서
  // 1) PLAYER BLOCK -> BETTING ZONE으로 올일 때 탐
  // 2) ENEMY의 배팅(기본, call, raise)을 받으면
  // 2) ENEMY BLOCK -> BETTING ZONE으로 내려올 때 탐
  // 3) PLAYER의 ALLIN 후 ENEMY의 올인 일 때
  // 3) ENEMY BLOCK -> BETTING ZONE으로 내려올 때 탐

  const K = [
    findCharCode([66, 85, 87, 74, 79, 90, 86, 83, 72, 88]), // betCoinPos : host
    findCharCode([85, 75, 72, 69, 71, 66, 74, 81, 87, 84]), // betCoinPos : translateX
    findCharCode([80, 67, 90, 85, 82, 71, 70, 66, 84, 74]), // betCoinPos : translateY
  ];
  const KS = [
    findCharCode([89, 68, 86, 69, 84, 66, 77, 87, 65, 90]), // betCoinPos : host : enemy
  ];
  /* const POS_COIN = {
    host: _host,
    translateX: _x,
    translateY: _y,
  }; */
  const POS_COIN = betCoinsData(K,
    [
      KS[0], // host : enemy
      o(_x), // translateX
      o(_y), // translateY
    ]
  );
  let arr = [];
  // if (window.sessionStorage.betCoinPos) {
  //   arr = JSON.parse(window.sessionStorage.betCoinPos);
  // }
  const encryptKey3 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
  const encryptVal3 = storageMethod("s", "GET_ITEM", encryptKey3);
  if (encryptVal3 !== null && encryptVal3 !== "" && JSON.parse(encryptVal3).length > 0) {
    arr = JSON.parse(encryptVal3);
  }
  arr.push(POS_COIN);
  // storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(arr));
  storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(arr)); // betCoinPos

  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  // if (window.sessionStorage.betState === 'basicBetting') SET_BASIC_BETTING.betCoinStateAddEnd(_host);
  if (encryptVal1 === encryptKey2) SET_BASIC_BETTING.betCoinStateAddEnd(_host);
  else sendCoinsPlayer();
};
