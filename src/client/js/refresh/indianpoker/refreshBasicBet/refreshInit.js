import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import refreshPlayerBasicBet from './refreshPlayerBasicBet.js';
import refreshEnemyBasicBet from './refreshEnemyBasicBet.js';

export default {
  main: () => {
    LOADING_EVENT.hide();
    // // player가 기본 배팅 했는지 체크
    // refreshPlayerBasicBet();
    // // enemy가 기본 배팅 했는지 체크
    // refreshEnemyBasicBet();
  },
};
