/**
 * popup common execution
 * body 안에 popup 이라는 문구가 포함된 class 가진 모든 element를 찾아서 해당 element만 remove
 */
export function comnPopup() {
  document.querySelectorAll('body *').forEach((element) => {
    if ([...element.classList].some((className) => className.includes('popup'))) {
      element.remove();
    }
  });
}
