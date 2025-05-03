import CRADS from '@/client/js/views/game/indianPocker/fns/common/images/cardLists';

export default (_num) => {
  let num;
  for (let i = 0; i < CRADS.length; i++) {
    if (i + 1 === Number(_num)) {
      num = CRADS[i];
    }
  }
  return num;
};
