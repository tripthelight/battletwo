import storageMethod from '@/client/js/module/storage/storageMethod';

export default function remoteReload(value) {
  storageMethod('s', 'SET_ITEM', 'remoteReload', value.toString());
}
