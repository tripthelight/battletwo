import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import findCharCode from '@/client/js/functions/findCharCode';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import { request } from '@/client/js/network/indianPocker/request';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { result, tieWaitConfirmed } = _data;

    if (result) {
      // choiceCard 단계에서 필요한 data 검중 후 PASS 하면 다음 단계 진행
      drawPickCard();

      if (tieWaitConfirmed) {
        const bRes = booleanCheck([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
        if (bRes === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
          // 같은 카드였던 상태에서 내가 팝업 x 버튼을 먼저 누르고 대기 상태 였던 경우
          LOADING_EVENT.show();
        } else if (bRes === '') {
          // 같은 카드였던 상태에서 상대 peer가 팝업 x 버튼을 먼저 누르고 대기 상태 였던 경우
          LOADING_EVENT.hide();
        };

      } else {
        LOADING_EVENT.hide();
      }
    }
  }).catch((error) => {
    console.log('error : ', error);
    request('opponentFouls', { message: 'remote player error' });
    errorManagement({ errCase: 'errorComn', message: 'responseCompairChoiceCard() 함수를 못탐', errorDetails: error });
  });
};
