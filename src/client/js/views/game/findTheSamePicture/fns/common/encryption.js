import bcrypt from "bcryptjs";

export default (num1, num2) => {
  return new Promise((resolve, reject) => {
    resolve(bcrypt.hashSync(num1, num2));
  });
};
