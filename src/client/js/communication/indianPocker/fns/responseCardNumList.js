import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

/**
 * 상대 peer의 secret key로 복호화한 내 cardNum 리스트를 받아서 이후 단계 진행
 * @param {Array<string>} encryptCardNum 상대 peer의 secret key로 복호화한 내 cardNum 배열
 * @param {string} storeageKey cardNum 배열을 주입할 sessionStorage key
 * @return null
 */
export default (data) => {
  const { step, encryptCardNum, storeageKey } = data;

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    const randomNum = randomArray(encryptCardNum);
    validateStore.dispatch(updateRandomNum({ randomNum: randomNum }));
    for (let i = 0; i < encryptCardNum.length; i++) {
      if (encryptCardNum[i] === randomNum) {
        encryptCardNum.splice(i, 1);
        break;
      }
    }

    request('requestCardNumList', {
      step: 'nextStep',
      list: encryptCardNum.join(),
      storeageKey: storeageKey,
    });
  }

  // nextStep ----------------------------------------
  if (step === 'nextStep') {
    const randomNum = validateStore.getState().validateState.randomNum;
    if (randomNum === null || typeof randomNum !== 'string') {
      errorManagement({ errCase: 'errorComn', message: 'randomNum 정의 안됨' });
    }
    // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(CARD_NUMS));
    storageMethod('s', 'SET_ITEM', storeageKey, encryptCardNum);
    setTimeout(sessionActiveCard, timeInterval_1, 'player', randomNum);
  }
};
