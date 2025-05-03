import { errorManagement } from '@/client/js/module/errorManagement';

/**
 * coin의 시, 분 animation
 * @param {object} _hour    : span.h
 * @param {object} _minute  : span.m
 * @param {boolean} _stop   : true -> 시간이 멈춤 | false -> 시간이 감
 */
export default (_hour, _minute, _stop) => {
  const GAME_STATE = window.sessionStorage.gameState;
  if (!GAME_STATE) errorManagement({ errCase: 'errorComn', message: 'gameState not found' });
  const GAME_RES = GAME_STATE === 'basicBet' || GAME_STATE === 'playing';
  if (!GAME_RES) return;

  const TRANSFORM_RES = (_pos, _deg) => `translate(-50%, ${_pos}%) rotate(${_deg}deg)`;

  // 시간
  const START_H = Math.floor(Math.random() * 360); // 0 ~ 359
  const END_H = START_H + 360;
  const POS_H = -86;
  // 시간 keyframes
  const HOUR_KEYFRAMES = [{ transform: TRANSFORM_RES(POS_H, START_H) }, { transform: TRANSFORM_RES(POS_H, END_H) }];
  // 시간 sync options
  const HOUR_SYNC_OPTIONS = {
    duration: 360000,
    iterations: Infinity,
    easing: _stop ? 'steps(1, end)' : 'steps(360, end)',
  };

  // 분
  const START_M = Math.floor(Math.random() * 360); // 0 ~ 359
  const END_M = START_M + 360;
  const POS_M = -96;
  // 분 keyframes
  const MINUTE_KEYFRAMES = [{ transform: TRANSFORM_RES(POS_M, START_M) }, { transform: TRANSFORM_RES(POS_M, END_M) }];
  // 분 sync options
  const MINUTE_SYNC_OPTIONS = {
    duration: 30000,
    iterations: Infinity,
    easing: _stop ? 'steps(1, end)' : 'steps(30, end)',
  };
  // 시침 animation
  _hour.animate(HOUR_KEYFRAMES, HOUR_SYNC_OPTIONS);

  // 분침 animation
  _minute.animate(MINUTE_KEYFRAMES, MINUTE_SYNC_OPTIONS);
};
