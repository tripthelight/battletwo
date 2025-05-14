import refreshDrawChoicePlayerCard from '@/client/js/refresh/indianpoker/refreshChoiceCard/refreshDrawChoicePlayerCard.js';
import refreshDrawChoiceEnemyCard from '@/client/js/refresh/indianpoker/refreshChoiceCard/refreshDrawChoiceEnemyCard.js';
import refreshDrewChoiceLoading from '@/client/js/refresh/indianpoker/refreshChoiceCard/refreshDrewChoiceLoading.js';
import refreshDrewChoiceReady from '@/client/js/refresh/indianpoker/refreshChoiceCard/refreshDrewChoiceReady.js';

export default {
  main: () => {
    refreshDrawChoicePlayerCard();
    refreshDrawChoiceEnemyCard();
    refreshDrewChoiceLoading();
    refreshDrewChoiceReady();
  },
};
