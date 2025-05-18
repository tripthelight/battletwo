import dotenv from 'dotenv';
dotenv.config();

const DefaultEnv = {
  'process.env.SOCKET_HOST': JSON.stringify(process.env.SOCKET_HOST),
  'process.env.SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT),
  'process.env.RTC_PORT': JSON.stringify(process.env.RTC_PORT),
};
const COMN_STORAGE = {
  'process.env.KEY_GAME_NAME': JSON.stringify(process.env.KEY_GAME_NAME),
  'process.env.KEY_ROOM_NAME': JSON.stringify(process.env.KEY_ROOM_NAME),
};
const INDIAN_POCKER = {
  'process.env.KEY_CARD_NUM': JSON.stringify(process.env.KEY_CARD_NUM),
};

export default {
  ...DefaultEnv,
  ...COMN_STORAGE,
  ...INDIAN_POCKER,
};
