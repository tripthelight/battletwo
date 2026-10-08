import dotenv from 'dotenv';
dotenv.config({ path: '.env.blackAndWhite2' });

const BLACK_AND_WHITE_2 = {
  'process.env.VAL_BLACK_AND_WHITE_2_GAME_NAME': JSON.stringify(process.env.VAL_BLACK_AND_WHITE_2_GAME_NAME),
};

export default {
  ...BLACK_AND_WHITE_2,
};
