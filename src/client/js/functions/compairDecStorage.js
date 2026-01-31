import CRC32 from 'crc-32';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_key) => {
  try {
    const keypair = KEY.puk; // public key
    if (!keypair) {
      throw 'encrypt error';
    }
    return (CRC32.str(_key + keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
  } catch (error) {
    throw throwObj('dataManipulation', 'keypair failed.');
  }
};
