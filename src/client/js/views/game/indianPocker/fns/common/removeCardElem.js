import { errorManagement } from '@/client/js/module/errorManagement';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock.js';
import BattingZoneMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveEnemyBlock.js';
import BettingZoneMoveComn from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComn.js';
import removeCardElemComn from '@/client/js/views/game/indianPocker/fns/common/removeCardElemComn.js';

export default () => {
  return new Promise((resolve, reject) => {
    const BET_USER = window.sessionStorage.betUser;
    if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 betUser 세션이 없습니다.' });
    const BET_USER_RES = BET_USER === 'true' ? true : BET_USER === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'betUser 세션이 true나 false가 아닙니다' });
    const BOTTOM_BUTTONS = document.querySelector('.bottom-buttons');
    const ENEMY_CARD = document.querySelector('.enemy-card');
    if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 .enemy-card 엘리먼트가 없습니다.' });
    const PLAYER_CARD = document.querySelector('.player-card');
    if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 .player-card 엘리먼트가 없습니다.' });
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
    if (Number(COINS_ENEMY) === 0) {
      BattingZoneMovePlayerBlock('win').then((_state) => {
        BettingZoneMoveComn(_state).then(() => {
          removeCardElemComn(ENEMY_CARD, PLAYER_CARD, BOTTOM_BUTTONS, BET_USER_RES).then(() => {
            window.sessionStorage.setItem('coinsPlayer', Number(window.sessionStorage.coinsPlayer) + 2);
            window.sessionStorage.setItem('coinsEnemy', 0);
            resolve();
          });
        });
      });
    } else if (Number(COINS_PLAYER) === 0) {
      BattingZoneMoveEnemyBlock('lose').then((_state) => {
        BettingZoneMoveComn(_state).then(() => {
          removeCardElemComn(ENEMY_CARD, PLAYER_CARD, BOTTOM_BUTTONS, BET_USER_RES).then(() => {
            window.sessionStorage.setItem('coinsEnemy', Number(window.sessionStorage.coinsEnemy) + 2);
            window.sessionStorage.setItem('coinsPlayer', 0);
            resolve();
          });
        });
      });
    }
  });
};
