import { API } from "../base";

const dataCategoryApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllDataCategories: build.query({
      query: () => 'data-categories',
      providesTags: (result) => 
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'DataCategories', id })),
              { type: 'DataCategories', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Users', id: 'LIST' }` is invalidated
            [{ type: 'DataCategories', id: 'LIST' }],

    }),
    getDataCategoryById: build.query({
      query: (id) => `data-categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'DataCategories', id }],
    }),
    addDataCategory: build.mutation({
      query(body){
        return {
          url: 'data-categories',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'DataCategories', id: 'LIST' }],
    }),
    updateDataCategory: build.mutation({
      query(data){
        return {
          url: `data-categories/${data.id}`,
          method: 'PUT',
          body: data.body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'DataCategories', id }],
    }),
    deleteDataCategory: build.mutation({
      query(id){
        return{
          url: `data-categories/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'DataCategories', id }],
    })
  }),
  overrideExisting: true,
});

export const {useGetAllDataCategoriesQuery, useGetDataCategoryByIdQuery, useAddDataCategoryMutation, useUpdateDataCategoryMutation, useDeleteDataCategoryMutation} = dataCategoryApi