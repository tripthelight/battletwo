import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';

export const ROUND_RESULT_STEP = {
  BASIC_BET: 'basicBet',
  DREW: 'drew',
  GAME_OVER: 'gameOver',
};

const ROUND_RESULT_RELOAD_RETRY_MS = 800;
let pendingReload = null;
let passiveReadyStep = null;

const KEYS = {
  gameState: () => findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]),
  basicBet: () => findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]),
  gameOver: () => findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]),
  playingReloadUser: () => findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]),
  drewState: () => findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]),
  drewReady: () => findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]),
  roundEnd: () => findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]),
  betResulting: () => findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]),
  foldState: () => findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]),
  foldUser: () => findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]),
  coinsPlayer: () => findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]),
  coinsEnemy: () => findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]),
  coinsPlayerBet: () => findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]),
  coinsEnemyBet: () => findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]),
  coinsPlayerExtBet: () => findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]),
  coinsEnemyExtBet: () => findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]),
  coinsEnemyLocalFold: () => findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]),
  coinsPlayerLocalFold: () => findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]),
  coinsEnemyRemoteFold: () => findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]),
  coinsPlayerRemoteFold: () => findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]),
};

function readBool(key) {
  const value = storageMethod('s', 'GET_ITEM', key);
  return value !== null && value !== '' && X.dec(value);
}

function readNullableBool(key) {
  const value = storageMethod('s', 'GET_ITEM', key);
  if (value === null || value === '') return null;
  return X.dec(value);
}

function readNumber(key) {
  const value = storageMethod('s', 'GET_ITEM', key);
  if (value === null || value === '') return null;

  const number = Number(dec(value));
  return Number.isFinite(number) ? number : null;
}

function readRawNumber(key) {
  const value = storageMethod('s', 'GET_ITEM', key);
  if (value === null || value === '') return null;

  const number = Number(dec(value));
  if (!Number.isFinite(number)) return null;

  return {
    raw: value,
    value: number,
  };
}

function isValidStep(step) {
  return step === ROUND_RESULT_STEP.BASIC_BET ||
    step === ROUND_RESULT_STEP.DREW ||
    step === ROUND_RESULT_STEP.GAME_OVER;
}

function isReloadWaiting() {
  return Boolean(pendingReload && !pendingReload.done) || readBool(KEYS.playingReloadUser());
}

function isStepReady(step) {
  if (step === ROUND_RESULT_STEP.BASIC_BET) {
    return storageMethod('s', 'GET_ITEM', KEYS.gameState()) === KEYS.basicBet();
  }

  if (step === ROUND_RESULT_STEP.DREW) {
    return readBool(KEYS.drewReady());
  }

  if (step === ROUND_RESULT_STEP.GAME_OVER) {
    return storageMethod('s', 'GET_ITEM', KEYS.gameState()) === KEYS.gameOver();
  }

  return false;
}

function hasZeroCoin(coins) {
  return coins?.player === 0 || coins?.enemy === 0;
}

function getCurrentCoins() {
  return {
    player: readNumber(KEYS.coinsPlayer()),
    enemy: readNumber(KEYS.coinsEnemy()),
  };
}

function getCurrentBets() {
  return {
    playerBet: readNumber(KEYS.coinsPlayerBet()),
    enemyBet: readNumber(KEYS.coinsEnemyBet()),
    playerExtBet: readNumber(KEYS.coinsPlayerExtBet()),
    enemyExtBet: readNumber(KEYS.coinsEnemyExtBet()),
  };
}

function getFoldProjectedCoins() {
  if (!readBool(KEYS.foldState())) return null;

  const foldUser = readNullableBool(KEYS.foldUser());
  if (foldUser === null) return null;

  const playerKey = foldUser ? KEYS.coinsPlayerLocalFold() : KEYS.coinsPlayerRemoteFold();
  const enemyKey = foldUser ? KEYS.coinsEnemyLocalFold() : KEYS.coinsEnemyRemoteFold();
  const player = readRawNumber(playerKey);
  const enemy = readRawNumber(enemyKey);

  if (!player || !enemy) return null;

  return {
    player: player.value,
    enemy: enemy.value,
    playerRaw: player.raw,
    enemyRaw: enemy.raw,
    foldUser,
  };
}

function buildProofFromCoins({ step, ready, source, coins, bets = getCurrentBets() }) {
  return {
    step,
    ready,
    source,
    coinsPlayer: coins?.player ?? null,
    coinsEnemy: coins?.enemy ?? null,
    coinsPlayerBet: bets.playerBet,
    coinsEnemyBet: bets.enemyBet,
    coinsPlayerExtBet: bets.playerExtBet,
    coinsEnemyExtBet: bets.enemyExtBet,
    drewState: readBool(KEYS.drewState()),
    foldState: readBool(KEYS.foldState()),
    roundEnd: readBool(KEYS.roundEnd()),
  };
}

