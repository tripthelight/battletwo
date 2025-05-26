import compairStorage from '@/client/js/functions/compairStorage';

export default (_arr) => {
  return compairStorage(String.fromCharCode(..._arr));
};
