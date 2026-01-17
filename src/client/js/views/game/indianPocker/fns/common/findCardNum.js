import findCharCode from '@/client/js/functions/findCharCode';

export default (_code) => {
  const decoder = (n1, n2, n3, n4) => {
    let uint8Array = new Uint8Array([n1, n2, n3, ...(n4 !== undefined ? [n4] : [])]);
    let binaryString = uint8Array.subarray(1, -1);
    return new TextDecoder().decode(binaryString);
  };
  switch (_code) {
    // NUM 1
    case findCharCode([70, 75, 89, 88, 73, 78, 67, 86, 85, 80]):
      return decoder(28 + 45, 100 / 2 - 1, 14 + 7); // 1 49
    // NUM 2
    case findCharCode([67, 87, 89, 84, 72, 77, 85, 71, 76, 68]):
      return decoder(31 + 8, 5 * 11 - 5, 22 + 29); // 2 50
    // NUM 3
    case findCharCode([76, 88, 83, 71, 77, 90, 65, 89, 85, 70]):
      return decoder(29 + 27, 100 / 2 + 1, 40 + 25); // 3 51
    // NUM 4
    case findCharCode([84, 82, 72, 76, 85, 69, 75, 89, 80, 73]):
      return decoder(13 + 7, 7 * 8 - 4, 4 + 41); // 4 52
    // NUM 5
    case findCharCode([72, 70, 83, 80, 79, 69, 87, 66, 68, 73]):
      return decoder(13 + 23, 100 / 2 + 3, 7 + 4); // 5 53
    // NUM 6
    case findCharCode([82, 84, 65, 83, 81, 79, 67, 71, 73, 90]):
      return decoder(7 + 38, 7 * 8 - 2, 28 + 6); // 6 54
    // NUM 7
    case findCharCode([89, 75, 73, 81, 72, 82, 87, 79, 77, 74]):
      return decoder(13 + 47, 100 / 2 + 5, 50 + 17); // 7 55
    // NUM 8
    case findCharCode([82, 80, 83, 71, 76, 68, 84, 89, 70, 67]):
      return decoder(30 + 29, 9 * 7 - 7, 11 + 5); // 8 56
    // NUM 9
    case findCharCode([69, 74, 76, 85, 73, 77, 84, 88, 80, 67]):
      return decoder(30 + 29, 7 * 5 + 22, 11 + 5); // 8 57
    // NUM 10
    case findCharCode([75, 69, 67, 68, 78, 66, 70, 65, 88, 77]):
      return decoder(27 + 30, 100 / 2 - 1, 10 * 5 - 2, 42 + 8); // 10 49, 48
    default:
      throw {
        errCase: 'cardNum',
        message: 'local drawEnemyCard.js - not find card',
        sendMsg: 'remote drawEnemyCard.js - not find card',
      };
  }
};
