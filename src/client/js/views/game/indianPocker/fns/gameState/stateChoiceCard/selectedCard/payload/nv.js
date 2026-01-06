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

/**
 * PUBLIC_CARD_NUMS 을 받아서 Base64 문자 리턴
 * @param {string} _code public card number code
 * @returns {[string, string]} [ DATA_PACK, SHAPE_PACK ]
 */
export default function (_code) {
  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  try {
    switch (_code) {
      // CARD NUM : 1
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]): {
        return ["OTAAADkwAAA5MAAAoVATAG3ACQDRD+3/OTAAAHViaQAFoPb/oVATAA==", 'BQA='];
      }
      // CARD NUM : 2
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]): {
        return ["OTAAADkwAAA5MAAAbcAJAKFQEwAFoPb/pSFDADkwAADNPr3/qfJyAKUhQwA5MAAA0Q/t/23ACQDNPr3/OTAAAKUhQwDJbY3/", "CQA="];
      }
      // CARD NUM : 3
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]): {
        return ["OTAAADkwAAA5MAAAbcAJAKFQEwAFoPb/pSFDADkwAABd5cT/cZE5ABV7OwA5MAAAKVW7/6UhQwB1+e7/OTAAABV7OwABz8b/XeXE/zkwAAAVezsAAc/G/zkwAAA5MAAASQtFADkwAAD9ZhEAOTAAAF3lxP9xkTkAFXs7ADkwAABd5cT/cZE5ABV7OwA5MAAA0Q/t/23ACQDNPr3/OTAAABV7OwABz8b/XeXE/zkwAAA=", "//8CAAsACwA="];
      }
      // CARD NUM : 4
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]): {
        return ["OTAAADkwAAA5MAAApSFDAG3ACQDRD+3/OTAAAFfJNAClIUMAs3a4/zkwAAAFoPb/bcAJANEP7f85MAAAdWJpAAWg9v+hUBMAOTAAAH/mrv+ZrrP/83lRADkwAAA5MAAAOTAAAKFQEwBtwAkA0Q/t/zkwAADzeVEA2bFMAH/mrv85MAAAcZE5AAWg9v+hUBMAOTAAABuXy//NPr3/v+lHADkwAABtwAkABaD2/6FQEwA=", "//8CAAsACwA="];
      }
      // CARD NUM : 5
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]): {
        return ["OTAAADkwAAA5MAAACXEmAAlxJgBp79n/eiQMADkwAABci9f/FtUoADkwAAB4cDEA2bFMAJmus/85MAAAkd5IAGnv2f8JcSYA+Dv0/zkwAAAW1SgAXIvX/zkwAAD6787/ma6z/9mxTAA=", "DQA="];
      }
      // CARD NUM : 6
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]): {
        return ["OTAAADkwAAA5MAAACXEmAAlxJgBp79n/eiQMADkwAABci9f/FtUoADkwAAB4cDEA2bFMAJmus/85MAAAkd5IAGnv2f8JcSYANV/Q/zkwAAA5MAAAvczy/23ACQAFoPb/OTAAALWTDQD8DCQAOTAAAOJEHwCQG+H/OTAAAPrvzv+ZrrP/2bFMADkwAAA5MAAAOTAAAAlxJgAJcSYAae/Z/z0BMAA5MAAAOTAAALWTDQAFoPb/bcAJADkwAAC9zPL/dlPc/zkwAACQG+H/4kQfADkwAAB4cDEA2bFMAJmus/85MAAAkd5IAGnv2f8JcSYA+Dv0/zkwAAAW1SgAXIvX/zkwAAD6787/ma6z/9mxTAA=", "//8CABEAEQA="];
      }
      // CARD NUM : 7
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]): {
        return ["OTAAADkwAAA5MAAAbcAJAKFQEwAFoPb/pSFDADkwAACmErb/3YJ8APg79P85MAAApSFDAMltjf85MAAAOTAAAMxNSgA5MAAAeiQMADkwAADNPr3/qfJyAKUhQwA5MAAA0Q/t/23ACQDNPr3/OTAAAA==", "//8CAAcABwA="];
      }
      // CARD NUM : 8
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]): {
        return ["OTAAADkwAAA5MAAACXEmAAlxJgBp79n/PQEwADkwAAA5MAAAtZMNAAWg9v9twAkAOTAAAL3M8v92U9z/OTAAAJAb4f/iRB8AOTAAAHhwMQDZsUwAma6z/zkwAACR3kgAae/Z/wlxJgA1X9D/OTAAADkwAAC9zPL/bcAJAAWg9v85MAAAtZMNAPwMJAA5MAAA4kQfAJAb4f85MAAA+u/O/5mus//ZsUwA", "FQA="];
      }
      // CARD NUM : 9
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]): {
        return ["OTAAADkwAAA5MAAACXEmAAlxJgBp79n/PQEwADkwAAA5MAAAtZMNAAWg9v9twAkAOTAAAL3M8v92U9z/OTAAAJAb4f/iRB8AOTAAAHhwMQDZsUwAma6z/zkwAACR3kgAae/Z/wlxJgD4O/T/OTAAABbVKABci9f/OTAAAPrvzv+ZrrP/2bFMADkwAAA5MAAAOTAAAAlxJgAJcSYAae/Z/3okDAA5MAAAXIvX/xbVKAA5MAAAeHAxANmxTACZrrP/OTAAAJHeSABp79n/CXEmADVf0P85MAAAOTAAAL3M8v9twAkABaD2/zkwAAC1kw0A/AwkADkwAADiRB8AkBvh/zkwAAD6787/ma6z/9mxTAA=", "//8CABEAEQA="];
      }
      // CARD NUM : 10
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]): {
        return ["OTAAADkwAAA5MAAAoVATAG3ACQDRD+3/OTAAAHViaQAFoPb/oVATADkwAAD9/Zb/1eAcADkwAABtwAkA0Q/t/z0BMAA5MAAAOTAAAHViaQAFoPb/oVATADVf0P85MAAAbcAJAAWg9v/vqCEAOTAAAFP4BAAFoPb/OTAAADGOoP+Dt97/OTAAAB9o+/9twAkAOTAAAEHSXwAFoPb/bcAJADkwAAA5MAAAOTAAAKFQEwBtwAkA0Q/t/z0BMAA5MAAAOTAAAHViaQAFoPb/oVATADVf0P85MAAAbcAJAAWg9v/vqCEAOTAAAFP4BAAFoPb/OTAAADGOoP+Dt97/OTAAAB9o+/9twAkAOTAAAEHSXwAFoPb/bcAJADkwAAD9/Zb/2bFMADkwAABtwAkA0Q/t/zkwAAB1YmkABaD2/6FQEwA5MAAA/f2W/w==", "//8CAP//AgAGAA4A//8CABAABQA="];
      }
      default: throw throwObj('select card value', 'select card value not found');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'select card value Validation', error?.message ?? 'select card value Validation error');
  }
}
