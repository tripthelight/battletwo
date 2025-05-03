export default (translateString) => {
  var n = translateString.indexOf(",");
  var n1 = translateString.indexOf(")");
  var res = parseInt(translateString.slice(n + 1, n1 - 1));
  return res;
};
