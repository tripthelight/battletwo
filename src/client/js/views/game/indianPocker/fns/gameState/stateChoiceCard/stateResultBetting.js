import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

/**
 * 두 peer 모두 선플레이어 결정 카드를 선택 후 안내팝업의 X 버튼 클릭
 * @param {string} _state start: 내가 높음 | end: 내가 낮음 | tie: 같은 카드
 * @returns
 */
export default async (_state) => {
  // betUser, betUserFirst data 검증
  dataHandler({
    p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    p3: findCharCode([66, 72, 73, 78, 89, 65, 84, 77, 83, 86]), // clickResultBetting
    clkData: _state, // 선택 결과
  });
};
