import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import socketNextStepEvent from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/socketNextStepEvent';
import againChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/againChoiceCard';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { compair, result, person } = _data;

    if (compair) {
      // betUser, betUserFirst 검증 정상
      // 이 후 단계 진행
      LOADING_EVENT.show();
      if (result === 'start' || result === 'end') socketNextStepEvent();
      if (result === 'tie') againChoiceCard();
    } else {
      if (person === 'local') {
        // 내가 betUser sessionStorage 조작
        // 잘못된 접근입니다.
        errorManagement({ errCase: 'sessionStorageLoss', message: '내가 sessionStorage betUser data 조작' });
      } else if (person === 'remote') {
        // 상대가 betUser sessionStorage 조작
        errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUser data 조작' });
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'responseCompairResultBetting() 함수를 못탐' });
  });
};
