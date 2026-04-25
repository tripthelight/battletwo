import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from "@/client/js/functions/variable";
import moveEnemyIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyIcon";
import moveEnemyCards from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyCards";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import findCharCode from '@/client/js/functions/findCharCode';

export default async (_data) => {
  // 상대가 틀렸을 때
  // const PN = window.sessionStorage.pn;
  // if (!PN) errorComn("pn not found");
  // const PN_ARR = JSON.parse(PN);
  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "enemyFail.js - pn failed.");
  const PN_ARR = JSON.parse(encryptVal1);

  // const EN = window.sessionStorage.en;
  // if (!EN) errorComn("en not found");
  // const EN_ARR = JSON.parse(EN);
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "enemyFail.js - en failed.");
  const EN_ARR = JSON.parse(encryptVal1);

  // const PLAYER_ACTIVE = window.sessionStorage.getItem(findRandomName(5));
  const PLAYER_ACTIVE = storageMethod('s', 'GET_ITEM', findRandomName(5));
  const PLAYER_ACTIVE_ARR = JSON.parse(PLAYER_ACTIVE);
  const PLAYER_ACTIVE_NUM = PLAYER_ACTIVE_ARR[EN_ARR[1]];

  // 1. en data부터 수정
  // window.sessionStorage.setItem("en", JSON.stringify(_data.en));
  // const EN_ARTER = window.sessionStorage.en;
  // const EN_ARTER_ARR = JSON.parse(EN_ARTER);
  storageMethod('s', 'SET_ITEM', encryptKey2, JSON.stringify(_data.en));
  const encryptKey2_1 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2_1 = storageMethod('s', 'GET_ITEM', encryptKey2_1);
  const EN_ARTER_ARR = JSON.parse(encryptVal2_1);

  // active storage 수정
  // const ENEMY_ACTIVE = window.sessionStorage.getItem(findRandomName(5));
  const ENEMY_ACTIVE = storageMethod('s', 'GET_ITEM', findRandomName(5));
  // if (!ENEMY_ACTIVE) errorComn("arr not found");
  if (!ENEMY_ACTIVE) throw throwObj('sessionStorageLoss', "enemyFail.js - arr not found.");
  const ENEMY_ACTIVE_ARR = JSON.parse(ENEMY_ACTIVE);

  let randomNum = 0;
  for (let i = 0; i < ENEMY_ACTIVE_ARR.length; i++) {
    randomNum = Math.floor(Math.random() * 16);
    ENEMY_ACTIVE_ARR[i] = randomNum;
    if (i === PN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = _data.enemyActiveIndex;
    }
    if (i === EN_ARTER_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = PLAYER_ACTIVE_NUM;
    }
  }

  // window.sessionStorage.setItem(findRandomName(5), JSON.stringify(ENEMY_ACTIVE_ARR));
  storageMethod('s', 'SET_ITEM', findRandomName(5), JSON.stringify(ENEMY_ACTIVE_ARR));

  // 추가되는 카드 생성
  const MAKE_USER_CARD = await makeUserCard();
  let newCard = document.createElement("li");
  let newImage = document.createElement("img");
  newImage.src = MAKE_USER_CARD[EN_ARTER_ARR[1]];
  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newCard.appendChild(newImage);

  // 보낼 DATA
  const AFTER_DATA = {
    enemyActive: Number(ENEMY_ACTIVE_ARR[PN_ARR[1]]),
    clickBoardNum: _data.clickBoardNum,
    clickNum: _data.clickNum,
  };

  setTimeout(() => {
    moveEnemyIcon(AFTER_DATA, false);
    moveEnemyCards(AFTER_DATA, newCard);
  }, timeInterval_1);
};
