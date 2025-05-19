import { ENCRYPTION_STORAGE } from './encryptionStorage.js';
import { convertToRandomAlphabet } from './convertToRandomAlphabet.js';

const OBFUSCATION_LIST = {
  indianPocker: {
    GAME_NAME: {
      k: 'BVDIEAIBKE',
      v: 'DJEMFKLVDE', // indianPocker
    },
    GAME_STATE: {
      k: 'IKVUDKLWOD',
      v: {
        waitEnemy: 'UOVISKZDRP',
        choiceCard: 'OIVHDKASPE',
        basicBet: 'ZCKIFUAEOI',
        playing: 'PIVUAJVHER',
        gameOver: 'HUVIAOFKET',
      },
    },
  },
};

export const MAKE_STORAGE = {
  indianPocker: async () => {
    const { GAME_NAME, GAME_STATE } = OBFUSCATION_LIST.indianPocker;

    const KEY_GAME_NAME = await ENCRYPTION_STORAGE.encryption(GAME_NAME.k);
    const VAL_GAME_NAME = await ENCRYPTION_STORAGE.encryption(GAME_NAME.v);

    const KEY_GAME_STATE = await ENCRYPTION_STORAGE.encryption(GAME_STATE.k);
    const VAL_WAIT_ENEMY = await ENCRYPTION_STORAGE.encryption(GAME_STATE.v.waitEnemy);
    const VAL_CHOICE_CARD = await ENCRYPTION_STORAGE.encryption(GAME_STATE.v.choiceCard);
    const VAL_BASIC_BET = await ENCRYPTION_STORAGE.encryption(GAME_STATE.v.basicBet);
    const VAL_PLAYING = await ENCRYPTION_STORAGE.encryption(GAME_STATE.v.playing);
    const VAL_GAME_OVER = await ENCRYPTION_STORAGE.encryption(GAME_STATE.v.gameOver);

    return {
      storageData: {
        [KEY_GAME_NAME]: VAL_GAME_NAME,
        [KEY_GAME_STATE]: [VAL_WAIT_ENEMY, VAL_CHOICE_CARD, VAL_BASIC_BET, VAL_PLAYING, VAL_GAME_OVER],
      },
    };
  },
  functions: () => {
    return {
      indianPocker: MAKE_STORAGE.indianPocker,
    };
  },
  findGame: async (_gameName) => {
    const funcMap = MAKE_STORAGE.functions();
    if (typeof funcMap[_gameName] === 'function' && OBFUSCATION_LIST[_gameName]) {
      return await funcMap[_gameName]();
    }

    return {};
  },
};
