import findNickname from '@/client/js/functions/findNickname';

export default function (nickName) {
  const nicknameElem = document.querySelector(`${nickName}-nickname`);
  if (!nicknameElem) return; // TODO: html없음 error case -> 홈으로 이동;
  nicknameElem.innerText = findNickname(nickName);
}
