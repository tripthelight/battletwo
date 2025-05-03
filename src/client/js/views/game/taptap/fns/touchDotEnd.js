import { timeInterval_300 } from '@/client/js/functions/variable';

export default (dotEl) => {
  setTimeout(() => {
    dotEl.remove();
  }, timeInterval_300);
};
