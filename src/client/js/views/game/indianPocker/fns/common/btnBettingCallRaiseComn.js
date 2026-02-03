import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { comnText } from '@/client/js/functions/language';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import disabledSubtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/disabledSubtractMoveCoin';
import pcDraggableAllDisabled from '@/client/js/views/game/indianPocker/fns/common/pcDraggableAllDisabled';

export default (_state) => {
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
  const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser

  disabledMoveCoins();
  disabledSubtractMoveCoin();
  pcDraggableAllDisabled('bet-coins', false);
  pcDraggableAllDisabled('coins-player', false);

  document.querySelector('.coins-enemy').classList.add('active');
  document.querySelector('.enemy-card').classList.remove('disabled');
  document.querySelector('.player-block').classList.add('disabled');
  document.querySelector('.coins-player').classList.remove('active');
  document.querySelector('.coins-player').classList.add('disabled');
  document.querySelector('.betting-zone').classList.add('disabled');

  // storageMethod('s', 'SET_ITEM', 'betUser', false); // betUser
  storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2); // betUser

  storageMethod('s', 'SET_ITEM',
    findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
    X.enc(decodeTF(textDE([115, 102, 112, 110]))) // "sfpn" : true
  );

  // 배팅된 칩의 betState: 'end'
  if (_state === comnText.fold) return;
  const encryptKey2 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  const encryptKey2_1 = findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]); // betState
  const encryptVal2_1 = findCharCode([75, 66, 87, 81, 71, 77, 89, 83, 85, 69]); // betState : end
  storageMethod(
    's',
    'SET_ITEM',
    encryptKey2, // betCoin
    JSON.stringify(
      // JSON.parse(window.sessionStorage.betCoin).map((item) => {
      JSON.parse(encryptVal2).map((item) => {
        // item.betState = 'end';
        item[encryptKey2_1] = encryptVal2_1; // betState = end
        return item;
      }),
    ),
  );
};
