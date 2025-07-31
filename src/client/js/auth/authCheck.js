import login from '@/client/js/auth/login';

export default async function authCheck(gameName, roomName) {
  const auth = await fetch('/api/user-info', {
    method: 'GET',
    credentials: 'include', // 쿠키(authToken)를 함께 보냄
  });

  if (auth.ok) {
    const authData = await auth.json();
    if (authData.status === 'unauthorized') {
      console.log('처음 진입 : ', authData.message);
      await login({ gameName, roomName });
    } else {
      console.log('새로고침 인증 성공 : ', authData);
    }
  } else {
    throw { errCase: 'auth', component: 'token', event: 'unauthorized', message: 'auth check failed' };
  };
};
