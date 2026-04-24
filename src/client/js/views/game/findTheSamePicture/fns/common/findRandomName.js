import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_num) => {
  const NAMES = window.sessionStorage.rns;
  if (!NAMES) return throwObj("sessionStorageLoss", "rns stroage failed.");
  const ARR = JSON.parse(NAMES);
  switch (_num) {
    case 0:
      return ARR[0];
    case 1:
      return ARR[1];
    case 2:
      return ARR[2];
    case 3:
      return ARR[3];
    case 4:
      return ARR[4];
    case 5:
      return ARR[5];
    default:
      break;
  }
};
