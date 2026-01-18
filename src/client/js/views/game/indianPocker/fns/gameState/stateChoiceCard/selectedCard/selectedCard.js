import createSVG from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createSVG';
import createT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createT';
import createNumber from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createNumber';

export default (nCode, payload) =>
  new Promise(async (resolve) => {
    try {
      const { HASHES, N_PAYLOADS, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS } = payload;
      const data = await createSVG(nCode);
      await Promise.all([createNumber({ ...data, HASHES, N_PAYLOADS }), createT({ ...data, HASHES, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS })]);
      resolve(data.svg);
    } catch (error) {
      throw { message: 'selectedCard : make choice card error' + error };
    }
  });
