import { API } from "../base";

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => 'users',
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Users', id: 'LIST' }` is invalidated
            [{ type: 'Users', id: 'LIST' }],
    }),
    getUsersById: build.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    addUser: build.mutation({
      query(body){
        return {
          url: 'users',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation({
      query(data){
        return {
          url: `users/${data.id}`,
          method: 'PATCH',
          body: data.body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: build.mutation({
      query(id){
        return{
          url: `users/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
    })
  }),
  overrideExisting: true,
});

export const {useGetUsersByIdQuery,useGetAllUsersQuery,useAddUserMutation,useUpdateUserMutation, useDeleteUserMutation} = userApi