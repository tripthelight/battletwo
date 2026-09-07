import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { request } from '@/client/js/network/blackAndWhite1/request';
import cubeColorCode from '@/client/js/views/game/blackAndWhite1/fns/common/cubeColorCode';
import readPlayerCubeOrder from '@/client/js/views/game/blackAndWhite1/fns/common/readPlayerCubeOrder';

/**
 * 내 최종 Cube 순서를 색상 정보로 변환해 상대 Peer에게 전달한다.
 *
 * saveSessionStorage()가 반환한 검증 완료 order를 전달받으면 그대로 재사용하고,
 * 직접 호출된 경우에만 DOM에서 다시 읽는다.
 *
 * @param {number[]|null} savedOrder 검증 완료된 playerNumOrder
 */
export default function cubeNumCheck(savedOrder = null) {
  try {
    const privateKey = KEY?.prk ?? null;

    if (!privateKey) {
      throw throwObj(
        'errorComn',
        'cubeNumCheck - order encrypt key failed.'
      );
    }

    const playerNumOrder = Array.isArray(savedOrder)
      ? savedOrder
      : readPlayerCubeOrder();

    if (
      playerNumOrder.length !== 9 ||
      new Set(playerNumOrder).size !== 9 ||
      playerNumOrder.some(
        (num) => !Number.isInteger(num) || num < 0 || num > 8
      )
    ) {
      throw throwObj(
        'dataManipulation',
        'cubeNumCheck - playerNumOrder failed.'
      );
    }

    const cubeColors = playerNumOrder.map((num, index) => (
      cubeColorCode(num % 2 === 0, index)
    ));

    const orderStr = cubeColors.join('');
    const hash = CryptoJS.AES.encrypt(orderStr, privateKey).toString();

    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([79, 77, 69, 88, 68, 89, 65, 70, 67, 78]), // numArr
      hash
    );

    request('enemyCubeOrder', { order: cubeColors });
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'cubeNumCheck.js error'
    );
  }
}
