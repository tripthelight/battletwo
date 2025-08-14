import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';

export default (_num) => {
  console.log('_num >>>>>>>>>>>>> ', _num);
  return cardNumDecryption(_num);
};
