import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export default () => {
  const TAP_AREA = document.getElementById('gameScene');
  if (!TAP_AREA) errorManagement({ errCase: 'errorComn', message: text.err });

  const TOP_BLOCK = TAP_AREA.querySelector('.tap-top');
  const BOT_BLOCK = TAP_AREA.querySelector('.tap-bottom');
  if (!TOP_BLOCK || !BOT_BLOCK) errorManagement({ errCase: 'errorComn', message: text.err });

  const TOP_COUNT_EL = TOP_BLOCK.querySelector('.tap-count');
  const BOT_COUNT_EL = BOT_BLOCK.querySelector('.tap-count');
  if (!TOP_COUNT_EL || !BOT_COUNT_EL) errorManagement({ errCase: 'errorComn', message: text.err });

  const LOCAL_COUNT = window.sessionStorage.getItem('tap-count') ?? 0;
  const REMOTE_COUNT = window.sessionStorage.getItem('enemyCount') ?? 0;

  const REMOTE_COUNT_RES = Number(REMOTE_COUNT);
  const LOCAL_COUNT_RES = Number(LOCAL_COUNT);

  TOP_COUNT_EL.value = REMOTE_COUNT_RES;
  BOT_COUNT_EL.value = LOCAL_COUNT_RES;

  TOP_BLOCK.style.height = 50 + Math.ceil(REMOTE_COUNT_RES - LOCAL_COUNT_RES) + '%';
  BOT_BLOCK.style.height = 50 + Math.ceil(LOCAL_COUNT_RES - REMOTE_COUNT_RES) + '%';
};
