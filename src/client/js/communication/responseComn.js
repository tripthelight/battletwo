import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import { response as taptapResponse } from '@/client/js/communication/taptap/response';

export function responseComn() {
  const GAME_NAME = window.sessionStorage.getItem('gameName');
  if (!GAME_NAME) errorManagement({ errCase: 'errorComn', message: text.err });

  switch (GAME_NAME) {
    case 'taptap':
      taptapResponse();
      break;
    default:
      errorManagement({ errCase: 'errorComn', message: text.err });
      break;
  }
}
