import storageMethod from '@/client/js/module/storage/storageMethod';

export function storageClear() {
  window.sessionStorage.clear();
  storageMethod('s', 'REMOVE_ALL');
}
