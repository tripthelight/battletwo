import INDIANPOCKER_RULES from '@/client/js/views/game/indianPocker/fns/rules/rules.js';
import PlayerBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/PlayerBlockMoveBattingZone.js';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock.js';
import BettingZoneMoveAllin from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveAllin.js';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import SOCKET_EVENT from '@/client/js/communication/indianPocker/batting/battingEvent';

export default () => {
  const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
  const AI_CEEB = COINS_ENEMY_EXT_BET && Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;
  let res = INDIANPOCKER_RULES.ALLIN().RES; // 내가 올일 할 수 있는 개수
  let resSend = INDIANPOCKER_RULES.ALLIN().RES_SEND; // 상대가 받는 올인 개수
  let resDelete = INDIANPOCKER_RULES.ALLIN().RES_DELETE; // 배팅존에서 빼야하는 내 코인 개수

  PlayerBlockMoveBattingZone(res, resSend, resDelete).then((_resultCoins) => {
    // console.log("PLAYER의 올인 모션 끝 :: ", _resultCoins);
    BattingZoneMovePlayerBlock(_resultCoins).then((_aiCoins) => {
      BettingZoneMoveAllin(_aiCoins).then((_aiCoinsRes) => {
        const COINS_PLAYER_RES = window.sessionStorage.coinsPlayer;
        const CP_RES = Number(COINS_PLAYER_RES) - _aiCoinsRes.ep + _aiCoinsRes.rc;
        const COINS_PLAYER_BET_RES = window.sessionStorage.coinsPlayerBet;
        const CPB_RES = COINS_PLAYER_BET_RES && Number(COINS_PLAYER_BET_RES) > 0 ? Number(COINS_PLAYER_BET_RES) : 0;
        window.sessionStorage.setItem('coinsPlayer', Number(CP_RES));
        window.sessionStorage.setItem('coinsPlayerBet', Number(CPB_RES) + _aiCoinsRes.ep - _aiCoinsRes.rc);
        window.sessionStorage.setItem('coinsPlayerExtBet', _aiCoinsRes.epeb);
        if (Number(window.sessionStorage.coinsPlayerBet) === Number(window.sessionStorage.coinsEnemyBet)) {
          // ENEMY 올인을 받고, PLAYER도 올인
          RULES.CALL();
        } else {
          // PLAYER의 첫 올인
          SOCKET_EVENT.SET.ALL_IN();
        }
      });
    });
  });
};
