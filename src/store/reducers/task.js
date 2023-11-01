import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    tasklist : [],
    task: null,
  };


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},    
});

export const taskReducer  = taskSlice.reducer;