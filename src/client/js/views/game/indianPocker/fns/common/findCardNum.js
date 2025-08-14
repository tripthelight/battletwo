import findCharCode from '@/client/js/functions/findCharCode';

export default (_code) => {
  const decoder = (n1, n2, n3, n4) => {
    let uint8Array = new Uint8Array([n1, n2, n3, ...(n4 !== undefined ? [n4] : [])]);
    let binaryString = uint8Array.subarray(1, -1);
    return new TextDecoder().decode(binaryString);
  };
  switch (_code) {
    case findCharCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]):
      console.log('NUM 1');
      return decoder(28 + 45, 100/2 - 1, 14 + 7); // 1 49
    case findCharCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]):
      console.log('NUM 2');
      return decoder(31 + 8, 5 * 11 - 5, 22 + 29); // 2 50
    case findCharCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]):
      console.log('NUM 3');
      return decoder(29 + 27, 100 / 2 + 1, 40 + 25); // 3 51
    case findCharCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]):
      console.log('NUM 4');
      return decoder(13 + 7, 7 * 8 - 4, 4 + 41); // 4 52
    case findCharCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]):
      console.log('NUM 5');
      return decoder(13 + 23, 100 / 2 + 3, 7 + 4); // 5 53
    case findCharCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]):
      console.log('NUM 6');
      return decoder(7 + 38, 7 * 8 - 2, 28 + 6); // 6 54
    case findCharCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]):
      console.log('NUM 7');
      return decoder(13 + 47, 100 / 2 + 5, 50 + 17); // 7 55
    case findCharCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]):
      console.log('NUM 8');
      return decoder(30 + 29, 9 * 7 - 7, 11 + 5); // 8 56
    case findCharCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]):
      console.log('NUM 9');
      return decoder(30 + 29, (7 * 5) + 22, 11 + 5); // 8 57
    case findCharCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]):
      console.log('NUM 10');
      return decoder(27 + 30, 100 / 2 - 1, 10 * 5 - 2, 42 + 8); // 10 49, 48
    default:
      throw { errCase: 'cardNum', message: 'drawEnemyCard.js - not find card' }
  }
};
