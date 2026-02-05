import { pathPayload } from '@/client/store/encryptionStore';
import { safeBase64Decode } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt';
import { __fnv1a32 } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/f';
import dAdd from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/dAdd';
import editPos from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/editPos';
import toSvgPathsN from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/toSvgPathsN';
import buildNumber from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/buildNumber';

export default (_d) =>
  new Promise((resolve) => {
    try {
      const { nCode, encryptSize, SVG_NS, svg, HASHES, IDX, N_PAYLOADS } = _d;

      const d_num = toSvgPathsN(buildNumber({ HASHES, IDX, N_PAYLOADS, nCode }));

      const pathNumber = {
        f: document.createElementNS(safeBase64Decode(SVG_NS), 'path'),
        r: document.createElementNS(safeBase64Decode(SVG_NS), 'path'),
      };

      if (d_num.length === 1) {
        dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
        dAdd(pathNumber.r, editPos.r(d_num[0], nCode, encryptSize));
      } else if (d_num.length === 2) {
        dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
        dAdd(pathNumber.r, editPos.r(d_num[1], nCode, encryptSize));
      }

      svg.appendChild(pathNumber.f);
      svg.appendChild(pathNumber.r);

      resolve();
    } catch (error) {
      throw error;
    }
  });
