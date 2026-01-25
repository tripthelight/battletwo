import login from '@/client/js/auth/login';

export default async function authRoom() {
  const auth = await fetch('/api/auth-room', {
    method: 'GET',
    credentials: 'include', // 쿠키(authToken)를 함께 보냄
  });
  if (auth.ok) {
    const authData = await auth.json();
    console.log(authData.message);
  } else {
    throw { errCase: 'auth', component: 'token', event: 'authRoom', message: 'roomName gameName failed' };
  }
};
