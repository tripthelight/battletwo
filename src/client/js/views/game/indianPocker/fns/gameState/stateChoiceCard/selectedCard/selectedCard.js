import throwObj from '@/client/js/module/errorHandler/throwObj';
import createSVG from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createSVG';
import createT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createT';
import createNumber from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createNumber';

export default (nCode, payload) =>
  new Promise(async (resolve) => {
    try {
      const { HASHES, IDX, N_PAYLOADS, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS } = payload;
      const data = await createSVG(nCode);
      await Promise.all([createNumber({ ...data, HASHES, IDX, N_PAYLOADS }), createT({ ...data, HASHES, IDX, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS })]);
      resolve(data.svg);
    } catch (error) {
      throw throwObj('cardNum', `selectedCard.js - draw choice card failed : ${error}`);
    }
  });
