import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { comnText } from '@/client/js/functions/language';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default () => {
  // element | seeeion 체크
  const DREW_RESULT_INFO = document.querySelector('.drew-result-info');
  if (DREW_RESULT_INFO) return;
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 #gameScene 엘리먼트가 없습니다' });
  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 결과 출력 중 result 세션이 없습니다' });
  const RESULT_RES = RESULT === 'true' ? true : RESULT === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 result 세션이 true나 false가 아닙니다' });

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    let inner = document.createElement('span');
    let btnBlock = document.createElement('div');
    let btnHome = document.createElement('a');
    let btnReplay = document.createElement('a');

    btnBlock.classList.add('btn-block');
    btnHome.setAttribute('href', '/');
    btnHome.setAttribute('title', 'move home');
    btnHome.classList.add('btn-home');
    btnHome.innerHTML = 'HOME';
    // btnReplay.setAttribute('href', '/game/indianPocker');
    btnReplay.setAttribute('href', 'javascript:void(0);');
    btnReplay.setAttribute('title', 'play again');
    btnReplay.classList.add('btn-replay');
    btnReplay.innerHTML = 'REPLAY';

    btnBlock.appendChild(btnHome);
    btnBlock.appendChild(btnReplay);

    elem.classList.add('drew-result-info');
    inner.innerHTML = RESULT_RES ? comnText.win : comnText.die;
    elem.appendChild(inner);
    elem.appendChild(btnBlock);

    GAME_SCENE.appendChild(elem);

    btnReplay.onclick = () => {
      storageMethod('s', 'REMOVE_ALL');
      const baseUrl = window.location.origin;
      location.href = baseUrl + '/game/indianPocker';
    };
  }, timeInterval_1);
};
