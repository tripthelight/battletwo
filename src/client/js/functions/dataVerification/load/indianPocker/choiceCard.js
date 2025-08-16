import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';

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
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
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

    // local, remote player 모두 선택 했을 때, betUser/betUserFirst 체크를 위해 보냄
    const params = {
      encryptVal1: selectCard.local,
      encryptVal2: selectCard.remote,
      encryptVal3: booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      encryptVal4: booleanReturn([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
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
