import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { GRS } from '@/client/js/module/crypts/generateRandomString';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import storageMethod from '@/client/js/module/storage/storageMethod';






export default (_num, _clickBtn) => {
  return new Promise((resolve, reject) => {
    try {
      // 공통 sessionStorage
      const encryptKey1 = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState

      // coins 관련 sessionStorage
      const encryptKey2 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
      const encryptKey4 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptKey5 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
      const encryptKey6 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet

      // card 관련 sessionStorage - coins 관련 sessionStorage 모두 사용됨
      const encryptKey7 =       findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]); // betResulting
      const encryptKey8 =       findCharCode([79, 76, 88, 84, 75, 65, 77, 73, 72, 86]); // drewFlipCardMode
      const encryptKey9 =       findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]); // drewReady
      const encryptKey10 =      findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]); // dropState
      const encryptKey11 =      findCharCode([90, 77, 71, 84, 65, 68, 87, 81, 70, 82]); // drewCardReady
      const encryptKey12 =      findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]); // playCardNum
      const encryptKey13 =      findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
      const encryptVal14 =      findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
      const encryptVal15 =      findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
      const encryptKey16 =      findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
      const encryptKey17 =      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
      const encryptKey18 =      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
      const encryptKey19 =      findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
      const encryptKey19_1 =    findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]); // betCoin : betState
      const encryptKey19_1_1 =  findCharCode([75, 66, 87, 81, 71, 77, 89, 83, 85, 69]); // betCoin : betState : end
      const encryptKey19_2 =    findCharCode([88, 79, 72, 75, 71, 83, 81, 85, 82, 84]); // betCoin : host
      const encryptKey19_2_1 =  findCharCode([87, 68, 88, 70, 85, 89, 73, 71, 86, 84]); // betCoin : host : player
      const encryptKey19_2_2 =  findCharCode([75, 69, 77, 85, 84, 73, 79, 66, 78, 86]); // betCoin : host : enemy
      const encryptKey19_3 =    findCharCode([77, 75, 87, 70, 82, 88, 83, 74, 89, 80]); // betCoin : index
      const encryptKey19_4 =    findCharCode([81, 80, 74, 86, 71, 77, 69, 90, 73, 79]); // betCoin : translateX
      const encryptKey19_5 =    findCharCode([76, 80, 65, 82, 87, 69, 78, 74, 83, 90]); // betCoin : translateY
      const encryptKey19_6 =    findCharCode([67, 69, 82, 79, 83, 88, 77, 84, 80, 75]); // betCoin : offsetLeft
      const encryptKey19_7 =    findCharCode([85, 84, 89, 75, 71, 81, 69, 65, 72, 83]); // betCoin : offsetTop
      const encryptKey20 =      findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
      const encryptKey20_1 =    findCharCode([66, 85, 87, 74, 79, 90, 86, 83, 72, 88]); // betCoinPos : host
      const encryptKey20_1_1 =  findCharCode([73, 87, 86, 82, 85, 84, 79, 68, 90, 66]); // betCoinPos : host : player
      const encryptKey20_1_2 =  findCharCode([89, 68, 86, 69, 84, 66, 77, 87, 65, 90]); // betCoinPos : host : enemy
      const encryptKey20_2 =    findCharCode([85, 75, 72, 69, 71, 66, 74, 81, 87, 84]); // betCoinPos : translateX
      const encryptKey20_3 =    findCharCode([80, 67, 90, 85, 82, 71, 70, 66, 84, 74]); // betCoinPos : translateY
      const encryptKey21 =      findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
      const encryptKey22 =      findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
      const encryptVal23 =      findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting

      if (_clickBtn === 'call' || _clickBtn === 'fold') {
        // 상대 카드번호 저장
        storageMethod('s', 'SET_ITEM', encryptKey12, _num); // playCardNum
      };

      const D = Object.create(null);

      if (_clickBtn === 'call') {
        D["GS"] =   storageMethod('s', 'GET_ITEM', encryptKey1);    // gameState
        D["CP"] =   storageMethod('s', 'GET_ITEM', encryptKey16);   // coinsPlayer
        D["BCP"] =  storageMethod('s', 'GET_ITEM', encryptKey20);   // betCoinPos
        D["BCPH"] = storageMethod('s', 'GET_ITEM', encryptKey20_1); // betCoinPos : host
        D["BCPX"] = storageMethod('s', 'GET_ITEM', encryptKey20_2); // betCoinPos : translateX
        D["BCPY"] = storageMethod('s', 'GET_ITEM', encryptKey20_3); // betCoinPos : translateY
        D["CE"] =   storageMethod('s', 'GET_ITEM', encryptKey4);    // coinsEnemy

        D["BU"] = storageMethod('s', 'GET_ITEM', encryptKey3); // betUser
        // 아직 결과를 보기 전이라 betUser 는 우선 false
        storageMethod('s', 'SET_ITEM',
          encryptKey3, // betUser
          X.enc(decodeTF(_t([]))) // "xobe" : false
        );

        D["EFB"] = storageMethod('s', 'GET_ITEM', encryptKey2); // extFirstBet
        // 첫 BETTING 단계는 지났음을 표시
        storageMethod('s', 'SET_ITEM',
          encryptKey2, // extFirstBet
          X.enc(decodeTF(_t([99, 109, 114, 117]))) // "cmru" : true
        );

        D["BC"] = storageMethod('s', 'GET_ITEM', encryptKey19); // betCoin
        // betCoin에 있는 betState를 end 로 변경
        storageMethod('s', 'SET_ITEM', encryptKey2,
          JSON.stringify(
            JSON.parse(D["BC"]).map(item => {
              item[encryptKey19_1] = encryptKey19_1_1; // betCoin의 betState -> end 로 변경
              return item;
            })
          )
        );

        // request "call" 로 상대 peer에게 보낼 data
        D["callSendData"] = {
          coinCount:  storageMethod('s', 'GET_ITEM', encryptKey16), // coinsPlayer
          coinBet:    storageMethod('s', 'GET_ITEM', encryptKey17), // coinsPlayerBet
          extBet:     storageMethod('s', 'GET_ITEM', encryptKey18), // coinsPlayerExtBet
        };

        // call 누른 PEER 는 자신의 추가 배팅 코인을 0 으로 만듬
        D["CPEB"] = storageMethod('s', 'GET_ITEM', encryptKey18); // coinsPlayerExtBet
        storageMethod('s', 'SET_ITEM', encryptKey18, 0); // coinsPlayerExtBet 를 0 으로 변경
      };

      resolve(D);
    } catch (error) {
      reject(error);
    }
  });
};
