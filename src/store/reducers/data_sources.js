import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    data_sourceId: '',
  };


const dataSourcesSlice = createSlice({
  name: 'data_sources',
  initialState,
  reducers: {
    startEditDataSources: (state, action) => {
      state.data_sourceId = action.payload
    },
  },    
});

export const {startEditDataSources} = dataSourcesSlice.actions

export const dataSourcesReducer  = dataSourcesSlice.reducer;