import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';

export default (_elem, _class) => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'elementLoss', message: 'game over 상태에서 결과를 그리는 중 #gameScene 엘리먼트가 없습니다' });

  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과를 그리는 중 coinsPlayer 세션이 없습니다' });
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과를 그리는 중 coinsPlayer 세션이 없습니다' });
  const decryptVal1 = dec(encryptVal1); // coinsPlayer value number

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과를 그리는 중 coinsEnemy 세션이 없습니다' });
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과를 그리는 중 coinsEnemy 세션이 없습니다' });
  const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과를 그리는 중 result 세션이 없습니다' });
  // const COINS_RESULT = RESULT === 'true' ? Number(COINS_PLAYER) : Number(COINS_ENEMY);
  const COINS_RESULT = RESULT === 'true' ? decryptVal1 : decryptVal2;
  const UL_CLASS = _class === 'enemy-block' ? 'coins-enemy' : _class === 'player-block' ? 'coins-player' : '';
  let elem = document.createElement(_elem);
  elem.classList.add(_class);
  if ((_class === 'enemy-block' || _class === 'player-block') && Number(COINS_RESULT) > 0) {
    let ulEl = document.createElement('ul');
    ulEl.classList.add('coins');
    ulEl.classList.add(UL_CLASS);
    for (let i = 0; i < Number(COINS_RESULT); i++) ulEl.appendChild(document.createElement('li'));
    elem.appendChild(ulEl);
  }
  GAME_SCENE.appendChild(elem);
};
