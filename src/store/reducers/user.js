// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import userService from "../../service/users"
// import { create, get } from "lodash";

// const initialState = {
//     loading: '',
//     error: null,
//     userlist : [],
//     user: null
//   };

// export const getAllUser = createAsyncThunk (
//     'user/getAll',
//     async () => {
//         const data = await userService.getAllUser();
//         console.log(data)
//         return data;
//     }
// )

// export const getUserById = createAsyncThunk (
//     'user/getById',
//     async () => {
//         const data = await userService.getUserById();
//         console.log(data);
//         return data;
//     }
// )

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//         builder.addCase(getAllUser.fulfilled, (state, action) => {
//             state.loading = "fulfilled"
//             state.userlist = action.payload
//         })
//         builder.addCase(getAllUser.pending, (state, action) => {
//             state.loading  = "pending"
//         })
//         builder.addCase(getAllUser.rejected, (state, action) => {
//             state.loading  = "rejected"
//             state.error = action.error.message
//         })
//     }
// })

// export default userReducers = userSlice.reducer