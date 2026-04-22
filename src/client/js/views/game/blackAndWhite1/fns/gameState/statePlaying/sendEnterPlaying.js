import { request } from '@/client/js/network/blackAndWhite1/request';
import { publicGameStateProof } from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

export default function () {
  request('enterPlayingSend', { stateCode: publicGameStateProof('playing') });
}
