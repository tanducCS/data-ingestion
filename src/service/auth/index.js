import { API } from "../base";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    
    authLogin: build.mutation({
      query(body){
        return {
          url: 'auth/login',
          method: 'POST',
          body
        }
      }
    }),
  }),
  overrideExisting: true,
});

export const {useAuthLoginMutation} = authApi