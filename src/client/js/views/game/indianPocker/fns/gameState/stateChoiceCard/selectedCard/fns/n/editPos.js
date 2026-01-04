import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { safeBase64Decode } from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt";

export default {
  // 왼쪽 상단 숫자의 시작 M 변경
  f: (d, p) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${p === findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]) ? 10 + 8 : 10},${10}`
    );
  },
  // 오른쪽 하단 숫자의 시작 M 변경
  r: (d, p, s) => {
    return d.replace(
      /^M\s*-?\d+(\.\d+)?[, ]\s*-?\d+(\.\d+)?/,
      `M${p === findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]) ? Math.floor(parseInt(safeBase64Decode(s.card.w)) - 10 - 8) : Math.floor(parseInt(safeBase64Decode(s.card.w)) - 10 - parseInt(safeBase64Decode(s.num.w)))},${parseInt(safeBase64Decode(s.card.h)) - 10 - parseInt(safeBase64Decode(s.num.h))}`
    );
  },
}
