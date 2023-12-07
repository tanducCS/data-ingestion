import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    data_schemaId: '',
  };


const dataSchemaSlice = createSlice({
  name: 'data_schema',
  initialState,
  reducers: {
    startEditDataSchema: (state, action) => {
      state.data_schemaId = action.payload
    },
  },    
});

export const {startEditDataSchema} = dataSchemaSlice.actions

export const dataSchemaReducer  = dataSchemaSlice.reducer;