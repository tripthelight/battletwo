import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

/**
 * 게임 결과를 sessionStorage에 저장하는 공통함수
 * @param {boolean} _result true | false
 */
export default (_result) => {
  storageMethod('s', 'SET_ITEM',
    findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]), // result
    _result
  );
}
