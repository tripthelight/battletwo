import { request } from '@/client/js/network/blackAndWhite1/request';

export default function () {
  // 나는 gameState playing으로 왔어
  // 너의 gameState를 보내줘
  request("enterPlayingSend", { enter: true });
};
