/**
 * 카드에 보여지는 숫자의 "d" 좌표 문자열 모음
 * 원래 문자열 :
    - 1: "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw=="
    - 2: "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4="
    - 3: "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+ZkaY54="
    - 4: "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSSEF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50acJDc="
    - 5: "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudqt8+9XIyQIU5b"
    - 6: "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPnRA8Zw+UJo4Kr3E/vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kvBsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEAs46EkOI="
    - 7: "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJisnCW5Iofl3YUZ3tn9zN0"
    - 8: "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQmYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ="
    - 9: "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh21M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4+RJa6GAJD8SV0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeSgZv9rDY="
    - 10: "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAydOOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJwe0rZfDc7gb+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkCYHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA=="
 */

import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

export default function (_code) {
  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  try {
    switch (_code) {
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]): return "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw=="; // CARD NUM : 1
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]): return "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4="; // CARD NUM : 2
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]): return "XqsmwUz+AG++leEZoVS3zK5MEi3x/LIdT/5mvY+RGsCuPszBfo0/pVRwUrAz" + "8wA2IoOQz5Oc38i7j5lY7BNnIvIV2GZqrifghqV1l1pePC4RPRwdUYfp+Zka" + "Y54="; // CARD NUM : 3
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]): return "EyrIiDsCXzq+h/dRgKrHDkVHYsfqPEGx/Lt0OZK8NHZ18sapBD6EYF9SJxSS" + "EF5VSmcy38/ovf0GQwRq4iBwpH82UZuJGPvrJy7+8hNAi6ccDAOoEv8U50ac" + "JDc="; // CARD NUM : 4
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]): return "no0zFPciVKVwt9mAmJRTIRxVX7tfdxecfqjUDpFsUuCHyR5sBRG7v61Mhudq" + "t8+9XIyQIU5b"; // CARD NUM : 5
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]): return "iPxF6D/eAUhBF/D6QMzUhCjnvOExPPXdEfyw2oPR07XIhLSlFZNczHEtlsPn" + "RA8Zw+UJo4Kr3E//vQiMy86O4WHzHmFcBKPN77WhEJdxWLY7nXuDaAJo82kv" + "BsnT3mHuv1j0rDZ4imvcU90OqJobZ+OF3hAfdq8LXlDE4Y0m4KnYKsvpwWEA" + "s46EkOI="; // CARD NUM : 6
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]): return "EyuDAmZZyfGG2j4WZbf+6ezyfxYVaATuRs31WWSnhGgPQUTKhzQkiJmDlJJi" + "snCW5Iofl3YUZ3tn9zN0"; // CARD NUM : 7
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]): return "lnOsUS7somuJdS8zEahhHPC1YrFfUhwJKZpt74m298ekfQ5/QSfEbkWz22xQ" + "mYd61sML1pnCnLqvPm/bIj+hVw2Xdh7zPjLrMkefh41FU8vMnUMyVzQ="; // CARD NUM : 8
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]): return "2TgAVeNdpoA+F4M/T9oqpZOw9xK63nVgkfuM8z70N1t8bnFr2N9pOmMM7oh2" + "1M74WEADtjuBs/08Q2jyaVJOzLL9tqDBpU023X3flINLXu4O+RJa6GAJD8SV" + "0R7zhktDAGIRm3NVpPFDPaUrV/jrsH9THNhJxXjOUeygPBDjVIgIK3ZMOeeS" + "gZv9rDY="; // CARD NUM : 9
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]): return "wf3BNntK/1okdSbPC7Pfjqycyv4Hf0buzsurVDAw1BvyNb0z6pHfOMIasAyd" + "OOZSDfwV2LXELIr0apV/oMZps9KCY2oWbYj7SAvv3hU7Z3zlWI44lauAbEuJ" + "we0rZfDc7gbY+Ifpl7WsGoAndBkEDmA0DP1ln68rq78ZqUPJlA0ObqN6QRkC" + "YHMVpsaYtKz1sIgAV3VhPO79vFC5cY3PwFMQUNrA7wrSozxBaA=="; // CARD NUM : 10
      default: throw throwObj('select card value', 'select card value not found');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'select card value Validation', error?.message ?? 'select card value Validation error');
  }
}