function getRoundResultProof() {
  const foldCoins = getFoldProjectedCoins();
  if (foldCoins) {
    return buildProofFromCoins({
      step: hasZeroCoin(foldCoins) ? ROUND_RESULT_STEP.GAME_OVER : ROUND_RESULT_STEP.BASIC_BET,
      ready: true,
      source: 'foldProjected',
      coins: foldCoins,
    });
  }

  const currentCoins = getCurrentCoins();
  if (readBool(KEYS.drewState())) {
    return buildProofFromCoins({
      step: ROUND_RESULT_STEP.DREW,
      ready: currentCoins.player !== null && currentCoins.enemy !== null,
      source: 'drewState',
      coins: currentCoins,
    });
  }

  const step = hasZeroCoin(currentCoins) || basicBetMainCheck()
    ? ROUND_RESULT_STEP.GAME_OVER
    : ROUND_RESULT_STEP.BASIC_BET;
  const betResulting = readBool(KEYS.betResulting());
  const roundEnd = readBool(KEYS.roundEnd());
  const coinsReady = currentCoins.player !== null && currentCoins.enemy !== null;

  return buildProofFromCoins({
    step,
    ready: coinsReady && (!betResulting || roundEnd || isStepReady(step)),
    source: betResulting ? 'roundResult' : 'stepReady',
    coins: currentCoins,
  });
}

function mirroredValueMatches(localValue, remoteValue) {
  if (localValue === null || remoteValue === null) return true;
  return localValue === remoteValue;
}

function remoteProofMatches(localProof, remoteProof) {
  if (!remoteProof) return true;
  if (!remoteProof.ready || remoteProof.step !== localProof.step) return false;

  if (localProof.source === 'foldProjected' || remoteProof.source === 'foldProjected') {
    return mirroredValueMatches(localProof.coinsPlayer, remoteProof.coinsEnemy) &&
      mirroredValueMatches(localProof.coinsEnemy, remoteProof.coinsPlayer);
  }

  return mirroredValueMatches(localProof.coinsPlayer, remoteProof.coinsEnemy) &&
    mirroredValueMatches(localProof.coinsEnemy, remoteProof.coinsPlayer) &&
    mirroredValueMatches(localProof.coinsPlayerBet, remoteProof.coinsEnemyBet) &&
    mirroredValueMatches(localProof.coinsEnemyBet, remoteProof.coinsPlayerBet) &&
    mirroredValueMatches(localProof.coinsPlayerExtBet, remoteProof.coinsEnemyExtBet) &&
    mirroredValueMatches(localProof.coinsEnemyExtBet, remoteProof.coinsPlayerExtBet);
}

export function getRoundResultNextStep() {
  return getRoundResultProof().step;
}

function clearPendingTimer(pending) {
  if (pending?.timer) clearInterval(pending.timer);
}

function localStepMatches(step) {
  return getRoundResultNextStep() === step;
}

function canProveLocalStep(step, remoteProof = null) {
  const localProof = getRoundResultProof();
  return localProof.step === step && localProof.ready && remoteProofMatches(localProof, remoteProof);
}

function sendStepReady(pending = pendingReload) {
  if (!pending || pending.done || !localStepMatches(pending.step)) return;

  const proof = getRoundResultProof();
  if (!proof.ready || proof.step !== pending.step) return;

  pending.readySent = true;
  passiveReadyStep = pending.step;
  request('roundResultStepReady', {
    step: pending.step,
    reloadState: pending.reloadState,
    proof,
  });
}

function commitRoundResultReloadStep(step) {
  if (step !== ROUND_RESULT_STEP.BASIC_BET && step !== ROUND_RESULT_STEP.GAME_OVER) return;

  const foldCoins = getFoldProjectedCoins();
  if (!foldCoins) return;

  storageMethod('s', 'SET_ITEM', KEYS.coinsPlayer(), foldCoins.playerRaw);
  storageMethod('s', 'SET_ITEM', KEYS.coinsEnemy(), foldCoins.enemyRaw);
}

