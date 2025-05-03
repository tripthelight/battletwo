import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck.js';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins.js';
import drewCheckInfo from './drewCheckInfo.js';

export default () => {
  const DREW_CHECK = window.sessionStorage.drewState;
  if (!DREW_CHECK || DREW_CHECK !== 'true') return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .player-block 엘리먼트가 없습니다 11' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .player-card 엘리먼트가 없습니다 11' });
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .enemy-card 엘리먼트가 없습니다' });
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (COINS_ENEMY === undefined || COINS_ENEMY === null) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 coinsEnemy 세션이 없습니다' });
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (COINS_PLAYER === undefined || COINS_PLAYER === null) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 coinsPlayer 세션이 없습니다' });

  setTimeout(() => {
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    if (COINS_ENEMY_EXT_BET === undefined || COINS_PLAYER === null) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 coinsEnemyExtBet 세션이 없습니다' });
    const BET_USER = window.sessionStorage.betUser;
    if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 betUser 세션이 없습니다' });
    const BET_USER_FIRST = window.sessionStorage.betUserFirst;
    if (!BET_USER_FIRST) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 betUserFirst 세션이 없습니다' });

    const BET_USER_RES = BET_USER === 'true' ? true : BET_USER === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'betUser 세션이 true나 false가 아닙니다' });
    const BET_USER_FIRST_RES = BET_USER_FIRST === 'true' ? true : BET_USER_FIRST === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'betUserFirst 세션이 true나 false가 아닙니다' });

    if (BET_USER_FIRST_RES && !BET_USER_RES) return;
    if (!BET_USER_FIRST_RES && BET_USER_RES) return;

    if (Number(COINS_ENEMY_EXT_BET) === 0 && (Number(COINS_ENEMY) === 0 || Number(COINS_PLAYER) === 0)) {
      window.sessionStorage.setItem('drewFlipCardMode', true);
      ENEMY_CARD.classList.add('disabled');
      PLAYER_BLOCK.classList.remove('disabled');
      PLAYER_CARD.classList.add('drew-wait-card');
      setTimeout(() => {
        const BOTTOM_BUTTONS = PLAYER_BLOCK.querySelector('.bottom-buttons');
        if (BOTTOM_BUTTONS) BOTTOM_BUTTONS.remove();
        const COINS_PLAYER_EL = PLAYER_BLOCK.querySelector('.coins-player');
        if (COINS_PLAYER_EL) {
          COINS_PLAYER_EL.classList.remove('active');
          COINS_PLAYER_EL.classList.add('disabled');
          if (COINS_PLAYER_EL.childNodes && COINS_PLAYER_EL.childNodes.length > 0)
            [...COINS_PLAYER_EL.childNodes].map((item) => {
              item.style.removeProperty('animation-delay');
              return item;
            });
          setTimeout(pcDraggableCheck, timeInterval_1, 'coins-player', false);
          setTimeout(disabledMoveCoins, timeInterval_1);
        }
        setTimeout(drewCheckInfo, timeInterval_2);
      }, timeInterval_1);
    }
  }, timeInterval_1);
};
