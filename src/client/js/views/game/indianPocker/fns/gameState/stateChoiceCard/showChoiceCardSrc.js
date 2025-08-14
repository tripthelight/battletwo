import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';

export default (_target, _num) => {
  // 명령
  const findCardNumb = cardNumDecryption(_num);
  _target.setAttribute('src', imgSetCardNum(findCardNumb));

  const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal = window.sessionStorage.getItem(encryptKey);

  let remoteNum = encryptVal;
  if (encryptVal !== '') {
    try {
      remoteNum = cardNumDecryption(encryptVal);
    } catch (error) {
      request('opponentFouls', { message: '상대 Peer가 enemyFirstNumber sessionStorage 조작' });
      throw error;
    }
  };


  // local player가 선택한 카드를 remote player에게 보내기 : choiceFirst
  request('choiceFirst', { eNum: findCardNumb, pNum: remoteNum });
  // 내가 선택했는데 상대 peer가 선택한 카드가 있는 경우
  if (encryptVal !== '') {
    flipUserCardCheck({ pNum: findCardNumb, eNum: remoteNum });
  };
};