function tryEnterPending(reason) {
  if (!pendingReload || pendingReload.done) return false;
  if (!localStepMatches(pendingReload.step)) {
    console.warn('round result reload local step changed', {
      pending: pendingReload.step,
      current: getRoundResultNextStep(),
    });
    return false;
  }
  if (!pendingReload.remoteSameStep || !pendingReload.remoteReady || !pendingReload.remoteAcked) return false;

  const pending = pendingReload;
  clearPendingTimer(pending);

  pendingReload = {
    ...pending,
    done: true,
    timer: null,
  };
  passiveReadyStep = null;

  storageMethod('s', 'EMPTY_VALUE', KEYS.playingReloadUser());
  LOADING_EVENT.show();
  commitRoundResultReloadStep(pending.step);
  pending.enterNextStep({
    step: pending.step,
    reloadState: pending.reloadState,
    reason,
  });

  return true;
}

function sendReloadRequest(pending = pendingReload) {
  if (!pending || pending.done) return;

  const step = getRoundResultNextStep();
  if (step !== pending.step) {
    pending.step = step;
    pending.remoteSameStep = false;
    pending.remoteReady = false;
    pending.remoteAcked = false;
    pending.readySent = false;
    passiveReadyStep = null;
  }

  request('requestRoundResultReloadSync', {
    step: pending.step,
    reloadState: pending.reloadState,
    proof: getRoundResultProof(),
  });

  if (pending.remoteSameStep) sendStepReady(pending);
}

export function beginRoundResultReloadWait({ reloadState = '', enterNextStep }) {
  if (typeof enterNextStep !== 'function') return;
  clearPendingTimer(pendingReload);

  const step = getRoundResultNextStep();
  passiveReadyStep = null;
  pendingReload = {
    step,
    reloadState,
    enterNextStep,
    done: false,
    remoteSameStep: false,
    remoteReady: false,
    remoteAcked: false,
    readySent: false,
    timer: null,
  };

  LOADING_EVENT.show();
  sendReloadRequest();
  pendingReload.timer = setInterval(() => sendReloadRequest(), ROUND_RESULT_RELOAD_RETRY_MS);
}

export function announceRoundResultStepReady(step = getRoundResultNextStep()) {
  if (!isValidStep(step)) return;

  request('roundResultStepReady', {
    step,
    proof: getRoundResultProof(),
  });
}

export function handleRoundResultReloadRequest(message) {
  const remoteStep = message?.step;
  const localStep = getRoundResultNextStep();
  const proof = getRoundResultProof();
  const accepted = isValidStep(remoteStep) && localStep === remoteStep && canProveLocalStep(localStep, message?.proof);

  request('responseRoundResultReloadSync', {
    step: localStep,
    accepted,
    proof,
  });

  if (!accepted) return;

  if (pendingReload && !pendingReload.done && remoteStep === pendingReload.step) {
    pendingReload.remoteSameStep = true;
    sendStepReady();
    tryEnterPending('reloadRequest');
    return;
  }

  if (isStepReady(localStep)) {
    request('roundResultStepReady', {
      step: localStep,
      proof,
    });
  }
}

export function handleRoundResultReloadResponse(message) {
  if (!pendingReload || pendingReload.done) return;

  const remoteStep = message?.step;
  if (!message?.accepted || remoteStep !== pendingReload.step || !canProveLocalStep(pendingReload.step, message?.proof)) return;

  pendingReload.remoteSameStep = true;
  sendStepReady();
  tryEnterPending('reloadResponse');
}

export function handleRoundResultStepReady(message) {
  const remoteStep = message?.step;
  if (!isValidStep(remoteStep) || !canProveLocalStep(remoteStep, message?.proof)) return false;

  if (pendingReload && !pendingReload.done && remoteStep === pendingReload.step) {
    pendingReload.remoteSameStep = true;
    pendingReload.remoteReady = true;
    sendStepReady();
    request('roundResultStepAck', {
      step: pendingReload.step,
      proof: getRoundResultProof(),
    });
    tryEnterPending('remoteStepReady');
    return true;
  }

  request('roundResultStepAck', {
    step: remoteStep,
    proof: getRoundResultProof(),
  });

  if (isReloadWaiting()) {
    if (passiveReadyStep !== remoteStep) {
      passiveReadyStep = remoteStep;
      request('roundResultStepReady', {
        step: remoteStep,
        proof: getRoundResultProof(),
      });
    }
  }

  return true;
}

export function handleRoundResultStepAck(message) {
  if (!pendingReload || pendingReload.done) return;

  const remoteStep = message?.step;
  if (remoteStep !== pendingReload.step || !canProveLocalStep(pendingReload.step, message?.proof)) return;

  pendingReload.remoteSameStep = true;
  pendingReload.remoteAcked = true;
  tryEnterPending('remoteStepAck');
}
