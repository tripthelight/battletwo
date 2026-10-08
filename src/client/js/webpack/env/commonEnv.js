import DefineEnv from './DefineEnv.js';
import GameEnv from './GameEnv.js';
import taptapEnv from './taptapEnv.js';
import blackAndWhite1Env from './blackAndWhite1Env.js';
import blackAndWhite2Env from './blackAndWhite2Env.js';
import IndianPockerEnv from './IndianPockerEnv.js';
import findTheSamePictureEnv from './findTheSamePictureEnv.js';
import memoryMazeEnv from './memoryMazeEnv.js';

export default {
  ...DefineEnv,
  ...GameEnv,
  ...taptapEnv,
  ...blackAndWhite1Env,
  ...blackAndWhite2Env,
  ...IndianPockerEnv,
  ...findTheSamePictureEnv,
  ...memoryMazeEnv,
};
