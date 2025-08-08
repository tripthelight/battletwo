import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/network/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';

export default (_target, _num) => {
  // 명령
  const decryptCardNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].find(item => bcrypt.compareSync(item.toString(), _num));
  _target.setAttribute('src', imgSetCardNum(decryptCardNum));

  const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // local player가 선택한 카드를 remote player에게 보내기 : choiceFirst
  request('choiceFirst', { eNum: _num, pNum: encryptVal2 });
  flipUserCardCheck();
};
