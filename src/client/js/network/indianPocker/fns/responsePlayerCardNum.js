import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';

export default (data) => {
  const { num, clickBtn } = data;

  const RULE_ACTIONS = {
    call: () => RULES.CALL(),
    fold: () => RULES.FOLD(),
    allin: () => RULES.ALLIN(),
  };

  if (clickBtn === 'call' || clickBtn === 'fold') {
    // 상대 카드번호 저장
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]), // playCardNum
      num
    );
  }

  // 해당 버튼에 대응하는 RULES 메서드가 있으면 실행
  const action = RULE_ACTIONS[clickBtn];
  if (action) {
    action();
  }
};
