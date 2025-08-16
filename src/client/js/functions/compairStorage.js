import CRC32 from 'crc-32';
import { encrypt } from '@/client/js/webRTC/rtcConn'
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_key) => {
  try {
    // webRTC 연결 후 keypair 생성 전까지는 이 부분을 타면 안됨
    if (!encrypt || (encrypt && encrypt.keypair === '')) {
      throw 'encrypt error';
    };
    return (CRC32.str(_key + encrypt.keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
  } catch (error) {
    throw throwObj('cookies', 'cookie keypair failed.');
  };
};
