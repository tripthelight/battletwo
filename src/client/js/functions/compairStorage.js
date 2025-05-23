import CRC32 from 'crc-32';
import encryptionStore from '@/client/store/encryptionStore';

export default (_key, _old) => {
  const keypair = encryptionStore.getState().encryptionState.keypair;
  return (CRC32.str(_key + keypair) >>> 0).toString(16); // 양수 변환 후 16진수로
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
};
