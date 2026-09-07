import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { reactiveState } from '@/client/js/views/game/blackAndWhite1/fns/common/variable';
import readPlayerCubeOrder from '@/client/js/views/game/blackAndWhite1/fns/common/readPlayerCubeOrder';

/**
 * 현재 DOM에 보이는 Cube 순서를 playerNumOrder로 저장한다.
 *
 * 기존 구현은 PC drag가 사용하는 idxS/idxE만 swap하여 저장했기 때문에,
 * li element 자체를 재배치하는 Mobile shuffle에서는 실제 화면 순서가
 * storage에 반영되지 않았다.
 *
 * 이제 PC/Mobile 모두 최종 DOM 순서를 단일 source of truth로 사용한다.
 *
 * @returns {number[]} 저장한 Cube 순서
 */
export default function saveSessionStorage() {
  try {
    const privateKey = KEY?.prk ?? null;

    if (!privateKey) {
      throw throwObj(
        'errorComn',
        'saveSessionStorage - order encrypt key failed.'
      );
    }

    const playerNumOrder = readPlayerCubeOrder();

    // Ready shuffle에서 사용한 임시 PC index는 저장 완료 즉시 정리한다.
    // playing의 selectDragStart가 idxS를 다시 사용하므로 이전 값이
    // 다음 단계까지 남지 않도록 한다.
    reactiveState.idxS = null;
    reactiveState.idxE = null;

    console.log('옯긴 큐브 순서 >>>>>>>> ', playerNumOrder);

    const orderStr = playerNumOrder.join('');
    const hash = CryptoJS.AES.encrypt(orderStr, privateKey).toString();

    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
      hash
    );

    return playerNumOrder;
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'saveSessionStorage.js error'
    );
  }
}
