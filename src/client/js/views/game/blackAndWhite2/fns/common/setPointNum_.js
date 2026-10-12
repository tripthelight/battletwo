import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';

/**
 * 선플레이어가 입력한 Point를 난독화해서 SessionStorage에 저장하기 위한 난독화 문자열을 리턴
 * @param {number} _l - 입력한 Point의 10자리 숫자
 * @param {number} _r - 입력한 Point의 1자리 숫자
 * @param {string} _rnd - 현재 Round
 * @returns {string} 10자리 숫자의 난독화된 문자열 + 1자리 숫자의 난독화된 문자열
 */
export default (_l, _r, _rnd) => {
  switch (_rnd) {
    // 1 Round
    case findCharCode([74, 90, 87, 85, 82, 81, 78, 70, 84, 65]):
      if (_l === 0) {
        const r1l = findCharCode([66, 76, 65, 90, 89]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 1) {
        const r1l = findCharCode([69, 80, 90, 78, 67]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 2) {
        const r1l = findCharCode([70, 72, 67, 71, 76]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 3) {
        const r1l = findCharCode([72, 85, 82, 84, 69]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 4) {
        const r1l = findCharCode([75, 65, 87, 76, 68]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 5) {
        const r1l = findCharCode([76, 89, 78, 72, 84]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 6) {
        const r1l = findCharCode([79, 82, 78, 73, 88]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 7) {
        const r1l = findCharCode([81, 84, 83, 82, 74]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 8) {
        const r1l = findCharCode([84, 77, 79, 68, 74]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else if (_l === 9) {
        const r1l = findCharCode([86, 78, 75, 89, 72]);
        if (_r === 0) {
          return r1l + findCharCode([69, 68, 76, 71, 65]);
        } else if (_r === 1) {
          return r1l + findCharCode([70, 67, 84, 75, 65]);
        } else if (_r === 2) {
          return r1l + findCharCode([72, 82, 73, 78, 89]);
        } else if (_r === 3) {
          return r1l + findCharCode([73, 79, 74, 82, 86]);
        } else if (_r === 4) {
          return r1l + findCharCode([75, 86, 77, 71, 81]);
        } else if (_r === 5) {
          return r1l + findCharCode([77, 78, 67, 71, 69]);
        } else if (_r === 6) {
          return r1l + findCharCode([81, 79, 82, 68, 66]);
        } else if (_r === 7) {
          return r1l + findCharCode([82, 66, 78, 72, 80]);
        } else if (_r === 8) {
          return r1l + findCharCode([85, 90, 80, 65, 77]);
        } else if (_r === 9) {
          return r1l + findCharCode([86, 83, 75, 73, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 1 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 1 point left number failed.');
      };
    // 2 Round
    case findCharCode([76, 88, 90, 81, 82, 72, 85, 71, 86, 66]):
      if (_l === 0) {
        const r2l = findCharCode([65, 70, 73, 68, 83]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 1) {
        const r2l = findCharCode([72, 89, 85, 76, 84]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 2) {
        const r2l = findCharCode([77, 72, 85, 81, 70]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 3) {
        const r2l = findCharCode([80, 89, 78, 70, 74]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 4) {
        const r2l = findCharCode([83, 66, 89, 65, 71]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 5) {
        const r2l = findCharCode([83, 80, 78, 87, 65]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 6) {
        const r2l = findCharCode([85, 71, 69, 67, 76]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 7) {
        const r2l = findCharCode([87, 73, 89, 74, 72]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 8) {
        const r2l = findCharCode([87, 82, 84, 69, 76]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else if (_l === 9) {
        const r2l = findCharCode([89, 72, 88, 74, 80]);
        if (_r === 0) {
          return r2l + findCharCode([72, 74, 71, 76, 67]);
        } else if (_r === 1) {
          return r2l + findCharCode([75, 70, 83, 66, 69]);
        } else if (_r === 2) {
          return r2l + findCharCode([77, 74, 65, 68, 83]);
        } else if (_r === 3) {
          return r2l + findCharCode([82, 86, 71, 79, 66]);
        } else if (_r === 4) {
          return r2l + findCharCode([83, 76, 71, 73, 81]);
        } else if (_r === 5) {
          return r2l + findCharCode([83, 81, 67, 79, 80]);
        } else if (_r === 6) {
          return r2l + findCharCode([86, 69, 84, 83, 73]);
        } else if (_r === 7) {
          return r2l + findCharCode([87, 79, 72, 86, 89]);
        } else if (_r === 8) {
          return r2l + findCharCode([88, 68, 83, 81, 73]);
        } else if (_r === 9) {
          return r2l + findCharCode([89, 77, 67, 68, 76]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 2 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 2 point left number failed.');
      }
    // 3 Round
    case findCharCode([80, 66, 88, 74, 85, 68, 82, 90, 84, 83]):
      if (_l === 0) {
        const r3l = findCharCode([65, 83, 67, 74, 84]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 1) {
        const r3l = findCharCode([67, 86, 76, 84, 90]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 2) {
        const r3l = findCharCode([74, 66, 67, 76, 84]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 3) {
        const r3l = findCharCode([76, 88, 70, 86, 65]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 4) {
        const r3l = findCharCode([78, 66, 65, 69, 88]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 5) {
        const r3l = findCharCode([79, 71, 74, 77, 83]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 6) {
        const r3l = findCharCode([80, 81, 71, 83, 72]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 7) {
        const r3l = findCharCode([85, 86, 84, 65, 82]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 8) {
        const r3l = findCharCode([87, 86, 66, 67, 69]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else if (_l === 9) {
        const r3l = findCharCode([89, 79, 86, 81, 65]);
        if (_r === 0) {
          return r3l + findCharCode([66, 88, 76, 74, 81]);
        } else if (_r === 1) {
          return r3l + findCharCode([68, 86, 77, 85, 72]);
        } else if (_r === 2) {
          return r3l + findCharCode([74, 73, 65, 75, 85]);
        } else if (_r === 3) {
          return r3l + findCharCode([77, 80, 85, 84, 69]);
        } else if (_r === 4) {
          return r3l + findCharCode([78, 83, 87, 77, 73]);
        } else if (_r === 5) {
          return r3l + findCharCode([80, 76, 89, 78, 87]);
        } else if (_r === 6) {
          return r3l + findCharCode([80, 85, 81, 65, 90]);
        } else if (_r === 7) {
          return r3l + findCharCode([86, 70, 80, 90, 79]);
        } else if (_r === 8) {
          return r3l + findCharCode([88, 68, 90, 74, 81]);
        } else if (_r === 9) {
          return r3l + findCharCode([90, 70, 68, 72, 71]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 3 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 3 point left number failed.');
      }
    // 4 Round
    case findCharCode([79, 78, 84, 77, 73, 85, 89, 88, 75, 70]):
      if (_l === 0) {
        const r4l = findCharCode([66, 90, 65, 69, 88]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 1) {
        const r4l = findCharCode([69, 73, 68, 67, 76]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 2) {
        const r4l = findCharCode([70, 73, 78, 74, 68]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 3) {
        const r4l = findCharCode([71, 84, 65, 86, 73]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 4) {
        const r4l = findCharCode([74, 87, 90, 89, 78]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 5) {
        const r4l = findCharCode([76, 88, 71, 68, 77]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 6) {
        const r4l = findCharCode([78, 72, 79, 73, 68]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 7) {
        const r4l = findCharCode([78, 88, 74, 79, 83]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 8) {
        const r4l = findCharCode([79, 81, 87, 65, 89]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else if (_l === 9) {
        const r4l = findCharCode([84, 80, 87, 77, 78]);
        if (_r === 0) {
          return r4l + findCharCode([68, 83, 69, 89, 72]);
        } else if (_r === 1) {
          return r4l + findCharCode([69, 76, 70, 82, 85]);
        } else if (_r === 2) {
          return r4l + findCharCode([71, 81, 80, 70, 78]);
        } else if (_r === 3) {
          return r4l + findCharCode([72, 77, 74, 76, 70]);
        } else if (_r === 4) {
          return r4l + findCharCode([74, 88, 83, 87, 86]);
        } else if (_r === 5) {
          return r4l + findCharCode([76, 90, 88, 84, 78]);
        } else if (_r === 6) {
          return r4l + findCharCode([78, 87, 76, 84, 80]);
        } else if (_r === 7) {
          return r4l + findCharCode([79, 65, 78, 81, 90]);
        } else if (_r === 8) {
          return r4l + findCharCode([81, 88, 73, 76, 79]);
        } else if (_r === 9) {
          return r4l + findCharCode([87, 79, 83, 82, 78]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 4 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 4 point left number failed.');
      }
    // 5 Round
    case findCharCode([68, 74, 78, 90, 73, 76, 67, 65, 85, 77]):
      if (_l === 0) {
        const r5l = findCharCode([65, 67, 74, 84, 78]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 1) {
        const r5l = findCharCode([67, 70, 74, 83, 90]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 2) {
        const r5l = findCharCode([73, 75, 77, 68, 76]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 3) {
        const r5l = findCharCode([73, 89, 75, 76, 88]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 4) {
        const r5l = findCharCode([74, 76, 79, 72, 88]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 5) {
        const r5l = findCharCode([75, 88, 85, 77, 80]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 6) {
        const r5l = findCharCode([78, 70, 80, 86, 90]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 7) {
        const r5l = findCharCode([81, 78, 84, 73, 89]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 8) {
        const r5l = findCharCode([86, 65, 74, 72, 88]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else if (_l === 9) {
        const r5l = findCharCode([89, 66, 81, 78, 74]);
        if (_r === 0) {
          return r5l + findCharCode([65, 78, 66, 87, 72]);
        } else if (_r === 1) {
          return r5l + findCharCode([68, 76, 65, 73, 74]);
        } else if (_r === 2) {
          return r5l + findCharCode([73, 75, 87, 77, 67]);
        } else if (_r === 3) {
          return r5l + findCharCode([74, 69, 75, 65, 86]);
        } else if (_r === 4) {
          return r5l + findCharCode([75, 81, 82, 73, 72]);
        } else if (_r === 5) {
          return r5l + findCharCode([76, 70, 66, 68, 65]);
        } else if (_r === 6) {
          return r5l + findCharCode([79, 83, 73, 67, 74]);
        } else if (_r === 7) {
          return r5l + findCharCode([85, 88, 89, 74, 66]);
        } else if (_r === 8) {
          return r5l + findCharCode([88, 78, 67, 76, 75]);
        } else if (_r === 9) {
          return r5l + findCharCode([90, 85, 73, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 5 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 5 point left number failed.');
      }
    // 6 Round
    case findCharCode([82, 81, 77, 83, 84, 88, 74, 69, 67, 80]):
      if (_l === 0) {
        const r6l = findCharCode([65, 66, 75, 86, 82]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 1) {
        const r6l = findCharCode([68, 73, 88, 82, 75]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 2) {
        const r6l = findCharCode([69, 88, 84, 78, 90]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 3) {
        const r6l = findCharCode([72, 69, 68, 86, 87]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 4) {
        const r6l = findCharCode([75, 79, 81, 82, 83]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 5) {
        const r6l = findCharCode([78, 76, 65, 69, 82]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 6) {
        const r6l = findCharCode([82, 68, 77, 85, 75]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 7) {
        const r6l = findCharCode([84, 78, 81, 74, 80]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 8) {
        const r6l = findCharCode([84, 90, 74, 65, 80]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else if (_l === 9) {
        const r6l = findCharCode([89, 86, 68, 66, 85]);
        if (_r === 0) {
          return r6l + findCharCode([65, 74, 67, 71, 79]);
        } else if (_r === 1) {
          return r6l + findCharCode([69, 74, 71, 88, 70]);
        } else if (_r === 2) {
          return r6l + findCharCode([70, 75, 65, 89, 71]);
        } else if (_r === 3) {
          return r6l + findCharCode([72, 88, 77, 76, 89]);
        } else if (_r === 4) {
          return r6l + findCharCode([77, 83, 70, 73, 69]);
        } else if (_r === 5) {
          return r6l + findCharCode([80, 88, 84, 85, 78]);
        } else if (_r === 6) {
          return r6l + findCharCode([82, 72, 73, 83, 65]);
        } else if (_r === 7) {
          return r6l + findCharCode([84, 80, 67, 90, 86]);
        } else if (_r === 8) {
          return r6l + findCharCode([85, 82, 81, 86, 67]);
        } else if (_r === 9) {
          return r6l + findCharCode([90, 69, 76, 83, 77]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 6 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 6 point left number failed.');
      }
    // 7 Round
    case findCharCode([89, 83, 75, 67, 81, 76, 70, 65, 80, 88]):
      if (_l === 0) {
        const r7l = findCharCode([65, 88, 81, 83, 87]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 1) {
        const r7l = findCharCode([69, 67, 76, 80, 70]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 2) {
        const r7l = findCharCode([71, 86, 87, 81, 72]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 3) {
        const r7l = findCharCode([74, 68, 84, 66, 80]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 4) {
        const r7l = findCharCode([75, 78, 84, 87, 79]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 5) {
        const r7l = findCharCode([79, 81, 67, 90, 68]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 6) {
        const r7l = findCharCode([81, 89, 67, 75, 87]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 7) {
        const r7l = findCharCode([83, 88, 66, 90, 78]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 8) {
        const r7l = findCharCode([84, 71, 65, 89, 67]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else if (_l === 9) {
        const r7l = findCharCode([89, 81, 83, 82, 78]);
        if (_r === 0) {
          return r7l + findCharCode([67, 73, 82, 78, 84]);
        } else if (_r === 1) {
          return r7l + findCharCode([70, 77, 85, 67, 84]);
        } else if (_r === 2) {
          return r7l + findCharCode([72, 80, 68, 79, 85]);
        } else if (_r === 3) {
          return r7l + findCharCode([74, 75, 89, 77, 65]);
        } else if (_r === 4) {
          return r7l + findCharCode([76, 84, 82, 73, 68]);
        } else if (_r === 5) {
          return r7l + findCharCode([79, 81, 76, 75, 82]);
        } else if (_r === 6) {
          return r7l + findCharCode([82, 90, 84, 88, 73]);
        } else if (_r === 7) {
          return r7l + findCharCode([84, 68, 90, 80, 66]);
        } else if (_r === 8) {
          return r7l + findCharCode([87, 67, 75, 65, 90]);
        } else if (_r === 9) {
          return r7l + findCharCode([90, 79, 88, 67, 89]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 7 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 7 point left number failed.');
      }
    // 8 Round
    case findCharCode([66, 88, 72, 76, 89, 78, 86, 68, 74, 87]):
      if (_l === 0) {
        const r8l = findCharCode([67, 69, 70, 74, 89]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 1) {
        const r8l = findCharCode([68, 75, 90, 81, 86]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 2) {
        const r8l = findCharCode([69, 77, 75, 79, 73]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 3) {
        const r8l = findCharCode([70, 66, 90, 73, 78]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 4) {
        const r8l = findCharCode([70, 88, 81, 78, 71]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 5) {
        const r8l = findCharCode([81, 77, 87, 65, 74]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 6) {
        const r8l = findCharCode([85, 68, 80, 75, 67]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 7) {
        const r8l = findCharCode([86, 77, 73, 79, 70]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 8) {
        const r8l = findCharCode([87, 74, 67, 85, 89]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else if (_l === 9) {
        const r8l = findCharCode([90, 65, 77, 85, 74]);
        if (_r === 0) {
          return r8l + findCharCode([68, 71, 87, 77, 80]);
        } else if (_r === 1) {
          return r8l + findCharCode([69, 65, 77, 74, 82]);
        } else if (_r === 2) {
          return r8l + findCharCode([69, 88, 83, 71, 67]);
        } else if (_r === 3) {
          return r8l + findCharCode([70, 75, 90, 88, 82]);
        } else if (_r === 4) {
          return r8l + findCharCode([76, 87, 71, 72, 80]);
        } else if (_r === 5) {
          return r8l + findCharCode([83, 88, 72, 85, 70]);
        } else if (_r === 6) {
          return r8l + findCharCode([85, 82, 78, 71, 73]);
        } else if (_r === 7) {
          return r8l + findCharCode([87, 69, 79, 80, 73]);
        } else if (_r === 8) {
          return r8l + findCharCode([88, 84, 85, 81, 87]);
        } else if (_r === 9) {
          return r8l + findCharCode([90, 73, 71, 67, 65]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 8 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 8 point left number failed.');
      }
    // 9 Round
    case findCharCode([89, 72, 81, 88, 65, 78, 74, 83, 84, 85]):
      if (_l === 0) {
        const r9l = findCharCode([65, 90, 71, 89, 82]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 1) {
        const r9l = findCharCode([66, 88, 79, 86, 76]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 2) {
        const r9l = findCharCode([69, 66, 65, 81, 86]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 3) {
        const r9l = findCharCode([70, 90, 73, 89, 71]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 4) {
        const r9l = findCharCode([72, 89, 69, 90, 83]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 5) {
        const r9l = findCharCode([74, 76, 80, 77, 89]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 6) {
        const r9l = findCharCode([78, 86, 88, 81, 87]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 7) {
        const r9l = findCharCode([86, 69, 83, 68, 84]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 8) {
        const r9l = findCharCode([89, 66, 77, 73, 79]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else if (_l === 9) {
        const r9l = findCharCode([89, 83, 88, 74, 86]);
        if (_r === 0) {
          return r9l + findCharCode([66, 70, 79, 81, 90]);
        } else if (_r === 1) {
          return r9l + findCharCode([67, 80, 72, 75, 81]);
        } else if (_r === 2) {
          return r9l + findCharCode([69, 70, 75, 65, 87]);
        } else if (_r === 3) {
          return r9l + findCharCode([71, 78, 90, 80, 72]);
        } else if (_r === 4) {
          return r9l + findCharCode([73, 82, 80, 88, 70]);
        } else if (_r === 5) {
          return r9l + findCharCode([76, 84, 70, 67, 75]);
        } else if (_r === 6) {
          return r9l + findCharCode([80, 76, 82, 86, 88]);
        } else if (_r === 7) {
          return r9l + findCharCode([88, 77, 67, 80, 78]);
        } else if (_r === 8) {
          return r9l + findCharCode([89, 72, 69, 70, 76]);
        } else if (_r === 9) {
          return r9l + findCharCode([90, 73, 65, 70, 72]);
        } else {
          throw throwObj('dataManipulation', 'findPointNum.js - round 9 point right number failed.');
        }
      } else {
        throw throwObj('dataManipulation', 'findPointNum.js - round 9 point left number failed.');
      }
    default:
      throw throwObj('dataManipulation', 'findPointNum.js - round failed.');
  }
};
