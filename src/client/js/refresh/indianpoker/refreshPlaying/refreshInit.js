import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';
import { request } from '@/client/js/communication/indianPocker/request';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';
import refreshDrewFlipCard from '@/client/js/refresh/indianpoker/refreshPlaying/refreshDrewFlipCard/refreshDrewFlipCard';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes.js';
import refreshEnemyNumber from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshEnemyNumber';

export default {
  main: () => {
    const BET_RESULTING = window.sessionStorage.betResulting;
    if (BET_RESULTING && BET_RESULTING === 'true') {
      const P_NUM = playerNumRes();
      const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
      if (!BATTLE_CARD_NUM) return;
      const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
      if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length < 1) return;
      const E_NUM = refreshEnemyNumber(BATTLE_CARD_ARR);

      if (Number(P_NUM) > Number(E_NUM) || Number(P_NUM) < Number(E_NUM)) {
        const coinsEnemyBet = window.sessionStorage.coinsEnemyBet;
        const coinsPlayerBet = window.sessionStorage.coinsPlayerBet;
        const coinsEnemyBetRes = coinsEnemyBet && Number(coinsEnemyBet) > 0;
        const coinsPlayerBetRes = coinsPlayerBet && Number(coinsPlayerBet) > 0;
        const RESULT = Number(P_NUM) > Number(E_NUM) ? true : false;

        if (coinsEnemyBetRes && coinsPlayerBetRes) {
          const COINS_PLAYER = Number(window.sessionStorage.coinsPlayer);
          const COINS_ENEMY = Number(window.sessionStorage.coinsEnemy);
          const RES = Number(coinsEnemyBet) + Number(coinsPlayerBet);
          const C_RES = RESULT ? COINS_PLAYER + RES : COINS_ENEMY + RES;
          window.sessionStorage.setItem(RESULT ? 'coinsPlayer' : 'coinsEnemy', Number(C_RES));
        }

        window.sessionStorage.setItem('betUser', RESULT);
        window.sessionStorage.setItem('basicBettingState', false);
        window.sessionStorage.setItem('extFirstBet', false);
        window.sessionStorage.setItem('coinsPlayerBet', 0);
        window.sessionStorage.setItem('coinsEnemyBet', 0);
        window.sessionStorage.setItem('coinsPlayerExtBet', 0);
        window.sessionStorage.setItem('coinsEnemyBet', 0);
        window.sessionStorage.setItem('betCoinPos', '');
        window.sessionStorage.setItem('battleCardNum', '');
        window.sessionStorage.setItem('betCoin', '');

        GET_ROUND_END.goNextRound(RESULT ? 'win' : 'lose');
      } else if (Number(P_NUM) === Number(E_NUM)) {
        // window.sessionStorage.removeItem("drewReady");
        window.sessionStorage.setItem('roundEndReload', true);
        window.sessionStorage.setItem('drewReady', true);
        window.sessionStorage.setItem('betUser', window.sessionStorage.betUserFirst);
        window.sessionStorage.setItem('drewState', true);
        window.sessionStorage.setItem('roundEnd', false);
        window.sessionStorage.setItem('extFirstBet', false);
        window.sessionStorage.setItem('battleCardNum', '');
        request('drewRefresh', true);

        // GET_ROUND_END.goNextRound("drew");
      }
    } else {
      const DREW_FLIP_CARD_MODE = window.sessionStorage.drewFlipCardMode;
      if (DREW_FLIP_CARD_MODE && DREW_FLIP_CARD_MODE === 'true') {
        // refreshDrawDrew();
        refreshDrewFlipCard();
      }
    }
  },
};
