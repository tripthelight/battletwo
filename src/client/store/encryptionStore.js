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
  const encryptedKey = findCharCode([84, 78, 85, 70, 71, 74, 88, 68, 67, 77]);
  const keyList = compair[encryptedKey] || [];

  /*
  // NUMBERS에서 1 ~ 10까지 숫자만 추출
  const result = keyList.slice(0, 10);
  */

  /*
  // NUMBERS에서 숫자 1카드 5장 & 숫자 10카드 5장 추출
  const result = [];
  result.push(...Array(5).fill(keyList[0])); // 1카드 5개 추가
  result.push(...Array(5).fill(keyList[9])); // 10카드 5개 추가
  */

  // NUMBERS에서 숫자 1카드 10장 추출
  const result = [];
  result.push(...Array(1).fill(keyList[0])); // 1카드 10개 추가

  // result
  return result;
};

export default encryptionStore;
