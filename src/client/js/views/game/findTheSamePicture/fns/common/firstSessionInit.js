import storageMethod from '@/client/js/module/storage/storageMethod';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import randomName from "@/client/js/module/randomName";
import encryption from "@/client/js/views/game/findTheSamePicture/fns/common/encryption";
import findCharCode from '@/client/js/functions/findCharCode';

/**
 * @param {Array<string>} nicknameList
 * @param {boolean} firstUser
 * @param {Array<string>} alpabetList
 * @param {Array<number>} cardImgs
 * @param {Array<number>} randomNums
 * @param {Array<number>} arr
 */
export default (_data) => {
  storageMethod('s', 'SET_ITEM',
    findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]), // nicknameList,
    JSON.stringify(_data.nicknameList)
  );
  storageMethod('s', 'SET_ITEM',
    findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]), // clickUser
    _data.firstUser
  );
  storageMethod('s', 'SET_ITEM',
    findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]), // en
    JSON.stringify(_data.arr)
  );

  let randomKeys = [];
  for (let i = 0; i < 6; i++) {
    randomKeys.push(randomName(6));
    storageMethod('s', 'SET_ITEM',
      findCharCode([66, 84, 88, 72, 79, 73, 82, 76, 85, 77]), // rns,
      JSON.stringify(randomKeys)
    );
  }
  // window.sessionStorage.setItem(randomKeys[0], JSON.stringify(_data.alpabetList));
  // window.sessionStorage.setItem(randomKeys[1], JSON.stringify(_data.cardImgs));
  storageMethod('s', 'SET_ITEM', randomKeys[0], JSON.stringify(_data.alpabetList));
  storageMethod('s', 'SET_ITEM', randomKeys[1], JSON.stringify(_data.cardImgs));

  let randomNumHash = [];
  _data.randomNums.map((item) =>
    encryption(item.toString(), 2)
      .then((_nums) => {
        randomNumHash.push(_nums);
        storageMethod('s', 'SET_ITEM', randomKeys[2], JSON.stringify(randomNumHash));
      })
      .catch((error) => errorManager(error, true))
  );
};
