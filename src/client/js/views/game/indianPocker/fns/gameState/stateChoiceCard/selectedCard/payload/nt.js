/**
 * 카드에 보여지는 T 문양의 "d" 좌표 문자열 모음
 * 난독화 방식 :
    - 월래 문자열의 끝 "=="을 삭제
    - 기존 문자열의 뒤에 42글자만큼 랜덤한 문자를 추가
    - 그 42글자의 문자열 순서를 뒤집음
 * 원래 문자열 :
    - 1: "Tk0AzQ=="
    - 2: "T00ACU4AkQ=="
    - 3: "SE0AEk0AzU4AiA=="
    - 4: "SU1oEk3YEk5oiE7YiA=="
    - 5: "Sk1oEk3YEk0AzU5oiE7YiA=="
    - 6: "S01oEk3YEk1ozU3YzU5oiE7YiA=="
    - 7: "RE1oEk3YEk0ALE1ozU3YzU5oiE7YiA=="
    - 8: "RU9oEk/YEk8ALE9ozU/YzUgA7khoiEjYiA=="
    - 9: "Rk9oEk/YEk9oIU/YIU8AzUho+UjY+UhoiEjYiA=="
    - 10: "R09oEk/YEk8ANU9oIU/YIUho+UjY+UgA5UhoiEjYiA=="
 */

import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

export default function (_code) {
  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  try {
    switch (_code) {
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]): return "dD8xtjxidJEKFCbT!uD9OZcpdOibTYdIi/oIQzA0kT"; // CARD NUM : 1
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]): return "Ycpwh/+8ibpXbVw+7mcbtU/BvUdkGyi+QkA4UCA00T"; // CARD NUM : 2
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]): return "c/EbnAhcrT6Nc+0OoiEb/IXUDIVOAiA4UzA0kEA0ES"; // CARD NUM : 3
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]): return ">6,he&pR}3R(XabK/gaL7pS5AiY7Eio5kEY3kEo1US"; // CARD NUM : 4
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]): return "mds5my94Vj)_XV9}{cz5AiY7Eio5UzA0kEY3kEo1kS"; // CARD NUM : 5
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]): return "tJf5*jA)ny7I&t[]AiY7Eio5UzY3Uzo1kEY3kEo10S"; // CARD NUM : 6
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]): return "SM9=r-J;VS-vAiY7Eio5UzY3Uzo1ELA0kEY3kEo1ER"; // CARD NUM : 7
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]): return "Tq3QV%?)AiYjEiohk7AgUzY/Uzo9ELA8kEY/kEo9UR"; // CARD NUM : 8
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]): return "v[O2AiYjEiohU+YjU+ohUzA8UIY/UIo9kEY/kEo9kR"; // CARD NUM : 9
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]): return "AiYjEiohU5AgU+YjU+ohUIY/UIo9UNA8kEY/kEo90R"; // CARD NUM : 10
      default: throw throwObj('select card value', 'select card value not found');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'select card value Validation', error?.message ?? 'select card value Validation error');
  }
}
