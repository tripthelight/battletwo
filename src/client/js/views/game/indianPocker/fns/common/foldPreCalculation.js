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

  // fold 일 경우 coinsEnemy, coinsPlayer의 결과
  const firstCalc = () => {
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const FOLD_CE = COINS_ENEMY && Number(COINS_ENEMY) >= 0 ? Number(COINS_ENEMY) : 0;
    const FOLD_CP = COINS_PLAYER && Number(COINS_PLAYER) >= 0 ? Number(COINS_PLAYER) : 0;
    const FOLD_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) >= 0 ? Number(COINS_ENEMY_BET) : 0;
    const FOLD_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) >= 0 ? Number(COINS_PLAYER_BET) : 0;
    const FOLD_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) >= 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const RES_E = Number(FOLD_CEB + FOLD_CPB - FOLD_CPEB);

    storageMethod('s', 'SET_ITEM', 'coinsEnemyLocalFold', FOLD_CE + RES_E);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerLocalFold', FOLD_CP + FOLD_CPEB);
  };

  // fold 했는데 내 카드가 10일 경우 coinsEnemy, coinsPlayer의 결과
  const penaltyCalc = () => {
    const COINS_ENEMY = window.sessionStorage.coinsEnemyLocalFold;
    const COINS_PLAYER = window.sessionStorage.coinsPlayerLocalFold;
    const PENALTY_COINS = Number(COINS_PLAYER) >= 10 ? 10 : Number(COINS_PLAYER);
    const E_RESULT = Number(COINS_ENEMY) + Number(PENALTY_COINS);
    const P_RESULT = Number(COINS_PLAYER) - Number(PENALTY_COINS);

    storageMethod('s', 'SET_ITEM', 'coinsEnemyLocalFold', E_RESULT);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerLocalFold', P_RESULT);
  };

  firstCalc();
  if (myCardNum === 10) penaltyCalc();

  request('enemyFold', {
    coinsEnemyRemoteFold: window.sessionStorage.coinsPlayerLocalFold,
    coinsPlayerRemoteFold: window.sessionStorage.coinsEnemyLocalFold,
  });
};
