import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';
import findCharCode from '@/client/js/functions/findCharCode';

// 슬라이스(slice) 생성: encryption 상태 관리
const encryptionSlice = createSlice({
  name: 'encryptionStore',
  initialState: {
    compair: {},
    keypair: '',
    oldpair: '',
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
  },
});

// 액션과 리듀서 추출
export const { updateCompair, updateKeypair, updateOldpair } = encryptionSlice.actions;

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
  const encryptedKey = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // nums
  const keyList = compair[encryptedKey] || [];

  return keyList; // 1 ~ 40

  // // NUMBERS에서 1 ~ 10까지 숫자만 추출
  // const result = keyList.slice(0, 10);
  // return result;
};

export default encryptionStore;
