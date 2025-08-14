import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import { response as taptapResponse } from '@/client/js/network/taptap/response';
import { response as indianPockerResponse } from '@/client/js/network/indianPocker/response';
import { response as blackAndWhite1Response } from '@/client/js/network/blackAndWhite1/response';
import { response as findTheSamePictureResponse } from '@/client/js/network/findTheSamePicture/response';

export async function responseComn(gameName) {
  switch (gameName) {
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
