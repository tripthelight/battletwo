import tabGraph from '@/client/js/views/game/taptap/tabGraph';
import storageMethod from '@/client/js/module/storage/storageMethod.js';

export default (count) => {
  storageMethod('s', 'SET_ITEM', 'enemyCount', count);
  document.querySelector('.tap-top .tap-count').value = count;
  tabGraph.tap();
};
