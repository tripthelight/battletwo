import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import errorManager from '@/client/js/module/errorHandler/errorManager';
import promiseMoveEnemyCard from "@/client/js/views/game/findTheSamePicture/fns/common/promiseMoveEnemyCard";
import promiseMoveEnemyCardEnd from "@/client/js/views/game/findTheSamePicture/fns/common/promiseMoveEnemyCardEnd";
import make20Enemy from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/make20Enemy";
import clickCard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/clickCard";
import infoPlayPop from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/infoPlayPop";
import { timeInterval_1 } from "@/client/js/functions/variable";
import playerCardAcitveClass from "@/client/js/views/game/findTheSamePicture/fns/common/playerCardAcitveClass";

export default async (_data, _newCard) => {
  // 이 경우는 상대가 틀렸을 때만 실행됨
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);

  // const ENEMY_LIST = await make20Enemy(JSON.parse(window.sessionStorage.en));
  const ENEMY_LIST = await make20Enemy(JSON.parse(encryptVal2));
  const ENEMY_BLOCK_REVERSE = [...ENEMY_LIST].reverse();
  promiseMoveEnemyCard(_data, _newCard)
    .then((_data) => {
      promiseMoveEnemyCardEnd(_data)
        .then((_data) => {
          // enemy block 다시 그리기
          const RE_ENEMY_BLOCK = document.querySelector(".enemy-block");
          if (!RE_ENEMY_BLOCK) throw throwObj('elementLoss', "moveEnemyCards.js - .enemy-block element failed.");
          const RE_ENEMY_LIST = RE_ENEMY_BLOCK.querySelector("ul");
          if (!RE_ENEMY_LIST) throw throwObj('elementLoss', "moveEnemyCards.js - .enemy-block ul element failed.");
          const RE_ENEMY_CARDS = RE_ENEMY_LIST.querySelectorAll("li");
          for (let i = 0; i < RE_ENEMY_CARDS.length; i++) {
            RE_ENEMY_CARDS[i].remove();
          }

          let liEl = new Object();
          let img = new Object();
          for (let i = 0; i < 20; i++) {
            liEl = document.createElement("li");
            img = document.createElement("img");
            img.src = ENEMY_BLOCK_REVERSE[i];
            liEl.appendChild(img);
            RE_ENEMY_LIST.appendChild(liEl);
          }
          setTimeout(() => {
            window.sessionStorage.setItem("clickUser", true);
            infoPlayPop();
            clickCard();
            setTimeout(playerCardAcitveClass, timeInterval_1);
          }, timeInterval_1);
        })
        .catch((error) => {
          errorManager(error, true);
        });
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
