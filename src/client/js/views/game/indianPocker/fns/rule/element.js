import { errorManagement } from '@/client/js/module/errorManagement';

export const ELEMENT = {
  LIST: ['.enemy-block', '.coins-enemy', '.coins-enemy li', '.enemy-card', '.enemy-card img', '.betting-zone', '.bet-coins', '.bet-coins li', '.player-block', '.coins-player', '.coins-player li', '.player-card', 'player-card img', '.bottom-buttons', '.betting', '.call', '.raise', '.fold', '.all-in'],
  CHECK: (_el, _state) => {
    let el;
    for (let i = 0; i < ELEMENT.LIST.length; i++) {
      if (_el === '.coins-enemy li' || _el === '.bet-coins li' || _el === '.coins-player li') {
        el = document.querySelectorAll(_el);
      } else {
        el = document.querySelector(_el);
      }
    }
    if (el && _state === 'find') return el;
    if (!el && _state === 'find') return false;
    if (el && _state === 'findCheck') return el;
    if (el && _state === 'length') return el.length;
    return errorManagement({ errCase: 'errorComn', message: _el + ' 엘리먼트가 없습니다' });
  },
};
