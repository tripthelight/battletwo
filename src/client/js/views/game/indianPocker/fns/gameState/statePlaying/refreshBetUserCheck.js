import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';

export default () => {
  // element | seeeion 체크
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (!ENEMY_CARD) return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return;
  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser 세션이 없습니다.' });
  const BAT_STATE = window.sessionStorage.betState;
  if (!BAT_STATE) return errorManagement({ errCase: 'errorComn', message: 'betState 세션이 없습니다.' });

  // 명령
  setTimeout(() => {
    if (BET_USER === 'true') {
      ENEMY_CARD.classList.add('disabled');
      PLAYER_BLOCK.classList.remove('disabled');
      COINS_PLAYER.classList.remove('disabled');

      // 다음 함수 실행
      if (BAT_STATE === 'basicBetting') {
        setTimeout(moveCoins, timeInterval_1);
      }
      if (BAT_STATE === 'extraBetting') {
        setTimeout(moveCoins, timeInterval_1);
        setTimeout(subtractMoveCoin, timeInterval_1);
        setTimeout(BTN_STATE.SHOW, timeInterval_2);
      }
    } else if (BET_USER === 'false') {
      ENEMY_CARD.classList.remove('disabled');
      PLAYER_BLOCK.classList.add('disabled');
      COINS_PLAYER.classList.add('disabled');

      // 다음 함수 실행
      setTimeout(disabledMoveCoins, timeInterval_1);
    } else {
      return errorManagement({ errCase: 'errorComn', message: 'betUser 세션이 true나 false가 아닙니다.' });
    }
    setTimeout(() => {
      LOADING_EVENT.hide();
    }, timeInterval_1);
  }, timeInterval_1);
};
