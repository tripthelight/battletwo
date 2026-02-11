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
 * @returns {Array<any>}   결과보기에 필요한 데이터들
 */
export default (_num, _clickBtn, _act) => {
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

      /** =====================================================================
       * 카드 비교 결과 로직
      */
      /*
      const {
        HASHES,
        N_PAYLOADS,
        T_SHAPE_SEED,
        T_SHAPE_PAYLOADS,
        T_CASE_PAYLOADS
      } = mergePayload();
      // NUMBER PATH D
      const NPD = toSvgPathsN(buildNumber({ HASHES, N_PAYLOADS, nCode: _num }));
      // T PATH D
      const TPD = toSvgPathsT(buildT({ HASHES, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS, nCode: _num }));
      */

      // 승/패/동 결과 -> false : 이김 | true : 짐 | 2 : 비김
      cardCompare(
        findRemoteCard(
          storageMethod('s','GET_ITEM', encryptVal24) // battleCardNum
        ),
        _num // 상대에게 받은 내 카드 숫자 코드
      )
      .then((_result) => {
        const result = enc(encryptNumOfStr(
          _t(
            [
              [101, 119, 119, 101], // ewwe : 0 : 내가 이김
              [119, 101, 119, 98], // wewb : 1 : 내가 짐
              [119, 119, 101, 54], // wwe6 : 2 : 비김
            ][Number(_result)]
          )
        ));
        const resultArr = ["내가 이김", "내가 짐", "비김"];
        console.log("result :::::::::::: ", resultArr[dec(result)]);

      });
      // ======================================================================

      if (_clickBtn === 'call') {
        if (_act) {
          // call을 누른 PEER
        } else {
          // call을 받은 PEER
        };

        const numCoin = (_k) => dec(storageMethod("s", "GET_ITEM", _k));

        console.log("coinsEnemy :::::::::::: ", numCoin(encryptKey4));
        console.log("coinsEnemyBet ::::::::: ", numCoin(encryptKey5));
        console.log("coinsEnemyExtBet :::::: ", numCoin(encryptKey6));
        console.log("coinsPlayer :::::::::::: ", numCoin(encryptKey16));
        console.log("coinsPlayerBet ::::::::: ", numCoin(encryptKey17));
        console.log("coinsPlayerExtBet :::::: ", numCoin(encryptKey18));

      };

      resolve(D);
    } catch (error) {
      reject(error);
    }
  });
};
