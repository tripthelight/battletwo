import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import basicBetInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/basicBetInit';
import { dec } from '@/client/js/module/crypts/obf8lower';

export const BASIC_BET_DATA_HANDLER = {
  // reload 했을 경우 모든 key가 있는지 먼저 체크
  storageKeyDeleteCheck(storageKeys) {
    let result = false;
    for (const key of storageKeys) {
      if (window.sessionStorage.getItem(key) === null) {
        result = true;
        break;
      };
    };
    return result;
  },
  // gameState : basicBet에서 reload 한 경우
  handleReload(storageKeys) {
    if (this.storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'basicBet delete sessionStorage.');
    };

    /**
     * betState 상태(basicBetting/extraBetting)
     * betUser true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
     * betUserFirst true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
     * 기본배팅(basicBettingState) 상태(true/false)
     * 내가 배팅한 코인 개수(coinsPlayer)
     * 내가 기본배팅하고 남은 코인 개수(coinsPlayerBet)
     * 내가 기본배팅한 개수(coinsPlayerExtBet)
     * 상대가 배팅한 코인 개수(coinsEnemy)
     * 상대가 기본배팅하고 남은 코인 개수(coinsEnemyBet)
     * 상대가 기본배팅한 개수(coinsEnemyExtBet)
     * TODO: betCoin, betCoinPos - gameState playing 에서 수정 후 이 단게에서 다시 확인 필요
     */
    // development mode *******************************
    /* // 키/값 정의만 모아서 DRY
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    if (encryptVal1 === null) throw throwObj('sessionStorageLoss', 'basicBet - betState sessionStorage key failed.');
    const encryptKey4 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    if (encryptVal4 === null) throw throwObj('sessionStorageLoss', 'basicBet - basicBettingState sessionStorage key failed.');
    const encryptKey5 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    if (encryptVal5 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsPlayer sessionStorage key failed.');
    const encryptKey6 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal6 = window.sessionStorage.getItem(encryptKey6);
    if (encryptVal6 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsPlayerBet sessionStorage key failed.');
    const encryptKey7 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal7 = window.sessionStorage.getItem(encryptKey7);
    if (encryptVal7 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsPlayerExtBet sessionStorage key failed.');
    const encryptKey8 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal8 = window.sessionStorage.getItem(encryptKey8);
    if (encryptVal8 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsEnemy sessionStorage key failed.');
    const encryptKey9 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal9 = window.sessionStorage.getItem(encryptKey9);
    if (encryptVal9 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsEnemyBet sessionStorage key failed.');
    const encryptKey10 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
    const encryptVal10 = window.sessionStorage.getItem(encryptKey10);
    if (encryptVal10 === null) throw throwObj('sessionStorageLoss', 'basicBet - coinsEnemyExtBet sessionStorage key failed.');

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // betState 상태(basicBetting/extraBetting)
    const BET_STATE_MAP = {
      // basicBetting -> true
      [findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65])]: X.enc(decodeTF(_t([99, 102, 114, 110]))), // "cfrn" : true
      // extraBetting -> false
      [findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89])]: X.enc(decodeTF(_t([106, 113, 98, 105, 97]))) // "jqbia" : false
    };
    // 매핑 실패 시 동일 에러 처리
    const tfDecoded = BET_STATE_MAP[encryptVal1];
    if (tfDecoded === undefined) {
      throw throwObj('sessionStorageLoss', 'basicBet - betState sessionStorage value failed.');
    };

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // betUser true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
    // betUserFirst true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
    const decryptVal2 = booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]) // betUser
    const decryptVal3 = booleanReturn([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]) // betUserFirst
    if (decryptVal2 !== decryptVal3) {
      throw throwObj('sessionStorageLoss', 'basicBet - betUser/betUserFirst sessionStorage value compair failed.');
    };

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // request params
    const params = {
      p1: X.dec(tfDecoded), // betState 상태 - true: basicBetting / false: extraBetting
      p2: {
        decryptVal2, // betUser
        decryptVal3 // betUserFirst
      },
      p3: encryptVal4 === '' ? '' : X.dec(encryptVal4), // basicBettingState 상태 - true / false / ''
      p4: {
        remote: {
          c1: encryptVal5 === '' ? '' : dec(encryptVal5), // coinsPlayer value number / ''
          c2: encryptVal6 === '' ? '' : dec(encryptVal6), // coinsPlayerBet value number / ''
          c3: encryptVal7 === '' ? '' : dec(encryptVal7), // coinsPlayerExtBet value number / ''
        },
        local: {
          c4: encryptVal8 === '' ? '' : dec(encryptVal8), // coinsEnemy value number / ''
          c5: encryptVal9 === '' ? '' : dec(encryptVal9), // coinsEnemyBet value number / ''
          c6: encryptVal10 === '' ? '' : dec(encryptVal10), // coinsEnemyExtBet value number / ''
        }
      }
    };

    request(
      _t([114, 101, 113, 117, 101, 115, 116, 67, 111, 109, 112, 97, 105, 114, 66, 97, 115, 105, 99, 66, 101, 116]),
      params
    ); */

    // product mode ***********************************
    const F = findCharCode, S = window.sessionStorage, T = throwObj, R = request, D = _t, B = booleanReturn, QE = decodeTF, ENC = X.enc, DEC = X.dec, DN = dec;

    // ─────────────────── 공통 게이트
    const G = (C, M) => { const k = F(C), v = S.getItem(k); if (v === null) throw T('sessionStorageLoss', M); return v };

    // ─────────────────── 키/값 회수 (개별 호출 → 루프 비용 회피)
    const v1  = G([70,77,80,88,87,86,83,89,75,65],  `basicBet - ${D([98, 101, 116, 83, 116, 97, 116, 101])} sessionStorage key failed.`);
    const v4  = G([81,69,77,72,75,67,73,87,79,74],  `basicBet - ${D([98, 97, 115, 105, 99, 66, 101, 116, 116, 105, 110, 103, 83, 116, 97, 116, 101])} sessionStorage key failed.`);
    const v5  = G([81,67,69,68,71,77,83,90,65,74],  `basicBet - ${D([99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114])} sessionStorage key failed.`);
    const v6  = G([88,79,86,74,72,80,71,70,69,77],  `basicBet - ${D([99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114, 66, 101, 116])} sessionStorage key failed.`);
    const v7  = G([70,90,79,67,88,77,69,82,84,81],  `basicBet - ${D([99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114, 69, 120, 116, 66, 101, 116])} sessionStorage key failed.`);
    const v8  = G([83,78,84,68,66,80,71,65,67,87],  `basicBet - ${D([99, 111, 105, 110, 115, 69, 110, 101, 109, 121])} sessionStorage key failed.`);
    const v9  = G([67,79,66,70,75,82,74,88,69,68],  `basicBet - ${D([99, 111, 105, 110, 115, 69, 110, 101, 109, 121, 66, 101, 116])} sessionStorage key failed.`);
    const v10 = G([80,73,68,65,90,69,88,86,82,67],  `basicBet - ${D([99, 111, 105, 110, 115, 69, 110, 101, 109, 121, 69, 120, 116, 66, 101, 116])} sessionStorage key failed.`);

    // ─────────────────── betState 해석 (키값 매핑 → 불린 난독 해제값 암호화)
    const M = {
      [F([70,84,75,87,74,67,73,77,80,65])]: ENC(QE(D([99,102,114,110]))),      // "basicBetting" → true
      [F([77,86,83,87,69,73,72,88,80,89])]: ENC(QE(D([106,113,98,105,97])))    // "extraBetting" → false
    };
    const tv = M[v1];
    if (tv === void 0) throw T('sessionStorageLoss', `basicBet - ${D([98, 101, 116, 83, 116, 97, 116, 101])} sessionStorage value failed.`);

    // ─────────────────── betUser / betUserFirst 일치성 검증
    const bU  = B([72,70,85,67,83,68,89,82,77,88]),  // betUser
          bUF = B([90,89,80,70,68,84,65,77,74,78]);  // betUserFirst
    if (bU !== bUF) throw T('sessionStorageLoss', `basicBet - ${D([98, 101, 116, 85, 115, 101, 114, 47, 98, 101, 116, 85, 115, 101, 114, 70, 105, 114, 115, 116])} sessionStorage value compair failed.`);

    // ─────────────────── 파라미터 구성 (삼항으로 분기 최소 연산)
    const P = {
      p1: DEC(tv),
      p2: { decryptVal2: bU, decryptVal3: bUF },
      p3: (v4 === '') ? '' : DEC(v4),
      p4: {
        remote: {
          c1: (v5  === '') ? '' : DN(v5),
          c2: (v6  === '') ? '' : DN(v6),
          c3: (v7  === '') ? '' : DN(v7)
        },
        local: {
          c4: (v8  === '') ? '' : DN(v8),
          c5: (v9  === '') ? '' : DN(v9),
          c6: (v10 === '') ? '' : DN(v10)
        }
      }
    };

    // ─────────────────── 요청 (문자 배열 해독)
    R(D([114,101,113,117,101,115,116,67,111,109,112,97,105,114,66,97,115,105,99,66,101,116]), P);
  },
  // gameState : basicBet에 처음 입장
  handleInitialLoad(storageKeys) {
    // 모든 sessionStorage key를 순회하면서 필요한 data insert
    for (const key of storageKeys) {
      const val = window.sessionStorage.getItem(key);
      if (val === null) {
        // sessionStorage에 key가 없을 경우 빈문자열 삽입
        storageMethod('s', 'SET_ITEM', key, '');
      } else {
        storageMethod('s', 'SET_ITEM', key, val);
      }
    }

    // basicBet 단계에서 필요한 data insert 후 다음 단계 진행
    basicBetInit();
  },
};
