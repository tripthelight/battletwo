import { timeInterval_1, timeInterval_2, timeInterval_3, timeInterval_4 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorManagement';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import drewCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drewCheck';
import coinOneCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/coinOneCheck';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import timeDraw from '@/client/js/views/game/indianPocker/fns/common/timeDraw';

export default () => {
  // element | seeeion 체크
  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser 세션이 없습니다' });
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: '#gameScene 엘리먼트가 없습니다.' });
  const ENEMY_BLOCK = GAME_SCENE.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다.' });
  const PLAYER_BLOCK = GAME_SCENE.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트가 없습니다. 222' });
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn', message: '.enemy-card 엘리먼트가 없습니다.' });
  const PLAYER_CARD = document.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: '.player-card 엘리먼트가 없습니다.' });
  const ENEMY_COINS = document.querySelector('.coins-enemy');
  if (!ENEMY_COINS) return errorManagement({ errCase: 'errorComn', message: '.coins-enemy 엘리먼트가 없습니다.' });
  const PLAYER_COINS = document.querySelector('.coins-player');
  if (!PLAYER_COINS) return errorManagement({ errCase: 'errorComn', message: '.coins-player 엘리먼트가 없습니다.' });

  // 명령
  setTimeout(() => {
    if (BET_USER === 'true') {
      ENEMY_CARD.classList.add('disabled');
      PLAYER_BLOCK.classList.remove('disabled');
      PLAYER_COINS.classList.remove('disabled');
      PLAYER_COINS.classList.add('active');
      ENEMY_COINS.classList.remove('active');
      setTimeout(() => {
        // 시, 분 animation
        timeDraw(true, PLAYER_COINS, ENEMY_COINS);
        setTimeout(() => {
          moveCoins();
          setTimeout(() => {
            BTN_STATE.SHOW();
          }, timeInterval_3);
        }, timeInterval_2);
      }, timeInterval_1);
      // timeDraw(true, PLAYER_COINS, ENEMY_COINS);
      // // 다음 함수 실행
      // setTimeout(moveCoins, timeInterval_1);
      // setTimeout(BTN_STATE.SHOW, timeInterval_2);
    } else if (BET_USER === 'false') {
      PLAYER_BLOCK.classList.add('disabled');
      ENEMY_CARD.classList.remove('disabled');
      ENEMY_COINS.classList.remove('disabled');
      ENEMY_COINS.classList.add('active');
      PLAYER_COINS.classList.remove('active');
      setTimeout(() => {
        // 시, 분 animation
        timeDraw(false, PLAYER_COINS, ENEMY_COINS);
        setTimeout(() => {
          disabledMoveCoins();
          setTimeout(() => {
            BTN_STATE.HIDE();
          }, timeInterval_3);
        }, timeInterval_2);
      }, timeInterval_1);
      // timeDraw(false, PLAYER_COINS, ENEMY_COINS);
      // // 다음 함수 실행
      // setTimeout(disabledMoveCoins, timeInterval_1);
      // setTimeout(BTN_STATE.HIDE, timeInterval_2);
    } else {
      errorComn('betUser 세션이 true도 아니고 false도 아닙니다');
    }
    setTimeout(() => {
      const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
      if (BATTLE_CARD_NUM) {
        const NUMS_ARR = JSON.parse(BATTLE_CARD_NUM);
        if (NUMS_ARR.length === 2) {
          LOADING_EVENT.hide();
          setTimeout(drewCheck, timeInterval_1);
          setTimeout(coinOneCheck, timeInterval_1);
        }
      }
    }, timeInterval_4);
  }, timeInterval_1);
};
