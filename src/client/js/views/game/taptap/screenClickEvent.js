import screenTap from '@/client/js/views/game/taptap/screenTap';
import touchDot from '@/client/js/views/game/taptap/touchDot';
import interaction from '@/client/js/views/game/taptap/interaction';
import tabGraph from '@/client/js/views/game/taptap/tabGraph';

export default {
  tap: () => {
    const onDataChannel = window.rtcChannels.onDataChannel;
    const dataChannel = window.rtcChannels.dataChannel;

    const TAP_AREA = document.getElementById('gameScene');
    if (TAP_AREA) {
      const TAP_BOTTOM_COUNT = TAP_AREA.querySelector('.tap-bottom .tap-count');
      if (TAP_BOTTOM_COUNT) {
        TAP_AREA.addEventListener('click', (e) => {
          console.log('onDataChannel : ', onDataChannel);
          console.log('dataChannel : ', dataChannel);
          if (!onDataChannel || !dataChannel) return;

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
