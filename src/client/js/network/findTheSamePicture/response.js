import {
  ackUntil,
  handleReliableReceive,
  maybeResolveReady,
  rawSend,
  setReady,
} from '@/client/js/module/webRTC/connectSignaling';
import remoteReload from '@/client/js/functions/remoteReload';

/**
 * Find Same Picture의 실제 게임 payload를 처리한다.
 */
export function response(payload, meta) {
  if (!payload || typeof payload.type !== 'string') {
    console.warn(
      '[findTheSamePicture] Unknown payload:',
      payload,
      meta,
    );
    return;
  }

  switch (payload.type) {
    case 'remoteReload':
      remoteReload(payload.value);
      break;

    case 'enemyBodyClick':
      console.log(
        '[findTheSamePicture] enemy body click',
        payload.count,
      );
      break;

    default:
      console.warn(
        '[findTheSamePicture] No handler for type:',
        payload.type,
        payload,
        meta,
      );
      break;
  }
}

/**
 * connectSignaling의 reliable layer가 최종적으로 호출하는
 * Find Same Picture용 payload 진입점이다.
 */
export function deliverToGame(payload, meta) {
  if (!payload || typeof payload.type !== 'string') {
    return;
  }

  if (payload.type === 'ROUND/START') {
    setReady();
    maybeResolveReady();
    return;
  }

  response(payload, meta);
}

/**
 * connectSignaling이 DataChannel message를 받은 뒤 호출하는
 * Find Same Picture 전용 envelope 처리기다.
 */
export function handleEnvelope(env) {
  if (!env || env.v !== 1 || !env.t) {
    return;
  }

  if (typeof env.ack === 'number') {
    ackUntil(env.ack);
  }

  if (
    typeof env.seq === 'number' &&
    env.t !== 'ACK'
  ) {
    handleReliableReceive(env);
    return;
  }

  switch (env.t) {
    case 'ACK':
      if (typeof env.seq === 'number') {
        ackUntil(env.seq);
      }
      break;

    case 'PING':
      rawSend({
        v: 1,
        t: 'PONG',
        ts: Date.now(),
      });
      break;

    case 'PONG':
      break;

    case 'HELLO':
      break;

    case 'STATE':
      break;

    case 'MSG':
      deliverToGame(
        env.payload,
        {
          unreliable: true,
        },
      );
      break;

    default:
      break;
  }
}
