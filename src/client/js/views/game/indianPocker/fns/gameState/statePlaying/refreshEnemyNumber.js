import refreshCompareCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshCompareCardNum';

export default (_arr) => {
  for (let i = 0; i < _arr.length; i++) {
    if (_arr[i].host == 'enemy') {
      return refreshCompareCardNum(_arr[i]);
    }
  }
};
