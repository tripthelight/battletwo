import throwObj from '@/client/js/module/errorHandler/throwObj';
import make20Enemy from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/make20Enemy";

export default async () => {
  try {
    const EN = window.sessionStorage.en;
    if (!EN) throw throwObj('sessionStorageLoss', 'en not found');
    const ENEMY_LIST = await make20Enemy(JSON.parse(EN));
    return new Promise((resolve, reject) => {
      resolve([...ENEMY_LIST].reverse());
    });
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'make 20 error');
  }
};
