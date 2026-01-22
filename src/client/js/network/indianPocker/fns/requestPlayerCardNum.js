import findRemoteCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/findRemoteCard';
import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';

export default (data) => {
  console.log('data >>>>>>>>> ', data);

  const { clickBtn } = data;
  // const REMOTE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  // if (REMOTE_CARD_NUM === null) {
  //   return errorManagement({ errCase: 'sessionStorageLoss', message: 'round end battleCardNum key 세션 없음' });
  // }
  const encryptKey1 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'round end battleCardNum key 세션 없음' });
  };

  // 여기서 내 화면의 battleCardNum과 publicCardNum과 매칭된 publicCard 코드를 전송
  const remoteCard = findRemoteCard(encryptVal1);
  console.log("상대 카드의 public num -------- ", remoteCard);


  // request('responsePlayerCardNum', { clickBtn: clickBtn, num: REMOTE_CARD_NUM });
  request('responsePlayerCardNum', { clickBtn: clickBtn, num: remoteCard });
};
