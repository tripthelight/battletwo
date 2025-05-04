import { timeInterval_1 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import rfSessionInit from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfSessionInit';

export const RF_END_DREW = {
  main: () => {
    LOADING_EVENT.show();
    setTimeout(rfSessionInit, timeInterval_1);
  },
};
