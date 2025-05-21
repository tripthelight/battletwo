import CRC32 from 'crc-32';
import encryptionStore from '@/client/store/encryptionStore';

export default (_key, _old) => {
  const keypair = encryptionStore.getState().encryptionState.keypair;
  const oldPair = encryptionStore.getState().encryptionState.oldpair;
  return (CRC32.str(_key + (_old ? oldPair : keypair)) >>> 0).toString(16); // 양수 변환 후 16진수로
};
