import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { findIndexElem, findIndex } from '@/client/js/functions/comnExport';
import showChoiceCardSrc from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCardSrc';
import makeSeq from '@/client/js/views/game/indianPocker/fns/common/mappingCardNum';

export default (_event, _playerNum) => {
  // element | seeeion 체크
  const TARGET = _event.target;
  if (!TARGET) throw {
    errCase: 'elementLoss',
    message: 'local peer target failed.',
    sendMsg: 'remote peer target failed.'
  };
  const TARGET_WRAP = TARGET.closest('.choice-card');
  if (!TARGET_WRAP) throw {
    errCase: 'elementLoss',
    message: 'local peer .choice-card in target failed.',
    sendMsg: 'remote peer .choice-card in target failed.'
  };
  const TARGET_UL = TARGET.closest('ul');
  if (!TARGET_UL) throw {
    errCase: 'elementLoss',
    message: 'local peer closest ul in target failed.',
    sendMsg: 'remote peer closest ul in target failed.'
  };
  const TARGET_LI = TARGET.closest('li');
  if (!TARGET_LI) throw {
    errCase: 'elementLoss',
    message: 'local peer closest li in target failed.',
    sendMsg: 'remote peer closest li in target failed.'
  };
  const TARGET_TAG_NAME = TARGET.tagName === 'IMG' ? TARGET : TARGET.querySelector('img');
  if (!TARGET_TAG_NAME) throw {
    errCase: 'elementLoss',
    message: 'local peer tagName in target failed.',
    sendMsg: 'remote peer tagName in target failed.'
  };
  if (TARGET_LI.classList.contains('show')) return;

  // 명령
  // 먼저 카드를 선택한 player의 카드를 storage에 저장
  const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptKey2 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
  const encryptKey3 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex

  storageMethod('s', 'SET_ITEM', encryptKey1, _playerNum);

  // 내가 클릭한 카드버튼이 속한 ul의 index : 두줄이니까 0 or 1
  const uIdx = findIndexElem(TARGET_UL, TARGET_WRAP);
  const uRes = findCharCode(makeSeq(uIdx)); // makeSeq 는 0 ~ 1 중 하나를 받아서 1 ~ 1 중 +1된 결과를 리턴
  storageMethod('s', 'SET_ITEM', encryptKey2, uRes);
  // 내가 클릭한 카드버튼이 속한 ul > li의 index : 10개니까 0 ~ 9 중 하나
  const lIdx = findIndex(TARGET_LI);
  const lRes = findCharCode(makeSeq(lIdx)); // makeSeq 는 0 ~ 9 중 하나를 받아서 1 ~ 10 중 +1된 결과를 리턴
  storageMethod('s', 'SET_ITEM', encryptKey3, lRes);

  TARGET_LI.classList.add('show');
  showChoiceCardSrc(TARGET_TAG_NAME, _playerNum);
};
