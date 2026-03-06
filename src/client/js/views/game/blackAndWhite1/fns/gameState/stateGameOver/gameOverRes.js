import { comnText } from '@/client/js/functions/language';

export default (result) => {
  switch (result) {
    case "win":
      return comnText.win;
    case "lose":
      return comnText.die;
    case "drew":
      return comnText.drew;
    default:
      /* error */ break;
  }
};
