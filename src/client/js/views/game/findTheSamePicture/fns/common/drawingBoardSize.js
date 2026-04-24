import drawingBoardResize from "@/client/js/views/game/findTheSamePicture/fns/common/drawingBoardResize";

export default (_elem) => {
  drawingBoardResize(_elem);
  window.addEventListener("resize", () => {
    drawingBoardResize(_elem);
  });
};
