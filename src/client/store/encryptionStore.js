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
// NUMBERS에서 랜덤한 10개의 숫자만 추출
export const selectCompairNumbers = () => {
  const state = encryptionStore.getState();
  const compair = state.encryptionState.compair;
  const encryptedKey = findCharCode([84, 78, 85, 70, 71, 74, 88, 68, 67, 77]);
  const result = compair[encryptedKey] || [];
  return result.slice(0, 10);
};

export default encryptionStore;
