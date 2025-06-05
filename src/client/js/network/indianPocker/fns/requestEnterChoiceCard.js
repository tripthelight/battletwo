import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';

export default function requestEnterChoiceCard() {
  request('responseEnterChoiceCard', {
    keys: storageKeys({
      p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
      p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    }),
  });
}
