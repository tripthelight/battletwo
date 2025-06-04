import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

import { errorManagement } from '@/client/js/module/errorManagement';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    if (_data.result) {
      // choiceCard 단계에서 필요한 data 검중 후 PASS 하면 다음 단계 진행
      drawPickCard();
      LOADING_EVENT.hide();
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
