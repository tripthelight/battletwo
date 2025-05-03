export default (_el, _cp, _cpb, _cpeb, _ce, _ceb, _ceeb) => {
  if (_cpb >= _ceb) {
    _el.removeAttribute("disabled");
    if (_cpb - _ceb > _ce) {
      _el.setAttribute("disabled", true);
    } else if (_cpb - _ceb <= _ce) {
      _el.removeAttribute("disabled");
    }
  } else if (_cpb < _ceb) {
    _el.setAttribute("disabled", true);
  }
};
