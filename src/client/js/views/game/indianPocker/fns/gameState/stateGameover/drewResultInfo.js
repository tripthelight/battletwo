import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { comnText } from '@/client/js/functions/language';
import storageMethod from '@/client/js/module/storage/storageMethod';
import {
  SESSION_END_REASON,
  terminateGameSession,
} from '@/client/js/module/webRTC/connectSignaling';
import { getGameOverResult } from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

const GAME_PATH = '/game/indianPocker';

export default () => {
  const DREW_RESULT_INFO = document.querySelector('.drew-result-info');
  if (DREW_RESULT_INFO) return;

  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) {
    return errorManagement({
      errCase: 'elementLoss',
      message: 'game over 상태에서 #gameScene 엘리먼트가 없습니다',
    });
  }

  const result = getGameOverResult();
  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과 출력 데이터가 없습니다',
    });
  }

  setTimeout(() => {
    const elem = document.createElement('div');
    const inner = document.createElement('span');
    const btnBlock = document.createElement('div');
    const btnHome = document.createElement('a');
    const btnReplay = document.createElement('a');

    btnBlock.classList.add('btn-block');

    btnHome.setAttribute('href', '/');
    btnHome.setAttribute('title', 'move home');
    btnHome.classList.add('btn-home');
    btnHome.innerHTML = 'HOME';

    btnReplay.setAttribute('href', 'javascript:void(0);');
    btnReplay.setAttribute('title', 'play again');
    btnReplay.classList.add('btn-replay');
    btnReplay.innerHTML = 'REPLAY';

    btnBlock.appendChild(btnHome);
    btnBlock.appendChild(btnReplay);

    elem.classList.add('drew-result-info');
    inner.innerHTML = result ? comnText.win : comnText.die;
    elem.appendChild(inner);
    elem.appendChild(btnBlock);

    GAME_SCENE.appendChild(elem);

    btnReplay.onclick = (event) => {
      event.preventDefault();

      btnReplay.onclick = null;
      btnReplay.style.pointerEvents = 'none';
      btnReplay.setAttribute('aria-disabled', 'true');

      terminateGameSession({
        reason: SESSION_END_REASON.LEAVE,
        notifyPeer: true,
      });

      storageMethod('s', 'REMOVE_ALL');
      window.location.replace(GAME_PATH);
    };
  }, timeInterval_1);
};
