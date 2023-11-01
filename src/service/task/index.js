import { API } from "../base";

const taskApi = API.injectEndpoints({
  endpoints: (build) => ({
    getAllTasks: build.query({
      query: () => 'task',
    }),
    getTaskById: build.query({
      query: (id) => `task/${id}`
    })
  }),
  overrideExisting: true,
});

export const {useGetAllTasksQuery,useGetTaskByIdQuery} = taskApi