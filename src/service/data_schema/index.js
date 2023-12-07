import { API } from "../base";

const dataSchemaApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllSchema: build.query({
      query: () => 'data-schema',
      providesTags: (result) => 
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'DataSchema', id })),
              { type: 'DataSchema', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Users', id: 'LIST' }` is invalidated
            [{ type: 'DataSchema', id: 'LIST' }],
    }),
    getSchemaById: build.query({
      query: (id) => `data-schema/${id}`,
      providesTags: (result, error, id) => [{ type: 'DataSchema', id }],
    }),
    addSchema: build.mutation({
      query(body){
        return {
          url: 'data-schema',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'DataSchema', id: 'LIST' }],
    }),
    updateSchema: build.mutation({
      query(data){
        return {
          url: `data-schema/${data.id}`,
          method: 'PUT',
          body: data.body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'DataSchema', id }],
    }),
    deleteSchema: build.mutation({
      query(id){
        return{
          url: `data-schema/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'DataSchema', id }],
    })
  }),
  overrideExisting: true,
});

export const {useGetAllSchemaQuery,useGetSchemaByIdQuery,useAddSchemaMutation,useUpdateSchemaMutation,useDeleteSchemaMutation} = dataSchemaApi