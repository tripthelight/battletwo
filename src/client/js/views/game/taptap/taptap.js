import addNickname from '@/client/js/functions/addNickname';
import webRTC from '@/client/js/webRTC/rtcConn';

// onMounted
document.onreadystatechange = () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    console.log('taptap init');

    addNickname();

    webRTC('taptap')
      .then((onDataChannel) => {
        console.log('connect sucess');
      })
      .catch(console.error);
  }
};
