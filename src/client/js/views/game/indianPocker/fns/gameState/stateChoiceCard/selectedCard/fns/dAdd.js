export default (p, d) => {
  p.setAttribute("d", d
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, ' ') // 모든 공백(줄바꿈 포함)을 한 칸으로;
  );
}