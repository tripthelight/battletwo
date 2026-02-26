export default () => {
  const FIRST_USER = window.sessionStorage.getItem("firstUser");
  const USER = window.localStorage.getItem("uid");
  if (FIRST_USER === USER) return true;
  return false;
};
