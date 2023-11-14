import { API } from "../base";

const dataSourcesApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllDataSources: build.query({
      query: () => 'data-sources',
    }),
    getDataSourceById: build.query({
      query: (id) => `data-sources/${id}`
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllDataSourcesQuery, useGetDataSourceByIdQuery} = dataSourcesApi