import { timeInterval_300 } from '@/client/js/functions/variable.js';

export default (dotEl) => {
  setTimeout(() => {
    dotEl.remove();
  }, timeInterval_300);
};
