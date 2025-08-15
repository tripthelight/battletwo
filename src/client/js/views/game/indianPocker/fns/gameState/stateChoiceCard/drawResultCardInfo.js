import { text } from '@/client/js/functions/language';
import stateResultBetting from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/stateResultBetting';

export default (_state) => {
  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) throw { errCase: 'elementLoss', message: '#container 엘리먼트가 없습니다.' };
  const CHOICE_CARD_INFO = CONTAINER.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) return;

  // 명령
  const elem = document.createElement('div');
  const inner = document.createElement('div');
  const spanEl = document.createElement('span');
  const btnClose = document.createElement('button');
  const bg = document.createElement('div');
  bg.classList.add('popup-bg');
  inner.classList.add('popup-inner');
  btnClose.setAttribute('aria-label', text.popup.btnClose);

  if (_state === 'start') spanEl.innerHTML = text.orderStart;
  else if (_state === 'end') spanEl.innerHTML = text.orderEnd;
  else if (_state === 'tie') spanEl.innerHTML = text.orderTie;

  btnClose.classList.add('close-popup');
  inner.appendChild(btnClose);
  inner.appendChild(spanEl);
  elem.appendChild(bg);
  elem.appendChild(inner);
  elem.classList.add('choice-card-info');
  elem.classList.add('modal-popup');
  CONTAINER.appendChild(elem);

  btnClose.onclick = async () => {
    try {
      await stateResultBetting(_state);
      if (document.querySelector('.choice-card-info')) document.querySelector('.choice-card-info').remove();
    } catch (error) {
      console.log('error : ', error);
      console.log('drawResultCardInfo.js onclick error : ');

      const { request } = await import('@/client/js/network/indianPocker/request');
      request('opponentFouls', { message: error?.sendMsg ?? 'remote player error' });

      const { default: eventHanlerErrorComn } = await import('@/client/js/module/eventHanlerErrorComn');
      const safe = (error && typeof error === 'object') ? error : {};
      eventHanlerErrorComn({
        errCase: 'errorComn',
        errorDetails: error,
        ...safe
      });
    }
  };
};
