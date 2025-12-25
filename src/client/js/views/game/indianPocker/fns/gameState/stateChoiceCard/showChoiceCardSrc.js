import cardNumCodeDecryption from '@/client/js/functions/bcrypt/cardNumCodeDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_target, _num) => {
  // 명령
  const findCardNumb = cardNumCodeDecryption(_num);

  _target.setAttribute('src', imgSetCardNum(findCardNumb));

  const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal = window.sessionStorage.getItem(encryptKey);

  // 상대가 선택하기 전이 아니라면 값 복호화
  const safeRemoteNum = (() => {
    if (encryptVal === '') return encryptVal;
    try {
      return cardNumCodeDecryption(encryptVal);
    } catch (error) {
      console.log('error : ', error);
      throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
    }
  })();

  // request('choiceFirst', { eNum: findCardNumb, pNum: safeRemoteNum });

  // if (encryptVal !== '') {
  //   flipUserCardCheck({ pNum: findCardNumb, eNum: safeRemoteNum });
  // }
};
