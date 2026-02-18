export let colorArr = ["even", "odd"];
export let posX = 0;
export let posY = 0;
export let selectX = 0;
export let selectY = 0;
export let activeIndex = 0;
export let InnerSquareW = window.innerWidth - 40;
export let InnerSquareH = window.innerHeight / 2;
export let dragSrcEl;

const state = {
  posX: 0,
  posY: 0,
  selectX: 0,
  selectY: 0,
  activeIndex: 0,
  dragSrcEl: null,
  InnerSquareW: window.innerWidth - 40,
  InnerSquareH: window.innerHeight / 2,
};

export const reactiveState = new Proxy(state, {
  set(target, key, value) {
    // console.log(`${String(key)}가 ${target[key]} → ${value}로 변경됨`);
    target[key] = value;
    return true;
  },
});
