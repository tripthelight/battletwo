import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default (data) => {
  storageMethod("s", "SET_ITEM",
    findCharCode([86, 82, 88, 89, 90, 72, 71, 84, 74, 85]), // emenyCube
    // numArr data
    JSON.stringify(data)
  );
};
