import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import removeCardElem from '@/client/js/views/game/indianPocker/fns/common/removeCardElem.js';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd.js';

export default () => {
  // element | seeeion 체크
  const DREW_CHECK = window.sessionStorage.drewState;
  if (DREW_CHECK || DREW_CHECK === 'true') return;
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
  if (Number(COINS_PLAYER) > 0 && Number(COINS_ENEMY) > 0) return;
  const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
  if (!EXT_FIRST_BET) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 extFirstBet 세션이 없습니다.' });
  if (EXT_FIRST_BET === 'true') return;

  // 명령
  setTimeout(() => {
    if (EXT_FIRST_BET === 'false' && (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0)) {
      RULES.COMN();
      removeCardElem().then(() => {
        gameEnd();
      });
    }
  }, timeInterval_1);
};
