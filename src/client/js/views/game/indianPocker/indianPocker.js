import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import { debug } from '@/client/js/module/debug';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import reload from '@/client/js/module/reload';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';

import { BCRYPT_STORAGE } from '@/client/js/module/bcryptStorage';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('indianPocker init');
      // console.log('reload >>> ', reload);
      // window.rtcChannels = {};

      // 카드 우선 생성
      makeCard();

      // 'GAME_NAME' KEY가 sessionStorage에 있는지 체크
      const storageGameNameKeyBefore = await BCRYPT_STORAGE.findSessionStorageKey(process.env.KEY_GAME_NAME);
      console.log('storageGameNameKeyBefore ::: ', storageGameNameKeyBefore);

      // 'GAME_NAME' VALUE가 sessionStorage에 있는지 체크
      const storageGameNameValBefore = await BCRYPT_STORAGE.findSessionStorageVal(process.env.KEY_GAME_NAME);
      console.log('storageGameNameValBefore ::: ', storageGameNameValBefore);

      // 'GAME_NAME' KEY 암호화
      const encryptKeyGameName = await BCRYPT_STORAGE.encryption(process.env.KEY_GAME_NAME);
      console.log('encryptGameName ::: ', encryptKeyGameName);

      // 'GAME_NAME' 'indianPocker' VALUE 암호화
      const encryptValGameName = await BCRYPT_STORAGE.encryption('indianPocker');
      console.log('encryptValGameName ::: ', encryptValGameName);

      // 암호화한 'GAME_NAME' KEY / 'indianPocker' VALUE 를 sessionStorage에 등록
      storageMethod('s', 'SET_ITEM', encryptKeyGameName, encryptValGameName);

      // 'GAME_NAME' KEY가 sessionStorage에 있는지 다시 체크
      const storageGameNameDeyAfter = await BCRYPT_STORAGE.findSessionStorageKey(process.env.KEY_GAME_NAME);
      console.log('storageGameNameDeyAfter ::: ', storageGameNameDeyAfter);

      // 'GAME_NAME' VALUE가 sessionStorage에 있는지 체크
      const storageGameNameValAfter = await BCRYPT_STORAGE.findSessionStorageVal(process.env.KEY_GAME_NAME);
      console.log('storageGameNameValAfter ::: ', storageGameNameValAfter);

      // sessionStorage에 있는 'GAME_NAME' KEY가 'indianPocker' 인지 체크
      const compareKey = await BCRYPT_STORAGE.compareDecryptionKey(window.sessionStorage.getItem(encryptKeyGameName), 'indianPocker');
      console.log('compareKey ::: ', compareKey);

      // const encryptKey = await BCRYPT_STORAGE.findSessionStorage(process.env.KEY_GAME_NAME);
      // const compareKey = await BCRYPT_STORAGE.compareDecryptionKey(process.env.KEY_GAME_NAME, encryptKey);

      /*
      const encryptKey = await BCRYPT_STORAGE.encryption(process.env.KEY_GAME_NAME);
      const encryptValue = await BCRYPT_STORAGE.encryption('indianPocker');
      storageMethod('s', 'SET_ITEM', encryptKey, encryptValue);

      const decryptKey = await BCRYPT_STORAGE.decryptionKey(process.env.KEY_GAME_NAME);
      console.log('decryptKey ::::', decryptKey); // $2b$04$anhNEuSKAguuX8vLFJZtqeVALIdVC1YfYCcpYMNCPooGuNxxzjgWm
      const encryptedValue = sessionStorage.getItem(decryptKey);
      console.log('encryptedValue ::::', encryptedValue); // $2b$04$xRUvPrCPLYOSJUCKRNsTMu6Y39tJxfogEBm.zUBQ2iA4TXEybyte.

      const decryptValue = await BCRYPT_STORAGE.decryptionVal(encryptedValue, 'GN');
      console.log('decryptValue :::::: ', decryptValue); // indianPocker
      */

      // gameName을 sessionStorage에 저장
      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'indianPocker') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'indianPocker');
      }

      // webRTC 공통
      await rtcPeer('indianPocker');

      if (reload) {
        // 새로 고침 후 재연결인 경우
        switch (window.sessionStorage.getItem('gameState')) {
          case 'waitEnemy':
            // choiceCard
            indianPockerGameState.choiceCard();
            break;
          case 'choiceCard':
            indianPockerGameState.choiceCard();
            break;
          case 'basicBet':
            indianPockerGameState.basicBet();
            break;
          case 'playing':
            const FOLD_STATE = window.sessionStorage.foldState;
            if (FOLD_STATE) {
              // 이전 판에서 FOLD animation 실행중 일 때 새로고침 한 경우
              if (FOLD_STATE === 'true') {
                // FOLD를 실행한 PLAYER
                const FOLD_USER = window.sessionStorage.foldUser;

                if (FOLD_USER) {
                  if (FOLD_USER === 'true') {
                    // FOLD를 실행한 PLAY가 새고로침
                    indianPockerGameState.basicBet('foldLocal');
                  } else if (FOLD_USER === 'false') {
                    // FOLD를 받은 PLAY가 새고로침
                    indianPockerGameState.basicBet('foldRemote');
                  }
                }
              }
            } else {
              indianPockerGameState.playing();
            }
            break;
          case 'gameOver':
            indianPockerGameState.gameOver();
            break;
          default:
            break;
        }
      } else {
        // choiceCard
        indianPockerGameState.choiceCard();
      }
    } catch (error) {
      errorManagement(error);
    }
  }
};
