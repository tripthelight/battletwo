import { storageClear } from '@/client/js/module/storage/storageClear';
import storageEventStore, { updateStorageEvent } from '@/client/store/storageEvent';

export default function clearStorage(currentUrl) {
  storageEventStore.dispatch(updateStorageEvent({ value: false }));
  const ROUTES = {
    taptap: '/game/taptap',
    indianPocker: '/game/indianPocker',
    blackAndWhite1: '/game/blackAndWhite1',
    findTheSamePicture: '/game/findTheSamePicture',
  };
  const routeKey = currentUrl.split('/').pop(); // '/game/...' 게임명을 추출
  if (ROUTES.hasOwnProperty(routeKey)) return;
  storageClear();
  storageEventStore.dispatch(updateStorageEvent({ value: true }));
}
