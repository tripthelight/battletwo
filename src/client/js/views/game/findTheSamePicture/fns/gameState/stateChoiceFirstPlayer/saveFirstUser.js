import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import firstSessionInit from '@/client/js/views/game/findTheSamePicture/fns/common/firstSessionInit';

export default (_data) => {
  firstSessionInit({
    nicknameList: _data.nicknameList,
    firstUser: _data.firstUser,
    alpabetList: _data.alpabetList,
    cardImgs: _data.cardImgs,
    randomNums: _data.randomNums,
    arr: _data.arr,
  });

  findTheSamePictureGameState.firstUserAni();
};
