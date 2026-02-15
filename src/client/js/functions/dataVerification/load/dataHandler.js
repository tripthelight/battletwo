import findCharCode from '@/client/js/functions/findCharCode';
import indianPockerLoad from '@/client/js/functions/dataVerification/load/indianPocker/indianPockerLoad';
import blackAndWhite1Load from '@/client/js/functions/dataVerification/load/blackAndWhite1/blackAndWhite1Load';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';

/**
 * 새로고침 시 gameName을 받아서 gameState로 분류
 * @typedef {Object} params
 * @property {string} p1 gameName
 * @property {string} p2 gameState
 * @returns
 */
export default (params) => {
  const { p1, p2 } = params;

  // gameName: indianPocker
  if (p1 === findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69])) {
    indianPockerLoad(p2, storageKeys({ p1, p2 }));
  };

  // gameName: blackAndWhite1
  if (p1 === findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79])) {
    blackAndWhite1Load(p2, storageKeys({ p1, p2 }));
  };
};
