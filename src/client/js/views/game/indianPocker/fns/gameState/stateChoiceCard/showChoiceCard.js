import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { findIndexElem, findIndex } from '@/client/js/functions/comnExport';
import showChoiceCardSrc from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCardSrc';

export default (_event, _playerNum) => {
  // element | seeeion 체크
  const TARGET = _event.target;
  if (!TARGET) throw { errCase: 'errorComn', message: 'TARGET이 없습니다.' };

  const TARGET_WRAP = TARGET.closest('.choice-card');
  if (!TARGET_WRAP) throw { errCase: 'errorComn', message: 'TARGET의 closest .choice-card가 없습니다.' };

  const TARGET_UL = TARGET.closest('ul');
  if (!TARGET_UL) throw { errCase: 'errorComn', message: 'TARGET의 closest ul이 없습니다.' };

  const TARGET_LI = TARGET.closest('li');
  if (!TARGET_LI) throw { errCase: 'errorComn', message: 'TARGET의 closest li가 없습니다.' };

  const TARGET_TAG_NAME = TARGET.tagName === 'IMG' ? TARGET : TARGET.querySelector('img');
  if (!TARGET_TAG_NAME) throw { errCase: 'errorComn', message: 'TARGET의 tagName이 없습니다.' };

  if (TARGET_LI.classList.contains('show')) return;

  // 명령
  // 먼저 카드를 선택한 player의 카드를 storage에 저장
  const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptKey2 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
  const encryptKey3 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex

  storageMethod('s', 'SET_ITEM', encryptKey1, _playerNum);

  TARGET_LI.classList.add('show');

  storageMethod('s', 'SET_ITEM', encryptKey2, findIndexElem(TARGET_UL, TARGET_WRAP));
  storageMethod('s', 'SET_ITEM', encryptKey3, findIndex(TARGET_LI));
  showChoiceCardSrc(TARGET_TAG_NAME, _playerNum);
};
