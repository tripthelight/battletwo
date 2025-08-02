import CRC32 from 'crc-32';
import encryptionStore from '@/client/store/encryptionStore';
import getCookies from '@/client/js/module/cookies/getCookies';
import { errorManagement } from '@/client/js/module/errorManagement';
import { encrypt } from '@/client/js/webRTC/rtcConn'

export default (_key) => {
  // const keypair = encryptionStore.getState().encryptionState.keypair;
  // const keypair = getCookies({ cookieName: 'gc_kp' });
  // if (!keypair) {
  //   return errorManagement({ errCase: 'cookies', message: 'cookie keypair failed' });
  // };

  // console.log('keypair :::::: ', keypair); // null
  // console.log('encrypt :::::: ', encrypt.keypair); // null
  // console.log('_key + keypair :::::: ', _key + keypair); // keypair가 null일 경우 _key 뒤에 'null' 문자열이 붙음

  // encrypt.keypair = '';
  // // webRTC 연결 후 keypair 생성 전까지는 이 부분을 타면 안됨
  // if (!encrypt || encrypt && (encrypt.keypair === '')) {
  //   throw { errCase: 'cookies', message: 'cookie keypair failed' }
  //   // return errorManagement({ errCase: 'cookies', message: 'cookie keypair failed' });
  // };
  // return (CRC32.str(_key + encrypt.keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
  /*
  const keypair = window.sessionStorage.getItem('keyPair');
  const arrPair = JSON.parse(keypair);
  return {
    s: (CRC32.str(_key + arrPair[0]) >>> 0).toString(16),
    e: (CRC32.str(_key + arrPair[arrPair.length - 1]) >>> 0).toString(16),
  };
  */
  // const keypair = encryptionStore.getState().encryptionState.keypair;
  // const oldPair = encryptionStore.getState().encryptionState.oldpair;
  // return (CRC32.str(_key + keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
  // const keypair = window.sessionStorage.getItem('newPair');
  // const oldPair = window.sessionStorage.getItem('oldPair');
  // return (CRC32.str(_key + (_old ? oldPair : keypair)) >>> 0).toString(16); // 양수 변환 후 16진수로

  try {
    // webRTC 연결 후 keypair 생성 전까지는 이 부분을 타면 안됨
    if (!encrypt || (encrypt && encrypt.keypair === '')) {
      throw 'encrypt error';
      // return errorManagement({ errCase: 'cookies', message: 'cookie keypair failed' });
    };
    return (CRC32.str(_key + encrypt.keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
  } catch (error) {
    throw { errCase: 'cookies', message: 'cookie keypair failed' };
  };
};
