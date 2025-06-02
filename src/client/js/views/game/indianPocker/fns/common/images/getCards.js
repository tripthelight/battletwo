import CRADS from '@/client/js/views/game/indianPocker/fns/common/images/cardLists';

/*
export default (_num) => {
  let num;
  for (let i = 0; i < CRADS.length; i++) {
    if (i + 1 === Number(_num)) {
      num = CRADS[i];
    }
  }
  return num;
};
*/
/*
export default (_num) => {
  const index = Number(_num) - 1;
  return CRADS.find((_, i) => i === index);
};
*/
export default (_num) => CRADS[Number(_num) - 1];
