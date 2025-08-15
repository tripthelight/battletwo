import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export const CHOICE_CARD_DATA_HANDLER = {
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
  // gameState : choiceCard에서 reload 한 경우
  handleReload(storageKeys) {
    if (this.storageKeyDeleteCheck(storageKeys)) {
      const message = (_peer) => `${_peer} player가 sessionStorage 삭제함`;
      throw {
        errCase: 'sessionStorageLoss',
        message: message('local'),
        sendMsg: message('remote')
      };
    };

    const selectCard = {
      remote: null,
      local: null,
    };
    // player가 선택한 playerFirstNumber, 상대 peer가 선택한 enemyFirstNumber value를 변경했는지 체크하기 위해 보냄
    const encryptKey1 = storageKeys.find((item) => item === findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87])); // playerFirstNumber
    if (encryptKey1) {
      const encryptVal = window.sessionStorage.getItem(encryptKey1);
      if (encryptVal !== '') {
        selectCard.local = cardNumDecryption(encryptVal);
      };
    };

    const encryptKey2 = storageKeys.find((item) => item === findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85])); // enemyFirstNumber
    if (encryptKey2) {
      const encryptVal = window.sessionStorage.getItem(encryptKey2);
      if (encryptVal !== '') {
        selectCard.remote = cardNumDecryption(encryptVal);
      };
    };

    console.log('betUser :::::::::: ', window.sessionStorage.getItem(findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88])));
    console.log('betUserFirst ::::: ', window.sessionStorage.getItem(findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78])));

    const decodeBool = (nums) => {
      const s = booleanCheck(nums);
      const BT = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]);  // true
      const BF = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
      if (s === BT) return BT !== BF; // true 난독화
      if (s === BF) return BT === BF; // false 난독화
    };
    // 코드 의미를 숨긴 불필요한 연산 섞기
    /* const decodeBool = (m) => (() => {
      // 문자열 생성기
      const _ = (a) => String.fromCharCode.apply(null, a);

      // "true" / "false" 원본 코드(직접 의미 노출 회피)
      const $ = [
        [69,67,72,65,74,68,73,80,66,75],     // t
        [70,74,89,84,79,75,88,87,85,78]      // f
      ].map(_);

      // 입력 디코딩
      const x = booleanCheck(m);

      // x와 t/f 일치 여부(불 키워드 없이 연산만으로 판정)
      const et = +!(x.localeCompare($[0]));  // x==t → 1, else → 0
      const ef = +!(x.localeCompare($[1]));  // x==f → 1, else → 0

      // t/f 둘 다 아니면 미정 처리
      if (!((et | ef) ^ 0)) return void 0;

      // 선택 인덱스: f면 1, t면 0
      const i = ef; // 0 or 1

      // 논리값 생성기(키워드 없이 항상 참/거짓 산출)
      const T = () => ((1|0) === 1);        // 항상 참
      const F = () => (((1<<4) & 1) === 1); // 항상 거짓(16&1=0)

      // 선택 실행
      return [T, F][i]();
    })(); */

    // local, remote player 모두 선택 했을 때, betUser/betUserFirst 체크를 위해 보냄
    const params = {
      encryptVal1: selectCard.local,
      encryptVal2: selectCard.remote,
      encryptVal3: decodeBool([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      encryptVal4: decodeBool([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
    };

    // 같은 카드였던 상태에서 내가 팝업 x 버튼 먼저 누르고 대기 상태 일 경우
    const bRes = booleanCheck([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
    if (bRes === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) { // true
      request('requestCompairChoiceCard', { remoteStorage: params, tieWait: true });
      return;
    }

    request('requestCompairChoiceCard', { remoteStorage: params, tieWait: false });
  },
  // gameState : choiceCard에 처음 입장
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

    // choiceCard 단계에서 필요한 data insert 후 다음 단계 진행
    drawPickCard();
    LOADING_EVENT.hide();
  },
};
