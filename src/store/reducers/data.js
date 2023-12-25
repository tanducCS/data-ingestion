import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    dataId: '',
  };


const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    startImportData: (state, action) => {
      state.dataId = action.payload
    },
  },    
});

export const {startImportData} = dataSlice.actions

export const dataReducer  = dataSlice.reducer;