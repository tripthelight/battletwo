import CryptoJS from 'crypto-js';
import { RF_END_DREW } from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/refreshDrewInit';
import { request } from '@/client/js/communication/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';

export default (cardList) => {
  console.log('cardList >>>>>>>>>> ', cardList);
  // 내 secret key로 받은 카드 리스트 평문을 암호화 해서 응답

  const secretKeytext = '93b4642b183214b64cc00b0db6dc9e3d2784cfa2d7ed3db4827cfef0a69eda1c';

  // AES로 암호화
  const hash = CryptoJS.AES.encrypt(cardList, secretKeytext).toString();
  request('responseMakeCard', { list: hash });
};
