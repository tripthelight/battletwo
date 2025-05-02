import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick.js';
import drawPickCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCardInfo';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

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
    // 선플레이어가 결정 안되었을 때
    if (!window.sessionStorage.playerFirstNumber) setTimeout(choiceCardsClick, timeInterval_2);
  }, timeInterval_1);
};
