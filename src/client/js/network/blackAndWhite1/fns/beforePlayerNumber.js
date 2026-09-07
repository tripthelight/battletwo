import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import moveInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveInnerSquare';
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      console.log('beforePlayerNumber DATA ::::::: ', data);

      const { index } = data;

      // 1) 상대가 제출한 Cube / 남은 Cube 상태를 먼저 반영한다.
      moveEnemyCube(index);

      // 2) 실제 Turn 소유권을 상대 → 나로 변경한다.
      // UI가 activeUser를 기준으로 렌더링되므로 화면 갱신보다 먼저 수행해야 한다.
      changeActiveUser();

      // 3) 변경된 activeUser 기준으로 내 Turn 안내와 위치를 한 번만 갱신한다.
      moveInnerSquare();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
