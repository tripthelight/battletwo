import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

export default (_host, _num) => {
  setTimeout(() => {
    let activeCard = {
      host: _host,
      num: _num,
    };
    let comnArray = [];
    if (window.sessionStorage.battleCardNum) {
      comnArray = JSON.parse(window.sessionStorage.battleCardNum);
    }
    comnArray.push(activeCard);
    console.log('battleCardNum 값 추가 >>>>>>>>>> ', comnArray);

    storageMethod('s', 'SET_ITEM', 'battleCardNum', JSON.stringify(comnArray));

    activeCard = {};
    comnArray = [];

    if (_host === 'player') {
      request('cardNum', _num);
    }
    if (_host === 'enemy') {
      createBattleCardNum();
    }

    /*
    const BATTLE_CARD_NUM = JSON.parse(window.sessionStorage.battleCardNum);
    console.log('BATTLE_CARD_NUM.length >>>>>> ', BATTLE_CARD_NUM.length);

    if (BATTLE_CARD_NUM.length === 2) {
      drawPlayerCard();
    }
      */
  }, timeInterval_1);

  /*
  const PROMISE = new Promise((resolve, reject) => {
    console.log('여기를 중복으로 타냐?? >>>>>> ', _host);
    setTimeout(() => {
      let activeCard = {
        host: _host,
        num: _num,
      };
      let comnArray = [];
      if (window.sessionStorage.battleCardNum) {
        comnArray = JSON.parse(window.sessionStorage.battleCardNum);
      }
      comnArray.push(activeCard);
      console.log('battleCardNum 값 추가 >>>>>>>>>> ');

      storageMethod('s', 'SET_ITEM', 'battleCardNum', JSON.stringify(comnArray));
      activeCard = {};
      comnArray = [];

      if (_host === 'player') {
        request('cardNum', _num);
      }
      if (_host === 'enemy') {
        createBattleCardNum();
      }

      const BATTLE_CARD_NUM = JSON.parse(window.sessionStorage.battleCardNum);
      if (BATTLE_CARD_NUM.length === 2) return resolve();
    }, timeInterval_1);
  });
  PROMISE.then(() => {
    drawPlayerCard();
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enemy에게 카드번호를 못받음 22 :: ' });
  });
  */
};
