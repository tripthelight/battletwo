import { sendGame } from '@/client/js/module/webRTC/connectSignaling';

export function request(k, v) {
  switch (k) {
    case 'bodyClick':
      sendGame(
        {
          type: 'enemyBodyClick',
          count: v,
        },
        {
          reliable: true,
        },
      );
      break;

    default:
      break;
  }
}
