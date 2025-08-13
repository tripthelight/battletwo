import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

// 파울은 상대 peer에게 받기만 하는 로직
export default function opponentFouls(data) {
  eventHanlerErrorComn({ errCase: 'foul', message: data.message });
}
