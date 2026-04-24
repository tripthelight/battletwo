import throwObj from '@/client/js/module/errorHandler/throwObj';
import make20 from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/make20";

export default async (_state) => {
  try {
    const PN = window.sessionStorage.pn;
    if (!PN) throw throwObj("sessionStorageLoss", "pn not found");
    const ARR20 = await make20(JSON.parse(PN));
    return new Promise((resolve, reject) => {
      resolve(_state === "win" ? [...ARR20].reverse() : ARR20);
    });
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'make 20 error');
  }
};
