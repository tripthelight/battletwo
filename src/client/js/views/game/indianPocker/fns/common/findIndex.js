export default (target) => {
  const closestUl = target?.closest('ul');
  if (closestUl) {
    const childrenUl = Array.from(target.closest('ul')?.children);
    if (childrenUl) {
      const indexTarget = childrenUl?.indexOf(target);
      if (indexTarget) {
        return indexTarget;
      }
    }
  }
  return 0;
};
