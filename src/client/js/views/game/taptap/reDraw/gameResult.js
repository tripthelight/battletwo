import { text, comnText } from '@/client/js/functions/language.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default () => {
  const RESULT = window.sessionStorage.getItem('taptap');
  if (!RESULT) errorManagement({ errCase: 'errorComn', message: text.err });

  const GAME_RESULT_POPUP = document.querySelector('.game-result-popup');
  if (GAME_RESULT_POPUP) return;
  const POPUP = document.createElement('div');
  const BG = document.createElement('div');
  const INNER = document.createElement('span');
  const BTN_WRAP = document.createElement('div');
  const BTN_HOME = document.createElement('a');
  const BTN_REPLAY = document.createElement('a');
  BTN_WRAP.classList.add('btn-wrap');
  BTN_HOME.classList.add('btn-move-home');
  BTN_REPLAY.classList.add('btn-replay');
  BTN_HOME.setAttribute('href', 'javascript:viod(0);');
  BTN_REPLAY.setAttribute('href', 'javascript:viod(0);');
  BG.classList.add('bg');
  POPUP.classList.add('game-result-popup');
  BTN_HOME.innerHTML = 'GO HOME';
  BTN_REPLAY.innerHTML = 'REPLAY';
  BTN_HOME.setAttribute('title', 'move page');
  BTN_REPLAY.setAttribute('title', 'move page');
  INNER.innerHTML = JSON.parse(RESULT) ? comnText.win : comnText.die;
  BTN_WRAP.appendChild(BTN_REPLAY);
  BTN_WRAP.appendChild(BTN_HOME);
  POPUP.appendChild(BG);
  POPUP.appendChild(INNER);
  POPUP.appendChild(BTN_WRAP);
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) errorManagement({ errCase: 'errorComn', message: text.err });
  CONTAINER.appendChild(POPUP);

  BTN_HOME.onclick = () => {
    storageMethod('s', 'REMOVE_ALL');
    location.replace('/');
  };
  BTN_REPLAY.onclick = () => {
    storageMethod('s', 'REMOVE_ALL');
    location.replace('/game/taptap');
  };
};
