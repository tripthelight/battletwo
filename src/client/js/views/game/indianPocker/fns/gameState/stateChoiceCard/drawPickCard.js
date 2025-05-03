import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import drawPickCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCardInfo';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: '#gameScene 엘리먼트가 없습니다.' });
  const CHOICE_CARD = GAME_SCENE.querySelector('.choice-card');
  if (CHOICE_CARD) return errorManagement({ errCase: 'errorComn', message: '.choice-card 엘리먼트가 없습니다.' });

  // 명령
  setTimeout(() => {
    // element | session 변수
    const GAME_SCENE = document.getElementById('gameScene');
    const ELEM = document.createElement('div');
    ELEM.classList.add('choice-card');
    for (let i = 0; i < 2; i++) {
      const innerUL = document.createElement('ul'); // HTML 요소로 생성
      for (let j = 0; j < 10; j++) {
        const choiceCards = document.createElement('li'); // HTML 요소로 생성
        const choiceCardsBtn = document.createElement('button');
        const cardBack = document.createElement('img');
        cardBack.setAttribute('src', SVG_BACK);
        cardBack.setAttribute('alt', 'card back');
        choiceCardsBtn.appendChild(cardBack);
        choiceCards.appendChild(choiceCardsBtn);
        innerUL.appendChild(choiceCards);
      }
      ELEM.appendChild(innerUL);
    }
    GAME_SCENE.appendChild(ELEM);

    // 다음 함수 실행
    // 선플레이어 카드 선택 안내 팝업
    setTimeout(drawPickCardInfo, timeInterval_1);

    // local player가 선택한 카드가 있을 때
    const localPlayerSelect = window.sessionStorage.ulIndex && window.sessionStorage.liIndex && window.sessionStorage.playerFirstNumber;
    // remote player가 선택한 카드가 있을 때
    const remotePlayerSelect = window.sessionStorage.ulIndexEnemy && window.sessionStorage.liIndexEnemy && window.sessionStorage.enemyFirstNumber;

    if (remotePlayerSelect) {
      const CONTAINER = document.getElementById('container');
      const GAME_SCENE = CONTAINER.querySelector('#gameScene');
      const UL_INDEX_ENEMY = GAME_SCENE.querySelectorAll('ul')[window.sessionStorage.ulIndexEnemy];
      const LI_INDEX_ENEMY = UL_INDEX_ENEMY.querySelectorAll('li')[window.sessionStorage.liIndexEnemy];
      const TARGET_TAG_NAME = LI_INDEX_ENEMY.querySelector('img');
      LI_INDEX_ENEMY.classList.add('show');
      TARGET_TAG_NAME.setAttribute('src', imgSetCardNum(window.sessionStorage.enemyFirstNumber));
    }

    if (localPlayerSelect) {
      const CONTAINER = document.getElementById('container');
      const GAME_SCENE = CONTAINER.querySelector('#gameScene');
      const UL_INDEX_ENEMY = GAME_SCENE.querySelectorAll('ul')[window.sessionStorage.ulIndex];
      const LI_INDEX_ENEMY = UL_INDEX_ENEMY.querySelectorAll('li')[window.sessionStorage.liIndex];
      const TARGET_TAG_NAME = LI_INDEX_ENEMY.querySelector('img');
      LI_INDEX_ENEMY.classList.add('show');
      TARGET_TAG_NAME.setAttribute('src', imgSetCardNum(window.sessionStorage.playerFirstNumber));
    }

    if (remotePlayerSelect && localPlayerSelect) {
      setTimeout(flipUserCardCheck, timeInterval_2);
    } else {
      setTimeout(choiceCardsClick, timeInterval_2);
    }
  }, timeInterval_1);
};
