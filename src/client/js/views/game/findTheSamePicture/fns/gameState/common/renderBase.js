import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { buildPlayingScene } from '@/client/js/views/game/findTheSamePicture/fns/scene/scene';
import { ensureBoardCards } from '@/client/js/views/game/findTheSamePicture/fns/board/board';
import { renderTracks } from '@/client/js/views/game/findTheSamePicture/fns/track/track';
import { scheduleLayout } from '@/client/js/views/game/findTheSamePicture/fns/layout/layout';

export default function renderBase() {
  if (!runtime.state || !buildPlayingScene()) {
    return false;
  }

  ensureBoardCards();
  renderTracks();

  if (runtime.elements.result) {
    runtime.elements.result.hidden = true;
  }

  scheduleLayout();
  return true;
}
