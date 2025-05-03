import { comnText } from '@/client/js/functions/language';

export default (_el, _cpb, _cpeb, _ceb, _ceeb) => {
  if (_cpb === _ceb) {
    _el.innerHTML = comnText.call;
  } else if (_cpb > _ceb) {
    _el.innerHTML = comnText.raise;
  } else if (_cpb < _ceb) {
    _el.innerHTML = comnText.call;
  }
};
