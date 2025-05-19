import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';

// 슬라이스(slice) 생성: obfuscation 상태 관리
const obfuscationSlice = createSlice({
  name: 'obfuscationStore',
  initialState: {
    obfuscation: {},
  },

  reducers: {
    updateObfuscation: (state, action) => {
      state.obfuscation = action.payload.obfuscation;
    },
  },
});

// 액션과 리듀서 추출
export const { updateObfuscation } = obfuscationSlice.actions;

// 스토어 생성
const obfuscationStore = configureStore({
  reducer: {
    obfuscationState: obfuscationSlice.reducer,
  },
});

export default obfuscationStore;
