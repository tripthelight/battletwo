import findCharCode from '@/client/js/functions/findCharCode';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';

/**
 * FOLD 에니메이션 중 브라우저 새로고침 시 미리 계산을 시도해 봄
 * 계산 이전에 체크해야 할 경우의 수가 많음
 * 따라서 fold 전용 sessionStorage data를 만들어서
 * 기본배팅 화면 지입 시 만든 data(coinsEnemy, coinsPlayer)를 이용해 코인을 그리고
 * 만든 data 삭제 필요
 * FOLD를 실행한 USER만 data가 생성
 * 내가 새로고침 했는지 상대에게 알려야함 - 상대도 동시에 새고고침 할 수 있음
 */
export default (myCardNum) => {
  // FOLD 상태 저장
  storageMethod('s', 'SET_ITEM', 'foldState', true);

  // 새로고침 시 betUser를 교체하기 위해 FOLD를 실행한 사람을 구분시켜야 함
  storageMethod('s', 'SET_ITEM', 'foldUser', true);

  const encryptKey6 = findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]); // coinsEnemyLocalFold

  // fold 일 경우 coinsEnemy, coinsPlayer의 결과
  const firstCalc = () => {
    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const encryptKey1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemy value number

    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayer value number

    // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const encryptKey3 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const decryptVal3 = encryptVal3 !== null && encryptVal3 !== '' ? dec(encryptVal3) : 0; // coinsEnemyBet value number

    // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const encryptKey4 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsPlayerBet value number

    // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const encryptKey5 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0;

    // const FOLD_CE = COINS_ENEMY && Number(COINS_ENEMY) >= 0 ? Number(COINS_ENEMY) : 0;
    const FOLD_CE = encryptVal1 !== null && encryptVal1 !== '' && Number(decryptVal1) >= 0 ? Number(decryptVal1) : 0;

    // const FOLD_CP = COINS_PLAYER && Number(COINS_PLAYER) >= 0 ? Number(COINS_PLAYER) : 0;
    const FOLD_CP = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2) >= 0 ? Number(decryptVal2) : 0;

    // const FOLD_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) >= 0 ? Number(COINS_ENEMY_BET) : 0;
    const FOLD_CEB = encryptVal3 !== null && encryptVal3 !== '' && Number(decryptVal3) >= 0 ? Number(decryptVal3) : 0;

    // const FOLD_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) >= 0 ? Number(COINS_PLAYER_BET) : 0;
    const FOLD_CPB = encryptVal4 !== null && encryptVal4 !== '' && Number(decryptVal4) >= 0 ? Number(decryptVal4) : 0;

    // const FOLD_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) >= 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const FOLD_CPEB = decryptVal5;

    const RES_E = Number(FOLD_CEB + FOLD_CPB - FOLD_CPEB);

    // storageMethod('s', 'SET_ITEM', 'coinsEnemyLocalFold', FOLD_CE + RES_E);
    storageMethod('s', 'SET_ITEM',
      encryptKey6, // coinsEnemyLocalFold
      enc(FOLD_CE + RES_E)
    );

    storageMethod('s', 'SET_ITEM', 'coinsPlayerLocalFold', FOLD_CP + FOLD_CPEB);
  };

  // fold 했는데 내 카드가 10일 경우 coinsEnemy, coinsPlayer의 결과
  const penaltyCalc = () => {
    // const COINS_ENEMY = window.sessionStorage.coinsEnemyLocalFold;
    const encryptVal6_1 = window.sessionStorage.getItem(encryptKey6); // coinsEnemyLocalFold value
    const decryptVal6_1 = dec(encryptVal6_1); // coinsEnemyLocalFold value number

    const COINS_PLAYER = window.sessionStorage.coinsPlayerLocalFold;
    const PENALTY_COINS = Number(COINS_PLAYER) >= 10 ? 10 : Number(COINS_PLAYER);

    // const E_RESULT = Number(COINS_ENEMY) + Number(PENALTY_COINS);
    const E_RESULT = Number(decryptVal6_1) + Number(PENALTY_COINS);

    const P_RESULT = Number(COINS_PLAYER) - Number(PENALTY_COINS);

    // storageMethod('s', 'SET_ITEM', 'coinsEnemyLocalFold', E_RESULT);
    storageMethod('s', 'SET_ITEM',
      encryptKey6, // coinsEnemyLocalFold
      enc(E_RESULT)
    );
    storageMethod('s', 'SET_ITEM', 'coinsPlayerLocalFold', P_RESULT);
  };

  firstCalc();
  if (myCardNum === 10) penaltyCalc();

  const encryptVal6_2 = window.sessionStorage.getItem(encryptKey6); // coinsEnemyLocalFold value
  const decryptVal6_2 = dec(encryptVal6_2); // coinsEnemyLocalFold value number

  request('enemyFold', {
    coinsEnemyRemoteFold: window.sessionStorage.coinsPlayerLocalFold,
    // coinsPlayerRemoteFold: window.sessionStorage.coinsEnemyLocalFold,
    coinsPlayerRemoteFold: decryptVal6_2,
  });
};
