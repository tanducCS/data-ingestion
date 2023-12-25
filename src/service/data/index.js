import { uploadAPI } from "../base";

const dataApi = uploadAPI.injectEndpoints({
  endpoints: (build) => ({
    uploadData: build.mutation({
      query(body){
        console.log(body);
        return {
          url: 'data-ingestion/sql',
          method: 'POST',
          body
        }
      },
      invalidatesTags: [{ type: 'DataSchema', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const {useUploadDataMutation} = dataApi