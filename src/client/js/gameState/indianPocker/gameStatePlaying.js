import findCharCode from '@/client/js/functions/findCharCode';
// import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';
import { request } from '@/client/js/network/indianPocker/request';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
// import REFRESH_STATE_PLAYING from '@/client/js/refresh/indianpoker/refreshPlaying/refreshInit';
// import reload from '@/client/js/module/reload';

export default () => {
  // 이전 게임에서 FOLD 한 경우 playing 새로 진입 시 모두 제거
  // storageMethod('s', 'REMOVE_ITEM', 'coinsEnemyLocalFold');
  storageMethod('s', 'REMOVE_ARR', '', '', [
    findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), // coinsEnemyLocalFold
    findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), // coinsPlayerLocalFold
    findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), // coinsEnemyRemoteFold
    findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), // coinsPlayerRemoteFold
    findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), // foldUser
    findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86])  // foldState
  ]);

  LOADING_EVENT.show();

  const encryptKey1 = findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]); // betResulting
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  // X.enc(decodeTF(textDE([115, 102, 104, 97]))) // "sfha" : true

  console.log("betResulting -------> ", encryptVal1 !== null && encryptVal1 !== '' ? X.dec(encryptVal1) : 'null');


  if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) {
    // call / raise / allin 상태에서 새로고침
    // call 을 눌렀던 PEER 는 betResulting 이 true가 됨
    /**
     * 분기점
      - call 을 누르고 > 상대는 새로고침 안했고 > 내가 새로고침 했을 때 > 같은 카드였는가?
        - STATE_PLAYING.drew() 로 이동
     */
    console.log("call / raise / allin 상태에서 새로고침 ----------- ");
    // request(
    //   'remoteReloadBasicBet',
    //   [98, 97, 115, 105, 99, 66, 101, 116], // basicBet
    // );
  } else {
    STATE_PLAYING.main();
  }


  /* const BET_RESULTING = window.sessionStorage.betResulting;
  if (BET_RESULTING && BET_RESULTING === 'true') {
    // if (reload) {
    //   REFRESH_STATE_PLAYING.main();
    // }
  } else {
    // if (window.sessionStorage.drewState && window.sessionStorage.drewState === "true") return STATE_PLAYING.drew();
    STATE_PLAYING.main();
    LOADING_EVENT.show();
    // refresh event
    // if (reload) {
    //   REFRESH_STATE_PLAYING.main();
    // }
  } */

  /* setTimeout(() => {
    const BET_RESULTING = window.sessionStorage.betResulting;
    if (BET_RESULTING && BET_RESULTING === 'true') {
      if (reload) {
        REFRESH_STATE_PLAYING.main();
      }
    } else {
      // if (window.sessionStorage.drewState && window.sessionStorage.drewState === "true") return STATE_PLAYING.drew();
      console.log('여기를 탔다는 건데....');
      STATE_PLAYING.main();
      LOADING_EVENT.show();
      // refresh event
      setTimeout(() => {
        if (reload) {
          REFRESH_STATE_PLAYING.main();
        }
      }, 200);
    }
  }, timeInterval_1); */
};
