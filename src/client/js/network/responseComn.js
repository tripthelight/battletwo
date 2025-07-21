import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import { response as taptapResponse } from '@/client/js/network/taptap/response';
import { response as indianPockerResponse } from '@/client/js/network/indianPocker/response';
import { response as blackAndWhite1Response } from '@/client/js/network/blackAndWhite1/response';
import { response as findTheSamePictureResponse } from '@/client/js/network/findTheSamePicture/response';

export async function responseComn(gameName) {
  // sessionStorage gameName key 찾기
  // const encryptKey = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]); // gameName

  // const GAME_NAME = window.sessionStorage.getItem('gameName');
  // const GAME_NAME = window.sessionStorage.getItem(encryptKey);
  // if (!GAME_NAME) return errorManagement({ errCase: 'errorComn', message: text.err });

  switch (gameName) {
    case 'taptap':
      taptapResponse();
      break;
    case 'indianPocker':
    // case findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]):
      indianPockerResponse();
      break;
    case 'blackAndWhite1':
      blackAndWhite1Response();
      break;
    case 'findTheSamePicture':
      findTheSamePictureResponse();
      break;
    default:
      errorManagement({ errCase: 'errorComn', message: text.err });
      break;
  }
}
