// browser reload
/*
export default (window.performance.navigation && window.performance.navigation.type === 1) ||
  window.performance
    .getEntriesByType("navigation")
    .map((nav) => {
      nav.type;
    })
    .indexOf("reload") > 0;
*/

const navEntry = performance.getEntriesByType('navigation')[0];
const isReload = (window.performance.navigation && window.performance.navigation.type === 1) || (navEntry && navEntry.type === 'reload');

export default isReload;
