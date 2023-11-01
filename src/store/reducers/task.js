import { createSlice} from '@reduxjs/toolkit';

const initialState  = {
    taskId: '',
  };


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    startEditTask: (state, action) => {
      state.taskId = action.payload
    },
  },    
});

export const {startEditTask} = taskSlice.actions

export const taskReducer  = taskSlice.reducer;