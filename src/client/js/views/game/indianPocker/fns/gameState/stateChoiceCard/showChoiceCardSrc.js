// import cardNumCodeDecryption from '@/client/js/functions/bcrypt/cardNumCodeDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
// import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';
// import throwObj from '@/client/js/module/errorHandler/throwObj';
import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import selectedCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/selectedCard';
import flipSelectCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipSelectCard';

import { __fnv1a32 } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/f';

export default (_num, elems) => {
  /**
   * ✅ 이전(showChoiceCard.js)에서 선택한 카드를 Y축으로 180도 뒤집는 애니메이션 시작됨
   * 1. 200ms동안 svg 생성
      - 이 때, 우선 상대 PEER에게 내가 선택한 카드코드 전송
      - 상대가 이미 선택한 카드가 있으면 선/후 비교로직 실행
   * 2. 200ms 후에
      - 카드뒷면이미지(imgEl) 삭제
      - 카드뒷면이미지가 있던 자리에 svg 노출(appendChild)
   * 3. svg 초기 상태는 Y축으로 90도 반회전 되어있는 상태
   * 4. svg 노출과 동시에 svg Y축으로 90도 반회전하는 애니메이션 시작
    */

  // 상대 PEER에게 내가 선택한 카드코드 전송
  const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal = window.sessionStorage.getItem(encryptKey);
  request('choiceFirst', { eNum: _num, pNum: encryptVal });

  // 상대가 이미 선택한 카드가 있으면 선/후 비교로직 실행
  if (encryptVal !== '') {
    flipUserCardCheck({ pNum: _num, eNum: encryptVal });
  };

  // 200ms동안 svg 생성
  selectedCard(_num, mergePayload())
    .then((svg) => setTimeout(flipSelectCard, 200, { svg, ...elems }));

  /*
  selectedCard(_num, _target.closest('button'))
    .then(() => {
      console.log('_num :::::::::::::: ', _num);
      const findCardNumb = cardNumCodeDecryption(_num);
      console.log('findCardNumb :::::: ', findCardNumb);

      // _target.setAttribute('src', imgSetCardNum(findCardNumb));
      setTimeout(() => {
        _target.remove();
      }, 400);

      const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
      const encryptVal = window.sessionStorage.getItem(encryptKey);

      // 상대가 선택하기 전이 아니라면 값 복호화
      */
  /* const safeRemoteNum = (() => {
        if (encryptVal === '') return encryptVal;
        try {
          return cardNumCodeDecryption(encryptVal);
        } catch (error) {
          console.log('error : ', error);
          throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
        }
      })(); */
  /*

      // request('choiceFirst', { eNum: findCardNumb, pNum: safeRemoteNum });
      request('choiceFirst', { eNum: _num, pNum: encryptVal });

      // if (encryptVal !== '') {
      //   flipUserCardCheck({ pNum: findCardNumb, eNum: safeRemoteNum });
      // }
    });
    */
};
