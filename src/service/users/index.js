import { API } from "../base";

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => 'users',
    }),
    getUsersById: build.query({
      query: (id) => `users/${id}`
    }),
    
  }),
  overrideExisting: true,
});

export const {useGetUsersByIdQuery,useGetAllUsersQuery} = userApi