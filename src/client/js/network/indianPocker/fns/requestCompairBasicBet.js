import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { dec } from '@/client/js/module/crypts/obf8lower';
import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import { request } from '@/client/js/network/indianPocker/request';
import compairBoolStr from '@/client/js/functions/validation/compairBoolStr';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    const {
      p1, // remote betState
      p2: {
        decryptVal2, // remote betUser
        decryptVal3 // remote betUserFirst
      },
      p3, // remote basicBettingState
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
    const decryptVal4 = booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]) // betUser
    const decryptVal5 = booleanReturn([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]) // betUserFirst
    if (decryptVal4 !== decryptVal5) {
      throw throwObj('foul', 'basicBet - betUser/betUserFirst sessionStorage value compair failed.');
    };
    if (
      (
        (decryptVal2 && decryptVal3) &&
        (!decryptVal4 && !decryptVal5)
      ) ||
      (
        (!decryptVal2 && !decryptVal3) &&
        (decryptVal4 && decryptVal5)
      )
    ) {
      // betUser/betUserFirst 검증 정상
    } else {
      throw throwObj('foul', 'basicBet - betUser/betUserFirst compair failed.');
    };

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
  } catch (error) {
    console.log('requestCompairBasicBet.js error : ');
    errorManager(error, true);
  };
};
