import { API } from "../base";

const dataSourcesApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllDataSources: build.query({
      query: () => 'data-sources',
      providesTags: (result) => 
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'DataSources', id })),
              { type: 'DataSources', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Users', id: 'LIST' }` is invalidated
            [{ type: 'DataSources', id: 'LIST' }],
    }),
    getDataSourceById: build.query({
      query: (id) => `data-sources/${id}`,
      providesTags: (result, error, id) => [{ type: 'DataSources', id }],
    }),
    addDataSource: build.mutation({
      query(body){
        return {
          url: 'data-sources',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'DataSources', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllDataSourcesQuery, useGetDataSourceByIdQuery, useAddDataSourceMutation} = dataSourcesApi