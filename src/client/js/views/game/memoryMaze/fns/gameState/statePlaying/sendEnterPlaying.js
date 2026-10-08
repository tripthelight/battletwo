import { request } from '@/client/js/network/memoryMaze/request';

export default function () {
  // 나는 gameState playing으로 왔어
  // 너의 gameState를 보내줘
  request("enterPlayingSend", { enter: true });
};
