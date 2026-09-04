import '@/client/assets/scss/selectGame/common';
import '@/client/js/common/common';
// import { debug } from '@/client/js/module/debug';
import clearStorage from '@/client/js/common/clearStorage';
// import initNickName from '@/client/js/functions/initNickName';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    // clearStorage(window.location.pathname);
    console.log('selectGame init');

    // debug.log('selectGame init');
    // await initNickName();
  }
};

window.addEventListener('pageshow', (event) => {
  // /selectGame이 BFCache에서 복원되면 common.js가 다시 실행되지 않는다.
  // 이전 game의 resumeToken/reload/gameState가 다음 매칭에 섞이지 않도록
  // 강제 reload 대신 sessionStorage만 즉시 정리한다.
  if (event.persisted) {
    clearStorage(window.location.pathname);
  }
});
