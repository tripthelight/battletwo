import { publicCardNumbs, pathPayload } from '@/client/store/encryptionStore';
import encryptionStore, { updatePathN, updatePathT } from '@/client/store/encryptionStore';
import { __fnv1a32 } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/f';
import { H } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/f';
import nv from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/payload/nv";
import nt from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/payload/nt";

export default () => {
  const cardCodes = publicCardNumbs();
  if (!cardCodes || (cardCodes && cardCodes.length === 0)) {
    throw { message: 'public card code length failed.' };
  };

  /**
   * path : card number
   * path : card T
   */
  for (let i = 0; i < cardCodes.length; i++) {
    const k = cardCodes[i];

    // path : card number
    encryptionStore.dispatch(updatePathN({
      k: Number("0x" + (Number("0x" + __fnv1a32(k).toString(16))).toString(16)),
      v: nv(k)
    }));
    // path : card T
    encryptionStore.dispatch(updatePathT({
      k: H(k),
      v: nt(k)
    }));
  };

  // const payloadN = pathPayload("n");
  // const payloadT = pathPayload("t");
  // console.log("path payload number ::::: ", payloadN);
  // console.log("path payload T :::::::::: ", payloadT);
};
