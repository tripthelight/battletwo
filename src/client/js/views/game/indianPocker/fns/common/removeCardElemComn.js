import { timeInterval_1, timeInterval_201 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';

export default (_ec, _pc, _bb, _bur) => {
  return new Promise((resolve, reject) => {
    _ec.classList.add('up-animation');
    _pc.classList.add('down-animation');
    setTimeout(() => {
      _ec.style.top = 0 - _ec.clientHeight + 'px';
      _pc.style.bottom = 0 - _pc.clientHeight + 'px';
      if (_bur) {
        if (!_bb) return errorManagement({ errCase: 'errorComn', message: '코인 1 체크 중 .bottom-buttons 엘리먼트가 없습니다.' });
        _bb.classList.add('down-animation');
        _bb.style.bottom = 0 - _bb.clientHeight + 'px';
      }
      setTimeout(() => {
        _ec.remove();
        _pc.remove();
        if (_bur && _bb) _bb.remove();
        setTimeout(resolve, timeInterval_1);
      }, timeInterval_201);
    }, timeInterval_1);
  });
};
