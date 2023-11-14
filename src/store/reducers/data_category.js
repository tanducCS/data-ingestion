import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    data_categoryId: '',
  };


const dataCategoriesSlice = createSlice({
  name: 'data_categories',
  initialState,
  reducers: {
    startEditDataCategory: (state, action) => {
      state.data_categoryId = action.payload
    },
  },    
});

export const {startEditDataCategory} = dataCategoriesSlice.actions

export const dataCategoriesReducer  = dataCategoriesSlice.reducer;