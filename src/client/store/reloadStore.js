import { configureStore, createSlice } from '@reduxjs/toolkit';

// 슬라이스(slice) 생성: deviceState 상태 관리
const reloadStoreSlice = createSlice({
  name: 'reloadStore',
  initialState: {
    reloadState: false,
  },

  reducers: {
    updateDeviceState: (state, action) => {
      state.reloadState = action.payload.reloadState;
    },
  },
});

// 액션과 리듀서 추출
export const { updateReloadState } = reloadStoreSlice.actions;

// 스토어 생성
const reloadStore = configureStore({
  reducer: {
    deviceState: reloadStoreSlice.reducer,
  },
});

export default reloadStore;
