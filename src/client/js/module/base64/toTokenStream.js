import { OPEN, CLOSE, SCALE } from '@/client/js/module/base64/variables';

// 중첩 배열 -> int16 토큰 스트림
export default (data) => {
  const out = [];

  const emit = (node) => {
    if (Array.isArray(node) && node.length === 2 && typeof node[0] === 'number' && typeof node[1] === 'number') {
      // [x,y]
      const x = Math.round(node[0] * SCALE);
      const y = Math.round(node[1] * SCALE);
      out.push(x, y);
      return;
    }

    // 중첩 배열
    out.push(OPEN);
    for (const child of node) emit(child);
    out.push(CLOSE);
  };

  emit(data);
  return out;
};
