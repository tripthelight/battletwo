import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import {
  getGameOverCoinsEnemy,
  getGameOverCoinsPlayer,
  getGameOverResult,
} from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

export default (_elem, _class) => {
  const GAME_SCENE = document.getElementById('gameScene');

  if (!GAME_SCENE) {
    return errorManagement({
      errCase: 'elementLoss',
      message: 'game over 상태에서 결과를 그리는 중 #gameScene 엘리먼트가 없습니다',
    });
  }

  const elem = document.createElement(_elem);
  elem.classList.add(_class);

  const isCoinBlock =
    _class === 'enemy-block' ||
    _class === 'player-block';

  // betting-zone 등 coin 데이터가 필요 없는 element는 storage를 읽지 않는다.
  if (!isCoinBlock) {
    GAME_SCENE.appendChild(elem);
    return;
  }

  const result = getGameOverResult();
  const coinsPlayer = getGameOverCoinsPlayer();
  const coinsEnemy = getGameOverCoinsEnemy();

  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과를 그리는 중 result 데이터가 없습니다',
    });
  }

  if (!Number.isInteger(coinsPlayer) || coinsPlayer < 0) {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과를 그리는 중 coinsPlayer 데이터가 없습니다',
    });
  }

  if (!Number.isInteger(coinsEnemy) || coinsEnemy < 0) {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과를 그리는 중 coinsEnemy 데이터가 없습니다',
    });
  }

  // 기존 Indian Poker 결과 화면과 동일하게 승리한 쪽의 coin 수를 사용한다.
  const coinsResult = result
    ? coinsPlayer
    : coinsEnemy;

  if (coinsResult > 0) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('coins');
    ulEl.classList.add(
      _class === 'enemy-block'
        ? 'coins-enemy'
        : 'coins-player',
    );

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < coinsResult; i += 1) {
      fragment.appendChild(document.createElement('li'));
    }

    ulEl.appendChild(fragment);
    elem.appendChild(ulEl);
  }

  GAME_SCENE.appendChild(elem);
};
