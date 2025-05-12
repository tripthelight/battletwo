import storageMethod from '@/client/js/module/storage/storageMethod';

export default (event) => {
  storageMethod('s', 'SET_ITEM', 'dropState', false);
};
