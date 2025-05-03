import { timeInterval_1, timeInterval_201 } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import { findIndexElem, findIndex } from '@/client/js/functions/comnExport';
import showChoiceCardSrc from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCardSrc';

export default (_event, _playerNum) => {
  // element | seeeion 체크
  const TARGET = _event.target;
  if (!TARGET) return errorManagement({ errCase: 'errorComn', message: 'TARGET이 없습니다.' });

  const TARGET_WRAP = TARGET.closest('.choice-card');
  if (!TARGET_WRAP) return errorManagement({ errCase: 'errorComn', message: 'TARGET의 closest .choice-card가 없습니다.' });

  const TARGET_UL = TARGET.closest('ul');
  if (!TARGET_UL) return errorManagement({ errCase: 'errorComn', message: 'TARGET의 closest ul이 없습니다.' });

  const TARGET_LI = TARGET.closest('li');
  if (!TARGET_LI) return errorManagement({ errCase: 'errorComn', message: 'TARGET의 closest li가 없습니다.' });

  const TARGET_TAG_NAME = TARGET.tagName == 'IMG' ? TARGET : TARGET.querySelector('img');
  if (!TARGET_TAG_NAME) return errorManagement({ errCase: 'errorComn', message: 'TARGET의 tagName이 없습니다.' });

  if (TARGET_LI.classList.contains('show')) return;

  // 명령
  setTimeout(() => {
    storageMethod('s', 'SET_ITEM', 'playerFirstNumber', _playerNum);
    TARGET_LI.classList.add('show');
    storageMethod('s', 'SET_ITEM', 'ulIndex', findIndexElem(TARGET_UL, TARGET_WRAP));
    storageMethod('s', 'SET_ITEM', 'liIndex', findIndex(TARGET_LI));
    setTimeout(showChoiceCardSrc, timeInterval_201, TARGET_TAG_NAME, _playerNum);
  }, timeInterval_1);
};
