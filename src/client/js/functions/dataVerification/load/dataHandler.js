import findCharCode from '@/client/js/functions/findCharCode';
import indianPockerLoad from '@/client/js/functions/dataVerification/load/indianPocker/indianPockerLoad';
import blackAndWhite1Load from '@/client/js/functions/dataVerification/load/blackAndWhite1/blackAndWhite1Load';
import blackAndWhite2Load from '@/client/js/functions/dataVerification/load/blackAndWhite2/blackAndWhite2Load';
import memoryMazeLoad from '@/client/js/functions/dataVerification/load/memoryMaze/memoryMazeLoad';
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameName: indianPocker
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (p1 === findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69])) {
    indianPockerLoad(p2, storageKeys({ p1, p2 }));
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameName: blackAndWhite1
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (p1 === findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79])) {
    blackAndWhite1Load(p2, storageKeys({ p1, p2 }));
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameName: blackAndWhite2
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (p1 === findCharCode([76, 83, 81, 73, 68, 75, 77, 80, 89, 66])) {
    blackAndWhite2Load(p2, storageKeys({ p1, p2 }));
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameName: memoryMaze
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (p1 === findCharCode([65, 78, 82, 83, 75, 81, 66, 72, 67, 87])) {
    memoryMazeLoad(p2, storageKeys({ p1, p2 }));
  };
};
