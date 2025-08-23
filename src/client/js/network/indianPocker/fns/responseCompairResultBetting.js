import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import socketNextStepEvent from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/socketNextStepEvent';
import againChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/againChoiceCard';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  console.log('_data ---------------- ', _data);

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
      throw throwObj('errorComn', 'select card compair error.');
    }
  } catch (error) {
    console.log('responseCompairResultBetting() error : ');
    errorManager(error, true);
  };
};
