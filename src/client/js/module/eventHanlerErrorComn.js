import delCookies from '@/client/js/module/cookies/delCookies';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';

/**
 * CARDS[i].onclick = ...은 등록만 해두는 것이고
 * 실제로 onclick 함수는 나중에 브라우저(이벤트 시스템)가 호출합니다.
 * → 그래서 choiceCardsClick()의 호출 컨텍스트와는 완전히 별개입니다.
 * 따라서 choiceCardsClick()을 try-catch로 감싸도,
 * 그 안에서 등록된 이벤트 핸들러의 예외는 절대 못 잡습니다.
 */
export default (error) => {
  // delCookies('gc_at');
  storageMethod('s', 'REMOVE_ALL');
  if (window['rtcChannels']) {
    if (
      window.rtcChannels.dataChannel &&
      window.rtcChannels.dataChannel.readyState === 'open'
    ) {
      window.rtcChannels.dataChannel.close();
    };
    if (
      window.rtcChannels.peerConnection &&
      window.rtcChannels.peerConnection.connectionState === 'connected'
    ) {
      window.rtcChannels.peerConnection.close();
    };
  };
  errorManagement(error);
};
