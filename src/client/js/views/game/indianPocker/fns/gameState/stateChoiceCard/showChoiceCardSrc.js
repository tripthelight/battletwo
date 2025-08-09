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
  const arrNumbs = selectCompairNumbers();
  const decryptCardNumb = arrNumbs.find(item => bcrypt.compareSync(item.toString(), _num));
  const findCardNumb = findCardNum(decryptCardNumb);

  _target.setAttribute('src', imgSetCardNum(findCardNumb));

  const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal = window.sessionStorage.getItem(encryptKey);

  let remoteNum = encryptVal;
  if (encryptVal !== '') {
    const decryptRemoteCardNum = arrNumbs.find(item => bcrypt.compareSync(item.toString(), encryptVal));
    remoteNum = findCardNum(decryptRemoteCardNum);
  };


  // local player가 선택한 카드를 remote player에게 보내기 : choiceFirst
  request('choiceFirst', { eNum: findCardNumb, pNum: remoteNum });
  if (encryptVal !== '') {
    flipUserCardCheck({ pNum: findCardNumb, eNum: remoteNum });
  };
};
