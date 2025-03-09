export default function () {
  // 확대 기본 동작 방지
  document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
  });
  // 확대 기본 동작 방지
  document.addEventListener('gesturechange', (event) => {
    event.preventDefault();
  });
  // 확대 기본 동작 방지
  document.addEventListener('gestureend', (event) => {
    event.preventDefault();
  });
}
