import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { TRACK_SIZE } from '@/client/js/views/game/findTheSamePicture/fns/common/variable';

function createTrackList() {
  const list = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < TRACK_SIZE; i += 1) {
    const item = document.createElement('li');
    const image = new Image();

    image.alt = '';
    image.draggable = false;

    item.appendChild(image);
    fragment.appendChild(item);
  }

  list.appendChild(fragment);

  return list;
}

export function buildPlayingScene() {
  const { gameScene } = runtime.elements;

  if (!gameScene) return false;

  if (
    runtime.elements.board &&
    runtime.elements.board.isConnected
  ) {
    return true;
  }

  gameScene.replaceChildren();

  const intro = document.createElement('div');
  intro.className = 'fsp-intro';
  intro.hidden = true;

  const introTitle = document.createElement('strong');
  const introText = document.createElement('span');

  intro.append(
    introTitle,
    introText,
  );

  const enemyBlock = document.createElement('div');
  enemyBlock.className = 'enemy-block';

  const enemyList = createTrackList();

  const enemyIcon = document.createElement('div');
  enemyIcon.className = 'enemy-icon';

  enemyBlock.append(
    enemyList,
    enemyIcon,
  );

  const pictureBoard = document.createElement('div');
  pictureBoard.className = 'picture-board';

  const board = document.createElement('ul');
  board.className = 'board';

  pictureBoard.appendChild(board);

  const playerBlock = document.createElement('div');
  playerBlock.className = 'player-block';

  const playerList = createTrackList();

  const playerIcon = document.createElement('div');
  playerIcon.className = 'player-icon';

  playerBlock.append(
    playerList,
    playerIcon,
  );

  const result = document.createElement('div');
  result.className = 'fsp-result';
  result.hidden = true;

  const resultTitle = document.createElement('div');
  resultTitle.className = 'fsp-result-title';

  const resultActions = document.createElement('div');
  resultActions.className = 'fsp-result-actions';

  const homeButton = document.createElement('button');
  homeButton.type = 'button';
  homeButton.textContent = 'HOME';

  const replayButton = document.createElement('button');
  replayButton.type = 'button';
  replayButton.textContent = 'REPLAY';

  resultActions.append(
    homeButton,
    replayButton,
  );

  result.append(
    resultTitle,
    resultActions,
  );

  board.addEventListener('click', (event) => {
    runtime.handlers.boardClick?.(event);
  });

  homeButton.addEventListener('click', () => {
    runtime.handlers.leaveFinishedGame?.('/selectGame');
  });

  replayButton.addEventListener('click', () => {
    runtime.handlers.leaveFinishedGame?.(
      '/game/findTheSamePicture',
    );
  });

  gameScene.append(
    enemyBlock,
    pictureBoard,
    playerBlock,
    intro,
    result,
  );

  runtime.elements = {
    ...runtime.elements,
    intro,
    introTitle,
    introText,
    enemyBlock,
    enemyList,
    enemyIcon,
    pictureBoard,
    board,
    boardButtons: [],
    playerBlock,
    playerList,
    playerIcon,
    result,
    resultTitle,
  };

  return true;
}
