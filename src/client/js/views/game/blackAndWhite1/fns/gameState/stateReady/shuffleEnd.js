import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";
import saveSessionStorage from "@/client/js/views/game/blackAndWhite1/fns/common/saveSessionStorage";
import cubeNumIdxChk from "@/client/js/views/game/blackAndWhite1/fns/common/cubeNumIdxChk";

export default (e) => {
  // console.log("shuffleEnd : e.target >>>>>>> ", e.target);

  const shuffleCube = document.querySelectorAll("ul.cube li");
  [].forEach.call(shuffleCube, (item) => {
    item.classList.remove("over");
  });
  evenOdd(e.target);
  // e.target.style.opacity = "1";
  // e.target.style.removeProperty('opacity');
  e.target.removeAttribute('style');
  saveSessionStorage();
  cubeNumIdxChk();
};
