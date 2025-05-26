import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_hour, _minute) => {
  // const GAME_STATE = window.sessionStorage.gameState;
  // if (!GAME_STATE) errorManagement({ errCase: 'errorComn', message: 'gameState not found' });
  // gameState: sessionStorage.getItem('gameState'),
  const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (!decryptVal) errorManagement({ errCase: 'errorComn', message: 'gameState not found' });

  // const GAME_RES = GAME_STATE === 'basicBet' || GAME_STATE === 'playing';
  // basicBet
  const encryptVal1 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]);
  // playing
  const encryptVal2 = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]);
  const GAME_RES = decryptVal === encryptVal1 || decryptVal === encryptVal2;
  if (!GAME_RES) return;

  // 시간
  const START_H = Math.floor(Math.random() * 360); // 0 ~ 359
  const POS_H = -86;
  // 분
  const START_M = Math.floor(Math.random() * 360); // 0 ~ 359
  const POS_M = -96;
  // 시침 position
  _hour.style.transform = `translate(-50%, ${POS_H}%) rotate(${START_H}deg)`;
  // 분침 position
  _minute.style.transform = `translate(-50%, ${POS_M}%) rotate(${START_M}deg)`;
};
