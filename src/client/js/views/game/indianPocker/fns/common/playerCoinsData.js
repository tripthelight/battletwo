import deviceStateStore from '@/client/store/deviceStateStore';
import { timeInterval_1 } from '@/client/js/functions/variable';
import getTranslateXValue from '@/client/js/views/game/indianPocker/fns/common/getTranslateXValue';
import getTranslateYValue from '@/client/js/views/game/indianPocker/fns/common/getTranslateYValue';
import getTranslateXY from '@/client/js/views/game/indianPocker/fns/common/getTranslateXY';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH';
import findIndex from '@/client/js/views/game/indianPocker/fns/common/findIndex';
import saveSessionBetCoin from '@/client/js/views/game/indianPocker/fns/common/saveSessionBetCoin';

export default (_event) => {
  setTimeout(() => {
    let tx;
    let ty;
    let tm;
    let th;
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') {
      tx = getTranslateXValue(_event.target.style.transform);
      ty = getTranslateYValue(_event.target.style.transform);
    } else {
      tx = getTranslateXY(_event.target).translateX;
      ty = getTranslateXY(_event.target).translateY;
    }
    tm = getTranslateMH(_event.target).m;
    th = getTranslateMH(_event.target).h;
    // console.log("tm :: ", tm);
    // console.log("th :: ", th);

    const ACTIVE_LI = findIndex(_event.target);
    const DATA = {
      tx: tx,
      ty: ty,
      tm: tm,
      th: th,
      activeLi: ACTIVE_LI,
    };
    setTimeout(saveSessionBetCoin, timeInterval_1, DATA);
  }, timeInterval_1);
};
