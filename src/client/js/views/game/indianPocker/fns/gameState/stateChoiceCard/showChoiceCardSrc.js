import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';

export default (_target, _num) => {
  // 명령
  _target.setAttribute('src', imgSetCardNum(_num));
  setTimeout(() => {
    const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal = window.sessionStorage.getItem(encryptKey);

    // local player가 선택한 카드를 remote player에게 보내기 : choiceFirst
    request('choiceFirst', { eNum: _num, pNum: encryptVal });
    setTimeout(flipUserCardCheck, timeInterval_1);
  }, timeInterval_1);
};
