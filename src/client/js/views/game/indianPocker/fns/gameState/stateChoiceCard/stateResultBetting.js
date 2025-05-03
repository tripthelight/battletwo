import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import socketNextStepEvent from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/socketNextStepEvent';
import againChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/againChoiceCard';

export default (_state) => {
  LOADING_EVENT.show();
  if (_state == 'start' || _state == 'end') socketNextStepEvent();
  if (_state == 'tie') againChoiceCard();
};
