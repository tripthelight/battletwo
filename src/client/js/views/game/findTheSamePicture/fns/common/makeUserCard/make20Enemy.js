import throwObj from '@/client/js/module/errorHandler/throwObj';
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";

export default async (_arr) => {
  try {
    const MAKE_USER_CARD = await makeUserCard();

    return new Promise((resolve, reject) => {
      let cardShuffle = [];
      for (let i = 0; i < _arr.length; i++) {
        cardShuffle.push(MAKE_USER_CARD[_arr[i]]);
      }
      resolve(cardShuffle);
    });
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', error?.message ?? 'make 20 error');
  }
};
