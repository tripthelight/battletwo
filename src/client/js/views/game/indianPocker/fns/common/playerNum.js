import bcrypt from "bcryptjs";

export default (_arr, _user) => {
  for (let i = 0; i < _arr.length; i++) if (_arr[i].host == _user) for (let j = 1; j < 11; j++) if (bcrypt.compareSync(j.toString(), _arr[i].num)) return j;
};
