import GAME_LIST from '@/client/js/webpack/JSON/gameList.json';

export default async function logout() {
  /* const ROUTES = GAME_LIST.gameList.reduce((acc, game) => {
    acc[game] = `/game/${game}`;
    return acc;
  }, {});
  const routeKey = currentUrl.split('/').pop(); // '/game/...' 게임명을 추출
  if (ROUTES.hasOwnProperty(routeKey)) return; */

  const authLogout = await fetch('/api/logout', {
    method: 'POST',
    credentials: 'include', // 쿠키 전송 필수!
  });

  if (authLogout.ok) {
    console.log('로그아웃 성공');
  } else {
    console.log('로그아웃 실패');
  };
};
