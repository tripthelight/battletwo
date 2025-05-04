import bcrypt from 'bcryptjs';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import comnDrawEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/comnDrawEnemyCard';

export default () => {
  // element | seeeion 체크
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (ENEMY_CARD) return;
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: '#gameScene 엘리먼트가 없습니다.' });
  const ENEMY_BLOCK = GAME_SCENE.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다.' });
  let res;
  const BATTLE_CARD_NUM = JSON.parse(window.sessionStorage.battleCardNum);
  for (let i = 0; i < BATTLE_CARD_NUM.length; i++) {
    if (BATTLE_CARD_NUM[i].host === 'enemy') {
      res = BATTLE_CARD_NUM[i].num;
    }
  }
  const NUMS_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const NUM_RES = NUMS_LIST.filter((nums) => bcrypt.compareSync(nums, res));
  setTimeout(comnDrawEnemyCard, timeInterval_1, NUM_RES);
};
