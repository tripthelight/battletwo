import { sendGame } from '@/client/js/module/webRTC/connectSignaling';

/**
 * Find The Same Picture 전용 reliable payload 송신 함수.
 * 게임 로직은 payload만 구성하고 실제 순서/재전송 보장은
 * connectSignaling의 reliable layer에 위임한다.
 */
export function request(type, payload = {}) {
  if (typeof type !== 'string' || type.length === 0) {
    return;
  }

  sendGame(
    {
      ...payload,
      type,
    },
    {
      reliable: true,
    },
  );
}
