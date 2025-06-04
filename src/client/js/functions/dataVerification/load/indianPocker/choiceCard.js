import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/communication/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export const CHOICE_CARD_DATA_HANDLER = {
  // reload 했을 경우 모든 key가 있는지 먼저 체크
  storageKeyDeleteCheck(storageKeys) {
    for (const key of storageKeys) {
      const value = window.sessionStorage.getItem(key);

      if (value === null) {
        const message = '새로고침 한 user가 sessionStorage 삭제함';
        errorManagement({ errCase: 'foul', message });
        request('opponentFouls', { message });
        break;
      }
    }
  },
  // gameState : choiceCard에서 reload 한 경우
  handleReload(storageKeys) {
    this.storageKeyDeleteCheck(storageKeys);

    // 같은 카드였던 상태에서 한명이 팝업 x 버튼 누르고 대기 상태 일 경우
    const encryptKey5 = findCharCode([[79, 88, 77, 84, 87, 86, 83, 69, 89, 73]]); // tieWait
    if (window.sessionStorage.getItem(encryptKey5) === 'true') {
      drawPickCard();
      LOADING_EVENT.show();
      return;
    }

    // player가 선택한 playerFirstNumber, 상대 peer가 선택한 enemyFirstNumber value를 변경했는지 체크하기 위해 보냄
    const encryptKey1 = storageKeys.find((item) => item === findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87])); // playerFirstNumber
    const encryptKey2 = storageKeys.find((item) => item === findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85])); // enemyFirstNumber
    // local, remote player 모두 선택 했을 때, betUser/betUserFirst 체크를 위해 보냄
    const encryptKey3 = storageKeys.find((item) => item === findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88])); // betUser
    const encryptKey4 = storageKeys.find((item) => item === findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78])); // betUserFirst

    const params = {
      encryptVal1: window.sessionStorage.getItem(encryptKey1),
      encryptVal2: window.sessionStorage.getItem(encryptKey2),
      encryptVal3: window.sessionStorage.getItem(encryptKey3),
      encryptVal4: window.sessionStorage.getItem(encryptKey4),
    };

    request('requestCompairChoiceCard', { remoteStorage: params });
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
