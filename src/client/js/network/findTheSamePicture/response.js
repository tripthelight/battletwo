import {
  ackUntil,
  handleReliableReceive,
  maybeResolveReady,
  rawSend,
  setReady,
} from '@/client/js/module/webRTC/connectSignaling';
import remoteReload from '@/client/js/functions/remoteReload';
import {
  handleFindTheSamePicturePayload,
  handleFindTheSamePicturePeerReady,
} from '@/client/js/views/game/findTheSamePicture/fns/network/sync';

/**
 * Find The Same Picture의 실제 게임 payload를 처리한다.
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

  if (payload.type === 'remoteReload') {
    remoteReload(payload.value);
    return;
  }

  if (payload.type.startsWith('FSP/')) {
    handleFindTheSamePicturePayload(payload, meta);
    return;
  }

  console.warn(
    '[findTheSamePicture] No handler for type:',
    payload.type,
    payload,
    meta,
  );
}

/**
 * connectSignaling의 reliable layer가 최종적으로 호출하는
 * Find The Same Picture용 payload 진입점이다.
 */
export function deliverToGame(payload, meta) {
  if (!payload || typeof payload.type !== 'string') {
    return;
  }

  if (payload.type === 'ROUND/START') {
    setReady();
    handleFindTheSamePicturePeerReady();
    maybeResolveReady();
    return;
  }

  response(payload, meta);
}

/**
 * connectSignaling이 DataChannel message를 받은 뒤 호출하는
 * Find The Same Picture 전용 envelope 처리기다.
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
    case 'HELLO':
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
