import { API } from "../base";

const taskApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => 'task',
    }),
  }),
  overrideExisting: true,
});

export const {useGetAllTasksQuery} = taskApi