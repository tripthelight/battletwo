import screenTap from '@/client/js/views/game/taptap/fns/screenTap';
import touchDot from '@/client/js/views/game/taptap/fns/touchDot';
import interaction from '@/client/js/views/game/taptap/fns/interaction';
import tabGraph from '@/client/js/views/game/taptap/fns/tabGraph';

export default {
  tap: () => {
    const TAP_AREA = document.getElementById('gameScene');
    if (TAP_AREA) {
      const TAP_BOTTOM_COUNT = TAP_AREA.querySelector('.tap-bottom .tap-count');
      if (TAP_BOTTOM_COUNT) {
        TAP_AREA.addEventListener('click', (e) => {
          screenTap(TAP_BOTTOM_COUNT);
          touchDot(e);
          tabGraph.tap();
          interaction.show(Number(window.sessionStorage.getItem('tap-count')) - Number(window.sessionStorage.getItem('enemyCount')));
        });
      }
    }
  },
  untap: () => {
    const TAP_AREA = document.getElementById('gameScene');
    TAP_AREA.removeEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  },
};
