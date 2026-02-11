import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { GRS } from '@/client/js/module/crypts/generateRandomString';
// import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import storageMethod from '@/client/js/module/storage/storageMethod';

import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import buildNumber from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/buildNumber';
import toSvgPathsN from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/toSvgPathsN';
import buildT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/buildT';
import toSvgPathsT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/toSvgPathsT';
import findRemoteCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/findRemoteCard';
import cardCompare from '@/client/js/views/game/indianPocker/fns/common/compareCard/cardCompare';

/**
 * 새로고침을 대비해서 결과보기에 필요한 데이터를 미리 정의
 * @param {string} _num               상대에게 받은 내 카드 숫자 코드
 * @param {string} _clickBtn          call, fold, allin 중 하나
 * @param {string} _act               내가 눌렀으면 true, 상대에게 받은거면 false
 * @returns {Object<{string, any}>}   결과보기에 필요한 데이터들
 */
export default (_num, _clickBtn, _act) => {
  return new Promise(async (resolve, reject) => {
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
      const encryptKey7 =       findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]); // betResulting
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
      const encryptVal24 =      findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
      const encryptVal25 =      findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // cardNum

      // const insertBet = enc(encryptNumOfStr(GRS([_t([119]), _t([119])], parseInt(_t([50]))))); // ex) "ww" : 0
      // arr : [101, 101] -> "e", "e"
      // arr : [119, 119] -> "w", "w"
      // limt : 50 -> ASCII 2
      // limt : 51 -> ASCII 3
      // limt : 52 -> ASCII 4
      const insertBet = (arr, limt) => encryptNumOfStr(GRS(arr.map(t => _t([t])), parseInt(_t([limt]))));

      const D = [];

      if (_clickBtn === 'call') {
        // 첫 BETTING 단계는 지났음을 표시
        storageMethod('s', 'SET_ITEM',
          encryptKey2, // extFirstBet
          X.enc(decodeTF(_t([99, 109, 114, 117]))) // "cmru" : true
        );
        // 아직 결과를 보기 전이라 betUser 는 우선 false
        storageMethod('s', 'SET_ITEM',
          encryptKey3, // betUser
          X.enc(decodeTF(_t([120, 111, 98, 101, 97]))) // "xobea" : false
        );

        if (_act) {
          // call을 누른 PEER
          D.push(storageMethod('s', 'GET_ITEM', encryptKey1));  // gameState @ D[0]
          D.push(storageMethod('s', 'GET_ITEM', encryptKey16)); // coinsPlayer @ D[1]
          D.push(storageMethod('s', 'GET_ITEM', encryptKey20)); // betCoinPos @ D[2]
          D.push(encryptKey20_1);                               // betCoinPos : host @ D[3]
          D.push(encryptKey20_2);                               // betCoinPos : translateX @ D[4]
          D.push(encryptKey20_3);                               // betCoinPos : translateY @ D[5]
          D.push(storageMethod('s', 'GET_ITEM', encryptKey4));  // coinsEnemy @ D[6]
          D.push(storageMethod('s', 'GET_ITEM', encryptKey3)); // betUser @ D[7]
          D.push(storageMethod('s', 'GET_ITEM', encryptKey2)); // extFirstBet @ D[8]

          D.push(storageMethod('s', 'GET_ITEM', encryptKey19)); // betCoin @ D[9]
          // betCoin에 있는 betState를 end 로 변경
          storageMethod('s', 'SET_ITEM',
            encryptKey19, // betCoin
            JSON.stringify(
              JSON.parse(D[9]).map(item => {
                item[encryptKey19_1] = encryptKey19_1_1; // betCoin 의 betState -> end 로 변경
                return item;
              })
            )
          );

          // request "call" 로 상대 peer에게 보낼 data
          D.push([ // @ D[10]
            storageMethod('s', 'GET_ITEM', encryptKey16), // coinsPlayer @ D[10][0]
            storageMethod('s', 'GET_ITEM', encryptKey17), // coinsPlayerBet @ D[10][1]
            storageMethod('s', 'GET_ITEM', encryptKey18), // coinsPlayerExtBet @ D[10][2]
          ]);

          // call 누른 PEER 는 자신의 추가 배팅 코인을 0 으로 만듬
          D.push(storageMethod('s', 'GET_ITEM', encryptKey18)); // coinsPlayerExtBet @ D[11]
          // coinsPlayerExtBet 를 0 으로 변경
          storageMethod('s', 'SET_ITEM',
            encryptKey18, // coinsPlayerExtBet
            enc(insertBet([119, 119], 52)) // "ww" : 난독화 된 0
          );
        } else {
          // call을 받은 PEER
        }

        // #######################################################################
        // call 누른 PEER, call 받은 PEER 공통
        // GET_ROUND_END.receiveRoundEnd
        // #######################################################################
        // betResulting 을 true로 만듬
        storageMethod('s', 'SET_ITEM',
          encryptKey7, // betResulting
          X.enc(decodeTF(_t([115, 119, 104, 97]))) // "swha" : true
        );

        // drewFlipCardMode, drewReady, dropState 의 값을 삭제함
        storageMethod('s', 'REMOVE_VALUE', '', '', [
          encryptKey8, // drewFlipCardMode
          encryptKey9, // drewReady
          encryptKey10, // dropState
        ]);

        // drewCardReady 가 true면 drewCardReady 의 값을 삭제함
        const encryptVal11 = storageMethod('s', 'GET_ITEM', encryptKey11); // drewCardReady
        if (encryptVal11 !== null && encryptVal11 !== "" && X.dec(encryptVal11)) {
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            encryptVal11, // drewCardReady
          ]);
        };

        // removeBottomButtons 로 가서 drewState 가 true 면 LOADING hide 시킴
        D.push(storageMethod('s', 'GET_ITEM', encryptKey13)); // drewState @ D[12]

        // 서로의 card 비교 결과
        const {
          HASHES,
          N_PAYLOADS,
          T_SHAPE_SEED,
          T_SHAPE_PAYLOADS,
          T_CASE_PAYLOADS
        } = mergePayload();
        D.push([
          // NUMBER PATH D
          toSvgPathsN(buildNumber({ HASHES, N_PAYLOADS, nCode: _num })), // @ D[13][0]
          // T PATH D
          toSvgPathsT(buildT({ HASHES, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS, nCode: _num })), // @ D[13][1]
        ]);

        // 승/패/동 결과 -> false : 이김 / true : 짐 / 2 : 비김
        const result = await cardCompare(findRemoteCard(storageMethod('s', 'GET_ITEM', encryptVal24)), _num);
        D.push( // @ D[14]
          enc(encryptNumOfStr(
            _t(
              [
                [101, 119, 119, 101], // ewwe : 0 : 내가 이김
                [119, 101, 119, 98], // wewb : 1 : 내가 짐
                [119, 119, 101, 54], // wwe6 : 2 : 비김
              ][Number(result)]
            )
          ))
        );

        const RR = dec(D[14]);
        const WW = RR === 0; // 내가 이김
        const LL = RR === 1; // 내가 짐
        const DD = RR === 2; // 비김

        if (WW || LL) {
          // 내가 이기거나 졌으면 ———————————————
          // cardCompare에서 ——————————————————
          // drewState 의 값을 제거
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            encryptKey13, // drewState
          ]);

          // savsSessionResult 로 가서 —————————
          // coinsPlayerBet 의 값을 0으로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey17, // coinsPlayerBet
            enc(insertBet([101, 101], 50)) // "ee" : 난독화 된 0
          );
          // coinsEnemyBet 의 값을 0으로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey5, // coinsEnemyBet
            enc(insertBet([101, 119], 52)) // "ew" : 난독화 된 0
          );
          // coinsPlayerExtBet 의 값을 0으로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey18, // coinsPlayerExtBet
            enc(insertBet([119, 101], 52)) // "we" : 난독화 된 0
          );
          // coinsEnemyExtBet 의 값을 0으로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey6, // coinsEnemyExtBet
            enc(insertBet([119, 119], 52)) // "ww" : 난독화 된 0
          );
          // roundEnd 의 값을 true로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptVal15, // roundEnd
            X.enc(decodeTF(_t([107, 109, 114, 110]))) // "kmrn" : true
          );

          if (LL) {
            // 내가 짐
            // betUser 를 false로 만듬
            storageMethod('s', 'SET_ITEM',
              encryptKey3, // betUser
              X.enc(decodeTF(_t([120, 111, 98, 101, 97]))) // "dgvtu" : false
            );
            // "coinsEnemy" 를 "coinsEnemy"에 "coinsPlayerBet" 와 "coinsEnemyBet" 를 더한 값으로 변경
            storageMethod('s', 'SET_ITEM',
              encryptKey4, // coinsEnemy
              enc( // 숫자 난독화
                Number(dec(storageMethod('s', 'GET_ITEM', encryptKey4))) + // coinsEnemy 숫자 복호화
                (
                  Number(dec(storageMethod('s', 'GET_ITEM', encryptKey17))) + // coinsPlayerBet 숫자 복호화
                  Number(dec(storageMethod('s', 'GET_ITEM', encryptKey5))) // coinsEnemyBet 숫자 복호화
                )
              )
            );
          } else if (WW) {
            // 내가 이김
            // betUser 를 true 로 만듬
            storageMethod('s', 'SET_ITEM',
              encryptKey3, // betUser
              X.enc(decodeTF(_t([107, 102, 114, 97]))) // "kfra" : true
            );
            // "coinsPlayer" 를 "coinsPlayer"에 "coinsPlayerBet" 와 "coinsEnemyBet" 를 더한 값으로 변경
            storageMethod('s', 'SET_ITEM',
              encryptKey16, // coinsPlayer
              enc( // 숫자 난독화
                Number(dec(storageMethod('s', 'GET_ITEM', encryptKey16))) + // coinsPlayer 숫자 복호화
                (
                  Number(dec(storageMethod('s', 'GET_ITEM', encryptKey17))) + // coinsPlayerBet 숫자 복호화
                  Number(dec(storageMethod('s', 'GET_ITEM', encryptKey5))) // coinsEnemyBet 숫자 복호화
                )
              )
            );
          };

          // getWinnerCoin로 가서
          // roundResultDisplay > cardHideAnimation > cardHideAnimationComn
          // "battleCardNum" 을 빈문자열로 변경
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            encryptVal24, // battleCardNum
          ]);

          // BettingZoneMoveComnCallRaise > getWinnerCoinNext
          // "coinsPlayer" 와 "coinsEnemy" 의 key가 null이 아닌지 검증
          // TODO: 현재 코드에서 필요한 sessionStorage가 모두 있는지 검증은 미리 할 것
          // storageMethod('s', 'GET_ITEM', encryptKey16) // coinsPlayer
          // storageMethod('s', 'GET_ITEM', encryptKey4) // coinsEnemy

          // "betCoin" 의 값을 빈문자열로 변경
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            encryptKey19, // betCoin
            encryptKey20, // betCoinPos
          ]);

          // "basicBettingState" 의 값을 false로 변경
          storageMethod('s', 'SET_ITEM',
            encryptKey21, // basicBettingState
            X.enc(decodeTF(_t([120, 113, 108, 105, 97]))) // "xqlia" : false
          );

          // "betState" 를 "basicBetting" 으로 변경
          storageMethod('s', 'SET_ITEM',
            encryptKey22, // betState
            encryptVal23 // basicBetting
          );

          // goNextRound로 가서
          // "cardNum" 의 key가 이 null 인지 검증
          D.push(storageMethod('s', 'GET_ITEM', encryptVal25));  // cardNum @ D[15]

        } else if (DD) {
          // 비겼으면 ——————————————————————————
          // cardCompare에서 ———————————————————
          // "betUser"의 값을 "betUserFirst" 의 값으로 변경
          storageMethod('s', 'SET_ITEM',
            encryptKey3, // betUser
            storageMethod('s', 'GET_ITEM', encryptVal14) // betUserFirst value
          );
          // drewState 를 true 로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey13, // drewState
            X.enc(decodeTF(_t([107, 109, 114, 97]))) // "kmra" : true
          );
          // roundEnd 를 false 로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptVal15, // roundEnd
            X.enc(decodeTF(_t([106, 111, 108, 116, 97]))) // "jolta" : false
          );
          // extFirstBet 를 false 로 만듬
          storageMethod('s', 'SET_ITEM',
            encryptKey2, // extFirstBet
            X.enc(decodeTF(_t([120, 103, 98, 116, 117]))) // "xgbtu" : false
          );

          // getWinnerCoinNext로 가서
          // roundResultDisplay >
          // cardHideAnimation 으로 가서
          // "battleCardNum" 을 빈문자열로 변경
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            encryptVal24, // battleCardNum
          ]);
          // goNextRound 으로 가서
          // "cardNum" 의 key가 이 null 인지 검증
          D.push(storageMethod('s', 'GET_ITEM', encryptVal25));  // cardNum @ D[15]

          // STATE_PLAYING.drew로 이동
          // 현재는 drewFlipCardMode 의 값을 제거한 상태임
        };
      };

      resolve(D);
    } catch (error) {
      reject(error);
    }
  });
};
