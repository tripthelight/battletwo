import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';
import playingEndData from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/playingEndData';

export default (data) => {
  const { num, clickBtn } = data;

  const RULE_ACTIONS = {
    call: () => RULES.CALL(),
    fold: () => RULES.FOLD(),
    allin: () => RULES.ALLIN(),
  };

  if (clickBtn === 'call' || clickBtn === 'fold') {
    // 내가 call / fold 누름 -> 상대에게 내 card num 받음
    // 상대 PEER에게서 card num을 알아냈음
    // TODO: 여기서 sessstorage 정의
    // 상대 카드번호 저장
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]), // playCardNum
      num
    );
  };

  playingEndData(num)
    .then((_data) => {
      //
    })
    .catch((error) => {
      errorManager(error, true);
    });

  // 해당 버튼에 대응하는 RULES 메서드가 있으면 실행
  const action = RULE_ACTIONS[clickBtn];
  if (action) {
    action();
  }
};
