import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { dec } from '@/client/js/module/crypts/obf8lower';
// import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import { request } from '@/client/js/network/indianPocker/request';
import compairBoolStr from '@/client/js/functions/validation/compairBoolStr';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    // development mode *******************************

    // 상대 peer가 playing result 결과 animation 중 새로고침하고 요청을 보냈을 경우 return;
    const encryptK1 = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    const decryptV1 = window.sessionStorage.getItem(encryptK1);
    const encryptK2 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
    if (decryptV1 !== encryptK2) return;

    const {
      p1, // remote betState
      p2: {
        decryptVal2, // remote betUser
        decryptVal3 // remote betUserFirst
      },
      p3, // remote basicBettingState TODO: betCoin, betCoinPos 수정되면 이 단계에서 비교 필요
      p4: {
        remote: {
          c1, // coinsEnemy value number
          c2, // coinsEnemyBet value number
          c3 // coinsEnemyExtBet value number
        },
        local: {
          c4, // coinsPlayer value number
          c5, // coinsPlayerBet value number
          c6 // coinsPlayerExtBet value number
        }
      }
    } = _data;
    // console.log('remote betState :::::::::::::::::::: ', p1 ? 'basicBetting' : 'extraBetting');
    // console.log('remote betUser ::::::::::::::::::::: ', decryptVal2);
    // console.log('remote betUserFirst :::::::::::::::: ', decryptVal3);
    // console.log('remote basicBettingState ::::::::::: ', p3);
    // console.log('coinsEnemy value number :::::::::::: ', c1);
    // console.log('coinsEnemyBet value number ::::::::: ', c2);
    // console.log('coinsEnemyExtBet value number :::::: ', c3);
    // console.log('coinsPlayer value number ::::::::::: ', c4);
    // console.log('coinsPlayerBet value number :::::::: ', c5);
    // console.log('coinsPlayerExtBet value number ::::: ', c6);

    // development mode *******************************
    // 키/값 정의만 모아서 DRY
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    if (encryptVal1 === null) throw throwObj('sessionStorageLoss', 'basicBet - betState sessionStorage key failed.');
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
    // betState 상태(basicBetting/extraBetting) 검증
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

    if (X.dec(tfDecoded) !== p1) {
      throw throwObj('foul', 'basicBet - betState compair failed.');
    };

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // betUser/betUserFirst 검증
    // betUser true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
    // betUserFirst true/false 상태 - choiceCard에서 높은 카드를 선택한 peer가 true
    const compairBetUser = compairBoolStr(decryptVal2, booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88])); // betUser
    const compairBetUserFirst = compairBoolStr(decryptVal3, booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78])); // betUserFirst

    if (compairBetUser || compairBetUserFirst) {
      const message = {
        bat: {
          user: '상대 betUser와 내 betUser 검증 실패',
          first: '상대 betUserFirst와 내 betUserFirst 검증 실패',
        },
      };

      function msgState(peer) {
        if (peer !== 'local' && peer !== 'remote') {
          throw throwObj('sessionStorageLoss', 'requestCompairBasicBet - select card parameter error.');
        }

        // peer에 따라 compair 메시지만 스왑
        const checks = [
          [() => compairBetUser, message.bat.user],
          [() => compairBetUserFirst, message.bat.first],
        ];

        for (const [cond, msg] of checks) {
          if (cond()) return msg;
        }
        return null; // 해당 없음
      }

      ['local', 'remote'].some(s => {
        const m = msgState(s);
        if (m) throw throwObj('foul', m);
        return false;
      });
    }

    /* if (
      (decryptVal4 === encryptVal_1 && decryptVal5 === encryptVal_2) ||
      (decryptVal4 === encryptVal_2 && decryptVal5 === encryptVal_1)
    ) {
      throw throwObj('foul', 'basicBet - betUser/betUserFirst sessionStorage value compair failed.');
    };
    if (
      (
        (decryptVal2 === encryptVal_1 && decryptVal3 === encryptVal_1) &&
        (decryptVal4 === encryptVal_2 && decryptVal5 === encryptVal_2)
      ) ||
      (
        (decryptVal2 === encryptVal_2 && decryptVal3 === encryptVal_2) &&
        (decryptVal4 === encryptVal_1 && decryptVal5 === encryptVal_1)
      )
    ) {
      // betUser/betUserFirst 검증 정상
    } else {
      throw throwObj('foul', 'basicBet - betUser/betUserFirst compair failed.');
    }; */

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // coinsPlayer 검증
    const decryptVal_1 = encryptVal5 === '' ? '' : dec(encryptVal5); // coinsPlayer number value
    if (c4 !== decryptVal_1) {
      throw throwObj('foul', 'basicBet - coinsPlayer compair failed.');
    };
    // coinsPlayerBet 검증
    const decryptVal_2 = encryptVal6 === '' ? '' : dec(encryptVal6); // coinsPlayerBet number value
    if (c5 !== decryptVal_2) {
      throw throwObj('foul', 'basicBet - coinsPlayerBet compair failed.');
    };
    // coinsPlayerExtBet 검증
    const decryptVal_3 = encryptVal7 === '' ? '' : dec(encryptVal7); // coinsPlayerExtBet number value
    if (c6 !== decryptVal_3) {
      throw throwObj('foul', 'basicBet - coinsPlayerExtBet compair failed.');
    };

    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // coinsEnemy 검증
    const decryptVal_4 = encryptVal8 === '' ? '' : dec(encryptVal8); // coinsEnemy number value
    if (c1 !== decryptVal_4) {
      throw throwObj('foul', 'basicBet - coinsEnemy compair failed.');
    };
    // coinsEnemyBet 검증
    const decryptVal_5 = encryptVal9 === '' ? '' : dec(encryptVal9); // coinsEnemyBet number value
    if (c2 !== decryptVal_5) {
      throw throwObj('foul', 'basicBet - coinsEnemyBet compair failed.');
    };
    // coinsEnemyExtBet 검증
    const decryptVal_6 = encryptVal10 === '' ? '' : dec(encryptVal10); // coinsEnemyExtBet number value
    if (c3 !== decryptVal_6) {
      throw throwObj('foul', 'basicBet - coinsEnemyExtBet compair failed.');
    };

    request(
      _t([114, 101, 115, 112, 111, 110, 115, 101, 67, 111, 109, 112, 97, 105, 114, 66, 97, 115, 105, 99, 66, 101, 116]), // responseCompairBasicBet
      { result: true }
    );


    // product mode ***********************************
    /*
    const {
      p1,
      p2: { decryptVal2: u, decryptVal3: v },
      p4: {
        remote: { c1, c2, c3 },
        local: { c4, c5, c6 },
      },
    } = _data;

    const S = findCharCode, T = _t, B = booleanReturn, E = X.enc, D = X.dec;
    const F = (t, m) => { throw throwObj(t, m); };
    const { sessionStorage: ss } = window;
    const gi = ss.getItem.bind(ss);
    const mt = T([98, 97, 115, 105, 99, 66, 101, 116]); // basicBet

    // 키 테이블(해당 순서 유지: betState, coinsPlayer, coinsPlayerBet, coinsPlayerExtBet, coinsEnemy, coinsEnemyBet, coinsEnemyExtBet)
    const KA = [
      [70, 77, 80, 88, 87, 86, 83, 89, 75, 65],
      [81, 67, 69, 68, 71, 77, 83, 90, 65, 74],
      [88, 79, 86, 74, 72, 80, 71, 70, 69, 77],
      [70, 90, 79, 67, 88, 77, 69, 82, 84, 81],
      [83, 78, 84, 68, 66, 80, 71, 65, 67, 87],
      [67, 79, 66, 70, 75, 82, 74, 88, 69, 68],
      [80, 73, 68, 65, 90, 69, 88, 86, 82, 67],
    ].map(S);

    // 값 일괄 취득(+ null 체크/예외 메시지 최소 노출)
    const NM = [
      [98, 101, 116, 83, 116, 97, 116, 101], // betState
      [99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114], // coinsPlayer
      [99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114, 66, 101, 116], // coinsPlayerBet
      [99, 111, 105, 110, 115, 80, 108, 97, 121, 101, 114, 69, 120, 116, 66, 101, 116], // coinsPlayerExtBet
      [99, 111, 105, 110, 115, 69, 110, 101, 109, 121], // coinsEnemy
      [99, 111, 105, 110, 115, 69, 110, 101, 109, 121, 66, 101, 116], // coinsEnemyBet
      [99, 111, 105, 110, 115, 69, 110, 101, 109, 121, 69, 120, 116, 66, 101, 116] // coinsEnemyExtBet
    ];
    const [v1, v5, v6, v7, v8, v9, v10] = KA.map((k, i) => {
      const r = gi(k);
      return r === null ? F('sessionStorageLoss', `${mt} - ${T(NM[i])} sessionStorage key failed.`) : r;
    });

    // betState 매핑( true/false 난독화 값과의 비교 )
    const M = {
      [S([70, 84, 75, 87, 74, 67, 73, 77, 80, 65])]: E(decodeTF(T([99, 102, 114, 110]))),   // "basicBetting" → true
      [S([77, 86, 83, 87, 69, 73, 72, 88, 80, 89])]: E(decodeTF(T([106, 113, 98, 105, 97]))), // "extraBetting" → false
    };
    const wb = M[v1];
    if (wb === undefined) F('sessionStorageLoss', `${mt} - ${T(NM[0])} sessionStorage value failed.`); // betState
    if (D(wb) !== p1)     F('foul', `${mt} - ${T(NM[0])} compair failed.`); // betState

    // betUser / betUserFirst (세션과 원격 불리언 정합성)
    const bu = B([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const bf = B([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
    const mf = T([98, 101, 116, 85, 115, 101, 114, 47, 98, 101, 116, 85, 115, 101, 114, 70, 105, 114, 115, 116]); // betUser/betUserFirst
    if (bu !== bf) F('foul', `${mt} - ${mf} sessionStorage value compair failed.`);
    // (u, v) 원격 / (bu, bf) 로컬 세션: (둘 다 true ↔ 둘 다 false) 패턴만 허용
    if (!(((u & v) === 1 && !(bu | bf)) || ((!(u | v)) && (bu & bf)))) {
      F('foul', `${mt} - ${mf} compair failed.`); // betUser/betUserFirst
    }

    // 숫자 디코드(빈문자 예외) + 일괄 비교
    const de = s => (s === '' ? '' : dec(s));
    const C = [
      [c4, de(v5),  NM[1]], // coinsPlayer
      [c5, de(v6),  NM[2]], // coinsPlayerBet
      [c6, de(v7),  NM[3]], // coinsPlayerExtBet
      [c1, de(v8),  NM[4]], // coinsEnemy
      [c2, de(v9),  NM[5]], // coinsEnemyBet
      [c3, de(v10), NM[6]], // coinsEnemyExtBet
    ];
    for (let i = 0; i < C.length; i++) {
      const [a, b, n] = C[i];
      if (a !== b) F('foul', `${mt} - ${T(n)} compair failed.`);
    }

    request(
      T([114,101,115,112,111,110,115,101,67,111,109,112,97,105,114,66,97,115,105,99,66,101,116]),
      { result: true }
    );
    */
  } catch (error) {
    errorManager(error, true);
  };
};
