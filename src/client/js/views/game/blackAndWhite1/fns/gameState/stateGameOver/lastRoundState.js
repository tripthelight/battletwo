export default (win, die, drew) => {
  if (win > die) {
    return "win";
    // console.log('내가 이김');
  }
  if (win > 0 && die == 0) {
    return "win";
    // console.log('내가 이김');
  }
  if (win < die) {
    return "lose";
    // console.log('내가 짐');
  }
  if (die > 0 && win == 0) {
    return "lose";
    // console.log('내가 짐');
  }
  if (win == die) {
    return "drew";
    // console.log('비김');
  }
  if (win == 0 && die == 0) {
    return "drew";
    // console.log('비김');
  }
};
