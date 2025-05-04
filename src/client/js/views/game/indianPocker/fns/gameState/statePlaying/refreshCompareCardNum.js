import bcrypt from "bcryptjs";

export default (_arr) => {
  for (let j = 1; j < 11; j++) {
    if (bcrypt.compareSync(j.toString(), _arr.num)) {
      return j;
    }
  }
};
