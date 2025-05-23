import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';

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

export default encryptionStore;
