import compairDecStorage from '@/client/js/functions/compairDecStorage';

export default (_arr) => {
  return compairDecStorage(String.fromCharCode(..._arr));
};
