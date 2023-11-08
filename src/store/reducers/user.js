import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    userId: '',
  };


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startEditUser: (state, action) => {
      state.userId = action.payload
    },
  },    
});

export const {startEditUser} = userSlice.actions

export const userReducer  = userSlice.reducer;