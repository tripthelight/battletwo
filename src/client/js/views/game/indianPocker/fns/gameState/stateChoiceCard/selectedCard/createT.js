import buildT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/buildT';
import toSvgPathsT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/toSvgPathsT';
// import { pathPayload } from '@/client/store/encryptionStore';
// import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { safeBase64Decode } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt';
import dAdd from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/dAdd';
// import { H } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/f';
// import C from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/C';
// import { reverseString as D } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/reverseString';

export default (_d) =>
  new Promise((resolve) => {
    try {
      const { nCode, SVG_NS, svg, HASHES, IDX, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS } = _d;

      const d = toSvgPathsT(buildT({ HASHES, IDX, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS, nCode }));

      for (let i = 0; i < d.length; i++) {
        const path = document.createElementNS(safeBase64Decode(SVG_NS), 'path');
        dAdd(path, d[i]);
        svg.appendChild(path);
      }

      resolve();
    } catch (error) {
      throw error;
    }
  });
