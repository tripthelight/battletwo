import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/communication/indianPocker/request';

export default function requestEnterChoiceCard() {
  const keys = [
    findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]), // ulIndex
    findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]), // liIndex
    findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]), // playerFirstNumber
    findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]), // ulIndexEnemy
    findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]), // liIndexEnemy
    findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]), // enemyFirstNumber
    findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]), // enemyCardChoiceReady
  ];

  request('responseEnterChoiceCard', { keys: keys });
}
