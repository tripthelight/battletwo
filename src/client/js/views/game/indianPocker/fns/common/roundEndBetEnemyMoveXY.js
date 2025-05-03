import { getStyle } from '@/client/js/functions/comnExport';
import { errorManagement } from '@/client/js/module/errorManagement';

export default (_cw, _ch, _ty, _state) => {
  const ENEMY_COIN_EL = document.querySelector('.coins-enemy');
  if (!ENEMY_COIN_EL) return errorManagement({ errCase: 'errorComn', message: 'round end에서 .coins-enemy 엘리먼트가 없습니다' });
  const ENEMY_COINS_EL = ENEMY_COIN_EL.querySelectorAll('li');

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: 'round end에서 .player-block 엘리먼트가 없습니다' });
  const PLAYER_COIN_EL = document.querySelector('.coins-player');
  if (!PLAYER_COIN_EL) return errorManagement({ errCase: 'errorComn', message: 'round end에서 .coins-player 엘리먼트가 없습니다' });
  const PLAYER_COINS_EL = PLAYER_COIN_EL.querySelectorAll('li');

  if (_state === 'end' && ENEMY_COINS_EL.length > 0) {
    const EL = ENEMY_COINS_EL[ENEMY_COINS_EL.length - 1];
    const PB = getStyle(ENEMY_COIN_EL, 'padding-bottom');
    const PL = getStyle(ENEMY_COIN_EL, 'padding-left');
    const PR = getStyle(ENEMY_COIN_EL, 'padding-right');
    const IW = Math.floor((ENEMY_COIN_EL.clientWidth - Number(PL + PR)) / _cw) * _cw;
    const IWR = ENEMY_COIN_EL.clientWidth - IW - PL - PR;
    const CASE = Boolean(EL.offsetLeft - PL <= IWR);
    return {
      x: CASE ? Number(window.innerWidth - _cw - PL) : Number(EL.offsetLeft - _cw),
      y: CASE ? Number(0 - ENEMY_COIN_EL.clientHeight + PB - _ch) : Number(0 - ENEMY_COIN_EL.clientHeight + PB),
    };
  } else if (_state === 'add' && PLAYER_COINS_EL.length > 0) {
    const EL = PLAYER_COINS_EL[PLAYER_COINS_EL.length - 1];
    const PT = getStyle(PLAYER_COIN_EL, 'padding-top');
    const PBL = getStyle(PLAYER_BLOCK, 'padding-left');
    const PL = getStyle(PLAYER_COIN_EL, 'padding-left');
    const PR = getStyle(ENEMY_COIN_EL, 'padding-right');
    const BETTING_ZONE = document.querySelector('.betting-zone');
    const IW = Math.floor((ENEMY_COIN_EL.clientWidth - Number(PL + PR)) / _cw) * _cw;
    const IWR = ENEMY_COIN_EL.clientWidth - IW - PL - PR;
    const CASE = Boolean(ENEMY_COIN_EL.clientWidth - PR - PL - EL.offsetLeft - IWR <= _cw);
    return {
      x: CASE ? Number(PL + PBL) : Number(EL.offsetLeft + _cw),
      y: CASE ? Number(BETTING_ZONE.clientHeight + PT + EL.offsetTop + _ch) : Number(BETTING_ZONE.clientHeight + PT + EL.offsetTop),
    };
  }
  return { x: 0, y: 0 };
};
