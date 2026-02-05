export default function (input) {
  const isPair = (v) => Array.isArray(v) && v.length === 2 && typeof v[0] === 'number' && typeof v[1] === 'number';
  const isPath = (v) => Array.isArray(v) && v.length > 0 && isPair(v[0]);
  const isArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && isPath(v[0]);
  const isArrayOfArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && Array.isArray(v[0]) && isArrayOfPaths(v[0]);

  const samePair = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
  const ORIGIN = [0, 0];

  // 단일 path (점들의 배열) -> "M0,0 m... l... Z"
  const pathToD = (path) => {
    const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
    if (path.length <= startIdx) return 'M0,0 Z';

    const [mx, my] = path[startIdx];
    let d = `M0,0 m${mx},${my}`;
    for (let i = startIdx + 1; i < path.length; i++) {
      const [x, y] = path[i];
      d += ` l${x},${y}`;
    }
    return d + ' Z';
  };

  // compound: [path1, path2, ...] -> "M0,0 ... Z m... l... Z ..."
  // (여기서 핵심: 두 번째 서브패스부터는 절대 "M"을 쓰지 않음)
  const compoundToD = (paths) => {
    let d = pathToD(paths[0]); // 첫 서브패스는 M0,0 포함

    for (let p = 1; p < paths.length; p++) {
      const path = paths[p];

      const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
      if (path.length <= startIdx) continue;

      const [mx, my] = path[startIdx];
      d += ` m${mx},${my}`; // ✅ 여기서 "M" 금지, 반드시 상대 move

      for (let i = startIdx + 1; i < path.length; i++) {
        const [x, y] = path[i];
        d += ` l${x},${y}`;
      }
      d += ' Z';
    }

    return d;
  };

  // 1) [[x,y], ...]
  if (isPath(input)) {
    return [pathToD(input)];
  }

  // 2) [[[x,y], ...], [[x,y], ...]]  -> 각각 따로
  if (isArrayOfPaths(input)) {
    return input.map(pathToD);
  }

  // 3) [ [path, path], [path, path] ] -> 각 요소 내부는 합쳐서 2개 리턴
  if (isArrayOfArrayOfPaths(input)) {
    return input.map(compoundToD);
  }

  throw new Error('지원하지 않는 입력 형태입니다.');
}
