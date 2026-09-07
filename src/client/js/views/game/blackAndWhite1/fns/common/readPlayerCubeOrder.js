import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 현재 화면에 보이는 내 Cube 순서를 DOM 기준으로 읽는다.
 *
 * PC shuffle은 li의 숫자를 swap하고,
 * Mobile shuffle은 li element 자체의 위치를 바꾼다.
 * 따라서 두 입력 방식 모두 최종 ul.cube > li 순서를 읽는 것이
 * 실제 Player가 확정한 shuffle 결과를 얻는 가장 단순하고 정확한 방법이다.
 *
 * Ready 단계의 Cube는 반드시 0~8을 한 번씩만 가져야 한다.
 *
 * @returns {number[]} 현재 Cube 순서
 */
export default function readPlayerCubeOrder() {
  const cube = document.querySelector('ul.cube');

  if (!cube) {
    throw throwObj(
      'elementLoss',
      'readPlayerCubeOrder - cube failed.'
    );
  }

  const cubeItems = Array.from(cube.children).filter(
    (item) => item.tagName === 'LI'
  );

  if (cubeItems.length !== 9) {
    throw throwObj(
      'dataManipulation',
      'readPlayerCubeOrder - cube length failed.'
    );
  }

  const playerNumOrder = cubeItems.map((item) => {
    const raw = item.textContent?.trim() ?? '';

    if (!/^[0-8]$/.test(raw)) {
      throw throwObj(
        'dataManipulation',
        'readPlayerCubeOrder - cube number failed.'
      );
    }

    return Number(raw);
  });

  if (new Set(playerNumOrder).size !== 9) {
    throw throwObj(
      'dataManipulation',
      'readPlayerCubeOrder - duplicate cube failed.'
    );
  }

  return playerNumOrder;
}
