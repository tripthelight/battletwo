import CryptoJS from 'crypto-js';
import { request } from '@/client/js/communication/indianPocker/request';
import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import P1 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P1';
import P2 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P2';
import P3 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P3';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

/**
 * 상대 peer의 secret key로 복호화한 내 cardNum 리스트를 받아서 이후 단계 진행
 * @param
 * @param
 * @return null
 */
export default (data) => {
  const { step, list, storeageKey } = data;

  // decryptCardNum ----------------------------
  if (step === 'decryptCardNum') {
    const _enum = validateStore.getState().validateState.enum;
    if (_enum === null || typeof _enum !== 'string') {
      errorManagement({ errCase: 'errorComn', message: '_enum 정의 안됨' });
    }

    const P1_PARAMS = {
      _enum: _enum,
      CARD_NUM_ARR: list,
    };

    P1(P1_PARAMS)
      .then((data) => {
        const { _numRes, CARD_NUM_ARR } = data;

        const P2_PARAMS = {
          _numRes: _numRes.join(),
          CARD_NUM_ARR: CARD_NUM_ARR,
        };
        return P2(P2_PARAMS);
      })
      .then((data) => {
        const { _index, CARD_NUM_ARR } = data;
        console.log('_index >>>>>>> ', _index);

        const NUM = JSON.parse(JSON.stringify(_index));
        console.log('NUM >>>>>>>>>>> ', NUM);

        const P2_PARAMS = {
          _deleteList: NUM,
          CARD_NUM_ARR: CARD_NUM_ARR,
        };

        return P3(P2_PARAMS);
      })
      .then((_cardNumList) => {
        // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(_cardNumList));
        // storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(_cardNumList));
        // storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(_cardNumList));

        console.log('_cardNumList.length >>>>>>>> ', _cardNumList.length);

        request('requestRemoveEnemyCardNum', {
          step: 'decrypeList',
          list: _cardNumList.join(),
          storeageKey: storeageKey,
        });
      })
      .catch((error) => {
        errorManagement({ errCase: 'errorComn', message: `P1함수 error ::  ${error}` });
      });
  }

  // nextStep ----------------------------
  if (step === 'nextStep') {
    storageMethod('s', 'SET_ITEM', storeageKey, list);
  }
};
