import createSVG from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createSVG";
import createT from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createT";
import createNumber from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/createNumber";

export default (nCode) => new Promise(async (resolve) => {
  try {
    const data = await createSVG(nCode);
    await Promise.all([createNumber(data), createT(data)]);
    resolve(data.svg);
  } catch (error) {
    throw { message: 'selectedCard : make choice card error' + error };
  }
})
