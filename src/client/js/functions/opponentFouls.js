import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

// 상대 Peer가 내 요청 데이터의 이상을 검출해 기존 opponentFouls 메시지를 보낸 경우.
// 이 Peer가 잘못된 접근 주체이므로 다시 상대에게 오류를 되돌려 보내지 않는다.
export default function opponentFouls(data) {
  eventHanlerErrorComn({
    errCase: 'dataManipulation',
    target: 'peer-notice',
    message: data?.message,
  });
}
