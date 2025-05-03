import tabGraph from '@/client/js/views/game/taptap/fns/tabGraph';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default (count) => {
  storageMethod('s', 'SET_ITEM', 'enemyCount', count);
  document.querySelector('.tap-top .tap-count').value = count;
  tabGraph.tap();
};
