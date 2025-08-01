export default async function searchRoom() {
  const auth = await fetch('/api/search-room', {
    method: 'GET',
    credentials: 'include', // 쿠키(authToken)를 함께 보냄
  });

  console.log('auth _________ ', auth);


  if (auth.ok) {
    const authData = await auth.json();


    if (authData.status === 'unauthorized') {
      // roomName 없음
      return null;
    } else {
      // JWT에 roomName 있음
      return authData.roomName;
    }
  } else {
    console.log('auth :::::: ', auth);

    throw { errCase: 'auth', component: 'searchRoom', event: 'unauthorized', message: 'auth noomName not found' };
  };
};
