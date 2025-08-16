import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import socketNextStepEvent from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/socketNextStepEvent';
import againChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/againChoiceCard';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    const { compair, result } = _data;

    if (
      compair &&
      ['start', 'end', 'tie'].includes(result)
    ) {
      // betUser, betUserFirst 검증 정상
      // 이 후 단계 진행
      LOADING_EVENT.show();
      if (result === 'start' || result === 'end') socketNextStepEvent();
      if (result === 'tie') againChoiceCard();
    } else {
      throw {
        message: 'local peer 선택 카드 비교 ERROR.',
        sendMsg: 'remote peer 선택 카드 비교 ERROR.',
      };
    }
  } catch (error) {
    console.log('responseCompairResultBetting() error : ');
    errorManager(error, true);
  };
};
