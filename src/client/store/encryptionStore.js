import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';
import findCharCode from '@/client/js/functions/findCharCode';

// 슬라이스(slice) 생성: encryption 상태 관리
const encryptionSlice = createSlice({
  name: 'encryptionStore',
  initialState: {
    compair: {},
    keypair: '',
    oldpair: '',
    path: {
      n: Object.create(null),
      t: Object.create(null),
    },
  },

  reducers: {
    updateCompair: (state, action) => {
      state.compair = action.payload.compair;
    },
    updateKeypair: (state, action) => {
      state.keypair = action.payload.keypair;
    },
    updateOldpair: (state, action) => {
      state.oldpair = action.payload.oldpair;
    },
    updatePathN: (state, action) => {
      state.path.n[action.payload.k] = action.payload.v;
    },
    updatePathT: (state, action) => {
      state.path.t[action.payload.k] = action.payload.v;
    },
  },
});

// 액션과 리듀서 추출
export const {
  updateCompair,
  updateKeypair,
  updateOldpair,
  updatePathN,
  updatePathT,
} = encryptionSlice.actions;

// 스토어 생성
const encryptionStore = configureStore({
  reducer: {
    encryptionState: encryptionSlice.reducer,
  },
});

// GETTERS
export const selectCompairNumbers = () => {
  const state = encryptionStore.getState();
  const compair = state.encryptionState.compair;
  const encryptedKey = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // privateCardNums
  const keyList = compair[encryptedKey] || [];

  return keyList; // 1 ~ 40

  // // NUMBERS에서 1 ~ 10까지 숫자만 추출
  // const result = keyList.slice(0, 10);
  // return result;
};
export const publicCardNumbs = () => {
  const state = encryptionStore.getState();
  const compair = state.encryptionState.compair;
  const encryptedKey = findCharCode([84, 78, 85, 70, 71, 74, 88, 68, 67, 77]); // publicCardNums
  const keyList = compair[encryptedKey] || [];
  return keyList; // 1 ~ 40
};
export const pathPayload = (_c) => {
  const state = encryptionStore.getState();
  const path = state.encryptionState.path
  if (_c === "n") {
    return path.n;
  } else if (_c === "t") {
    return path.t;
  }
  return null;
}

export default encryptionStore;
