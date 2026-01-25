import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    const { result, tieWaitConfirmed } = _data;

    if (result) {
      // choiceCard 단계에서 필요한 data 검중 후 PASS 하면 다음 단계 진행
      drawPickCard();

      if (tieWaitConfirmed) {
        const encryptKey = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
        const encryptVal = window.sessionStorage.getItem(encryptKey);
        if (encryptVal === '') {
          // 같은 카드였던 상태에서 상대 peer가 팝업 x 버튼을 먼저 누르고 대기 상태 였던 경우
          LOADING_EVENT.hide();
        } else if (encryptVal !== '' && X.dec(encryptVal)) {
          // 같은 카드였던 상태에서 내가 팝업 x 버튼을 먼저 누르고 대기 상태 였던 경우
          LOADING_EVENT.show();
        };

      } else {
        LOADING_EVENT.hide();
      };
    };
  } catch (error) {
    errorManager(error, false);
  };
};
