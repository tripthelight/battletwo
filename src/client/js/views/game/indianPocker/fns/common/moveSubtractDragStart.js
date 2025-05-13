import { errorManagement } from '@/client/js/module/errorManagement';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  const BET_COINS = Array.from(event.target.closest('ul').children);
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn' });
  reactiveState.mTargetIdx = BET_COINS.indexOf(event.target);
  event.dataTransfer.setData('Text', event.target.innerHTML);
};
