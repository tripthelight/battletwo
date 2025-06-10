import { debug } from '@/client/js/module/debug';
import { storageClear } from '@/client/js/module/storage/storageClear';
import storageEventStore, { updateStorageEvent } from '@/client/store/storageEvent';

export default function clearCookies(currentUrl) {
  const ROUTES = {
    taptap: '/game/taptap',
    indianPocker: '/game/indianPocker',
    blackAndWhite1: '/game/blackAndWhite1',
    findTheSamePicture: '/game/findTheSamePicture',
  };
  const routeKey = currentUrl.split('/').pop(); // '/game/...' 게임명을 추출

  if (ROUTES.hasOwnProperty(routeKey)) return;

  // 모든 cookies 삭제
  document.cookie.split(';').forEach(function (cookie) {
    const name = cookie.split('=')[0].trim();
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  });
}
