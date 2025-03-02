import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';

// 슬라이스(slice) 생성: deviceState 상태 관리
const deviceStateSlice = createSlice({
  name: 'deviceState',
  initialState: {
    deviceState: '',
  },

  reducers: {
    updateDeviceState: (state, action) => {
      state.deviceState = action.payload.deviceState;
    },
  },
});

// 액션과 리듀서 추출
export const { updateDeviceState } = deviceStateSlice.actions;

// 스토어 생성
const deviceStateStore = configureStore({
  reducer: {
    deviceStateState: deviceStateSlice.reducer,
  },
});

export default deviceStateStore;
