export default (elems) => {
  const { svg, imgEl, btnEl, liEl } = elems;

  // 카드뒷면이미지 삭제
  if (imgEl) imgEl.remove();
  // 카드뒷면이미지가 있던 자리에 svg 노출(appendChild)
  // svg 초기 상태는 Y축으로 90도 반회전 되어있는 상태
  // btnEl.appendChild(svg);
  if (btnEl) btnEl.remove();
  // svg 노출과 동시에 svg Y축으로 90도 반회전하는 애니메이션 시작
  liEl.appendChild(svg);
  if (imgEl && btnEl) liEl.classList.add("end");
}
