import myNickname from "@/client/js/functions/myNickname";

export default function () {
  if (document.querySelector('.my-nickname')) {
    document.querySelector('.my-nickname').innerText = myNickname();
  }
}
