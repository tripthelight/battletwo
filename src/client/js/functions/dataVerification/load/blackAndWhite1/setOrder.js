import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';
import { request } from '@/client/js/network/blackAndWhite1/request';

import waitSetOrder from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/waitSetOrder';
import { startSetOrderRecovery } from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/setOrderRecovery';

export const SET_ORDER_HANDLER = {
  // gameState : setOrder 에서 reload 한 경우
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    }

    // 새 document에는 setOrder 애니메이션 DOM/타이머가 없으므로
    // 애니메이션을 임의로 다시 시작하지 않고 상대의 진행 상태를 기다린다.
    startSetOrderRecovery();

    // 양쪽 Peer가 모두 setOrder에서 reload 되었는지 확인하기 위한 probe.
    // 한쪽만 reload 된 경우 일반 setOrder Peer는 이 probe에 응답하지 않고,
    // 원래 애니메이션 완료 후 playing 신호를 보내게 된다.
    request('setOrderResumeProbe', { recovering: true });

    waitSetOrder();
  },

  // gameState : setOrder 에 처음 입장
  handleInitialLoad(storageKeys) {
    // 모든 sessionStorage key를 순회하면서 필요한 data insert
    for (const key of storageKeys) {
      const val = window.sessionStorage.getItem(key);

      if (val === null) {
        // sessionStorage에 key가 없을 경우 빈문자열 삽입
        storageMethod('s', 'SET_ITEM', key, '');
      } else {
        storageMethod('s', 'SET_ITEM', key, val);
      }
    }

    // setOrder 단계에서 필요한 data insert 후 다음 단계 진행
    waitSetOrder();
  },
};
