import storageMethod from '@/client/js/module/storage/storageMethod';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';

export default (data) => {
  const { num, clickBtn } = data;

  // 새로고침 시 상대 카드번호 필요하여 storage에 저장
  // 한 라운드가 끝난 후 삭제 필요
  storageMethod('s', 'SET_ITEM', 'playCardNum', num);

  if (clickBtn === 'call') {
    RULES.CALL();
  } else if (clickBtn === 'fold') {
    RULES.FOLD();
  }
};
