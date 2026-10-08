import dotenv from 'dotenv';
dotenv.config({ path: '.env.memoryMaze' });

const MEMORY_MAZE = {
  'process.env.VAL_MEMORY_MAZE_GAME_NAME': JSON.stringify(process.env.VAL_MEMORY_MAZE_GAME_NAME),
};

export default {
  ...MEMORY_MAZE,
};
