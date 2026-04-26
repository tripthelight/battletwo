import {
  getEnemyIconPosition,
  getPlayerIconPosition,
} from '@/client/js/views/game/findTheSamePicture/fns/common/sessionState';

export default (_user) => {
  if (_user === "p") return getPlayerIconPosition();
  return getEnemyIconPosition();
};
