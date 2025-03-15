import interaction from '@/client/js/views/game/taptap/interaction';

export default (interTxt) => {
  if (!document.querySelector('.interaction')) {
    const INTER_AREA = document.getElementById('gameScene');
    let interEl = document.createElement('div');
    let inner = document.createElement('span');
    inner.innerText = interTxt;
    interEl.classList.add('interaction');
    interEl.appendChild(inner);
    INTER_AREA.appendChild(interEl);
    interaction.hide(interEl);
  }
};
