import bcrypt from 'bcryptjs';

// export let bcrypt = bcrypt;
export let activeCard = {};
export let pcActiveEl;
export let pcOffsetLeft = 0;
export let pcOffsetTop = 0;
export let mtX = 0;
export let mtY = 0;
export let mmX = 0;
export let mmY = 0;
export let mTargetIdx = 0;
export let pcMoveX = 0;
export let pcMoveY = 0;
export let selectX = 0;
export let selectY = 0;
export let comnArray = [];
// let allInintrtval = 2000;
export let allInintrtval = 1000;
export let cardLen = 20;

const state = {
  activeCard: {},
  pcActiveEl: null,
  pcOffsetLeft: 0,
  pcOffsetTop: 0,
  mtX: 0,
  mtY: 0,
  mmX: 0,
  mmY: 0,
  mTargetIdx: 0,
  pcMoveX: 0,
  pcMoveY: 0,
  selectX: 0,
  selectY: 0,
  comnArray: [],
  allInintrtval: 1000,
  cardLen: 20,
};

export const reactiveState = new Proxy(state, {
  set(target, key, value) {
    // console.log(`${String(key)}가 ${target[key]} → ${value}로 변경됨`);
    target[key] = value;
    return true;
  },
});
