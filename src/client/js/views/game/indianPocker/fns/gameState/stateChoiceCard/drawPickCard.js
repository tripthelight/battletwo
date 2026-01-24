import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
// import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import drawPickCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCardInfo';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';
// import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import selectedCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/selectedCard';
import flipSelectCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipSelectCard';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) throw throwObj('elementLoss', '#gameScene not found.');
  const CHOICE_CARD = GAME_SCENE.querySelector('.choice-card');
  if (!CHOICE_CARD) {
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
  }

  // 다음 함수 실행
  // 선플레이어 카드 선택 안내 팝업
  drawPickCardInfo();

  const createLocalStorageKeys = (arrays) => arrays.map(findCharCode);
  const getSessionStorageValues = (keys) => keys.map((key) => window.sessionStorage.getItem(key));
  const isPlayerSelected = (arrays) => {
    const keys = createLocalStorageKeys(arrays);
    const values = getSessionStorageValues(keys);
    return values.every((value) => value !== '');
  };
  const localPlayerKeys = {
    player: [
      [78, 73, 68, 76, 67, 82, 87, 83, 89, 70], // ulIndex
      [83, 70, 79, 67, 65, 71, 66, 87, 77, 86], // liIndex
      [77, 68, 73, 90, 74, 72, 86, 71, 85, 87], // playerFirstNumber
    ],
    enemy: [
      [78, 72, 89, 73, 67, 85, 71, 79, 77, 76], // ulIndexEnemy
      [77, 67, 69, 73, 72, 75, 68, 82, 71, 80], // liIndexEnemy
      [81, 67, 82, 74, 87, 76, 89, 79, 83, 85], // enemyFirstNumber
    ],
  };

  // local player가 선택한 카드가 있을 때
  const localPlayerSelect = isPlayerSelected(localPlayerKeys.player);
  // remote player가 선택한 카드가 있을 때
  const remotePlayerSelect = isPlayerSelected(localPlayerKeys.enemy);

  const flipCard = {
    remote: null,
    local: null,
  };

  // 세션 키 매핑
  const KEYMAP = {
    remote: {
      ul: localPlayerKeys.enemy[0], // ulIndexEnemy
      li: localPlayerKeys.enemy[1], // liIndexEnemy
      num: localPlayerKeys.enemy[2], // enemyFirstNumber
    },
    local: {
      ul: localPlayerKeys.player[0], // ulIndex
      li: localPlayerKeys.player[1], // liIndex
      num: localPlayerKeys.player[2], // playerFirstNumber
    },
  };

  // 세션에서 값 읽기
  const getSessionValByKeyCodes = (codes) => {
    const key = findCharCode(codes);
    return window.sessionStorage.getItem(key);
  };

  // 카드 뒤집기 공통 처리
  function reveal(side) {
    const map = KEYMAP[side];
    if (!map) throw throwObj('errorComn', 'keymap failed.');

    // 세션 값
    const ulIdxStr = getSessionValByKeyCodes(map.ul);
    const liIdxStr = getSessionValByKeyCodes(map.li);
    const encNumber = getSessionValByKeyCodes(map.num);
    if (ulIdxStr == null || liIdxStr == null || encNumber == null) {
      throw throwObj('elementLoss', 'select card element or cardNum sesstionStorage error.');
    }
    console.log('새로고침 여기 타나');

    const ulIdx = Number(findCardNum(ulIdxStr)) - 1;
    const liIdx = Number(findCardNum(liIdxStr)) - 1;
    if (!Number.isInteger(ulIdx) || !Number.isInteger(liIdx) || ulIdx < 0 || liIdx < 0) {
      throw throwObj('elementLoss', 'select card ul li sesstionStorage number error.');
    }

    // DOM 탐색
    const CONTAINER = document.getElementById('container');
    const GAME_SCENE = CONTAINER?.querySelector('#gameScene');
    const UL = GAME_SCENE?.querySelectorAll('ul')?.[ulIdx];
    const LI = UL?.querySelectorAll('li')?.[liIdx];
    const BTN = LI?.querySelector('button');
    const IMG = BTN?.querySelector('img');
    if (!IMG || !BTN || !LI) throw throwObj('elementLoss', 'select card element failed.');

    // 숫자 복호화 및 이미지 반영
    // const cardNum = cardNumDecryption(encNumber);
    // flipCard[side] = cardNum;

    // IMG.setAttribute('src', imgSetCardNum(cardNum));
    // LI.classList.add('show');

    // ———————————————————————————————————————————————————————————————————
    // ———————————————————————————————————————————————————————————————————
    // ———————————————————————————————————————————————————————————————————
    // 새로고침 하면 여기서 선택한 카드 뒤집음
    flipCard[side] = encNumber;
    LI.classList.add('show');
    selectedCard(encNumber, mergePayload())
      .then((svg) => flipSelectCard({ svg, imgEl: IMG, btnEl: BTN, liEl: LI }));
  }

  // 상대 peer가 선택한 카드 있음
  if (remotePlayerSelect) reveal('remote');
  // 내가 선택한 카드 있음
  if (localPlayerSelect) reveal('local');

  if (!localPlayerSelect) {
    choiceCardsClick();
  } else if (remotePlayerSelect && localPlayerSelect) {
    flipUserCardCheck({ eNum: flipCard.remote, pNum: flipCard.local });
  }
};
