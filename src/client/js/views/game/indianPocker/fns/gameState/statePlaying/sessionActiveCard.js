import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

export default (_host, _num) => {
  const PROMISE = new Promise((resolve, reject) => {
    console.log('여기를 중복으로 타냐?? >>>>>> ');
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
      window.sessionStorage.setItem('battleCardNum', JSON.stringify(comnArray));
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
};
