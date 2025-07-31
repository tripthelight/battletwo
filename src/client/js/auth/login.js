export default async function login(gameName, roomName) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameName, roomName })
  });

  if (res.ok) {
    const data = await res.json();
    console.log('로그인 응답 : ', data);
  } else {
    throw { errCase: 'auth', component: 'token', event: 'loginFailed', message: 'login failed' };
  };
};
