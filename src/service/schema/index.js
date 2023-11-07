import { API } from "../base";

const schemaApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllSchema: build.query({
      query: () => 'data-schema',
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllSchemaQuery} = schemaApi