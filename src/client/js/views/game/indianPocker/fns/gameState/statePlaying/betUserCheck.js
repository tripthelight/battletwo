import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1, timeInterval_2, timeInterval_3, timeInterval_4 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import drewCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drewCheck';
import coinOneCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/coinOneCheck';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import timeDraw from '@/client/js/views/game/indianPocker/fns/common/timeDraw';

export default () => {
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
  // element | seeeion 체크
  // const BET_USER = window.sessionStorage.betUser;
  // if (!BET_USER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'betUser 세션이 없습니다' });
  const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) throw throwObj('sessionStorageLoss', 'betuser session key failed.');

  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'elementLoss', message: '#gameScene 엘리먼트가 없습니다.' });
  const ENEMY_BLOCK = GAME_SCENE.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block 엘리먼트가 없습니다.' });
  const PLAYER_BLOCK = GAME_SCENE.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'elementLoss', message: '.player-block 엘리먼트가 없습니다. 222' });
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'elementLoss', message: '.enemy-card 엘리먼트가 없습니다.' });
  const PLAYER_CARD = document.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'elementLoss', message: '.player-card 엘리먼트가 없습니다.' });
  const ENEMY_COINS = document.querySelector('.coins-enemy');
  if (!ENEMY_COINS) return errorManagement({ errCase: 'elementLoss', message: '.coins-enemy 엘리먼트가 없습니다.' });
  const PLAYER_COINS = document.querySelector('.coins-player');
  if (!PLAYER_COINS) return errorManagement({ errCase: 'elementLoss', message: '.coins-player 엘리먼트가 없습니다.' });

  // 명령
  setTimeout(() => {
    // if (BET_USER === 'true') {
    if (encryptVal1 === encryptVal_2) { // betUser === true
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
    // } else if (BET_USER === 'false') {
    } else if (encryptVal1 === encryptVal_1) { // betUser === false
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
      // errorManagement({ errCase: 'sessionStorageLoss', message: 'betUser 세션이 true도 아니고 false도 아닙니다' });
      throw throwObj('sessionStorageLoss', 'betuser sessionStorage value not true or false.');
    }
    setTimeout(() => {
      /*
      const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
      if (BATTLE_CARD_NUM) {
        const NUMS_ARR = JSON.parse(BATTLE_CARD_NUM);
        if (NUMS_ARR.length === 2) {
          LOADING_EVENT.hide();
          setTimeout(drewCheck, timeInterval_1);
          // 기본 배팅 후, 남은 코인이 없을 경우
          // setTimeout(coinOneCheck, timeInterval_1);
        }
      }
      */
      // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      // if (BATTLE_CARD_NUM !== null) {
      const encryptKey2 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      if (encryptVal2 !== null && encryptVal2 !== '') {
        LOADING_EVENT.hide();
        setTimeout(drewCheck, timeInterval_1);
      }
    }, timeInterval_4);
  }, timeInterval_1);
};
