import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import { response as taptapResponse } from '@/client/js/communication/taptap/response';
import { response as indianPockerResponse } from '@/client/js/communication/indianPocker/response';
import { response as blackAndWhite1Response } from '@/client/js/communication/blackAndWhite1/response';
import { response as findTheSamePictureResponse } from '@/client/js/communication/findTheSamePicture/response';

export function responseComn() {
  const GAME_NAME = window.sessionStorage.getItem('gameName');
  if (!GAME_NAME) errorManagement({ errCase: 'errorComn', message: text.err });

  switch (GAME_NAME) {
    case 'taptap':
      taptapResponse();
      break;
    case 'indianPocker':
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
