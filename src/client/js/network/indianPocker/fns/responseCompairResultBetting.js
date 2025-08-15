import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import socketNextStepEvent from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/socketNextStepEvent';
import againChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/againChoiceCard';

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
        message: '선택 카드 비교 local ERROR.',
        sendMsg: '선택 카드 비교 remote ERROR.',
      };
    }
  } catch (error) {
    console.log('error : ', error);
    console.log('responseCompairResultBetting.js error : ');

    const { request } = await import('@/client/js/network/indianPocker/request');
    request('opponentFouls', { message: error?.sendMsg ?? 'remote player error' });

    const { default: eventHanlerErrorComn } = await import('@/client/js/module/eventHanlerErrorComn');
    const safe = error && typeof error === 'object' ? error : {};
    eventHanlerErrorComn({
      errCase: 'errorComn',
      errorDetails: error,
      ...safe,
    });
  };
};
