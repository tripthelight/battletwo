import storageMethod from '@/client/js/module/storage/storageMethod';

export default (_session) => {
  storageMethod('s', 'SET_ITEM', _session, 0);
};
