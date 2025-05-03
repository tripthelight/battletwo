import { errorManagement } from '@/client/js/module/errorManagement';

export default (_hour, _minute) => {
  const GAME_STATE = window.sessionStorage.gameState;
  if (!GAME_STATE) errorManagement({ errCase: 'errorComn', message: 'gameState not found' });

  const GAME_RES = GAME_STATE === 'basicBet' || GAME_STATE === 'playing';
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
