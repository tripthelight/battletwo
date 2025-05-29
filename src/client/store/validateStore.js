import { configureStore, createSlice } from '@reduxjs/toolkit';

// 슬라이스(slice) 생성: deviceState 상태 관리
const validateStoreSlice = createSlice({
  name: 'validateStore',
  initialState: {
    randomNum: null,
    enum: null,
  },

  reducers: {
    updateRandomNum: (state, action) => {
      state.randomNum = action.payload.randomNum;
    },
    updateEnum: (state, action) => {
      state.enum = action.payload.enum;
    },
  },
});

// 액션과 리듀서 추출
export const { updateRandomNum, updateEnum } = validateStoreSlice.actions;

// 스토어 생성
const validateStore = configureStore({
  reducer: {
    validateState: validateStoreSlice.reducer,
  },
});

export default validateStore;
