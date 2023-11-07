import { API } from "../base";

const dataSourceApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllDataSource: build.query({
      query: () => 'data-sources',
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllDataSourceQuery} = dataSourceApi