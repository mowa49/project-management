import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  congintoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}
export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: string;
  startDate: string;
  dueDate: string;
  points: number;
  projectId: number;
  authorUserId: number;
  assignedUserId: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    getProject: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    ////the first one is <Project> is how our schema gonna look and the second one is what we gonna send
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      ////////////// this line will force when createProject is called getProject to be done again, as it make the Project tag invalid and it happenned automatically instead of again writing getProject
      invalidatesTags: ["Projects"],
    }),
    getTask: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      ///////// because we have multiple tasks that are for different ids
      providesTags: (result) =>
        result
          ? //////////// because typing doesnt work unless you do this
            result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as coust }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      ////////////// this line will force when createProject is called getProject to be done again, as it make the  tag invalid and it happenned automatically instead of again writing getProject
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      ////////////// this line will force when createProject is called getProject to be done again, as it make the  tag invalid and it happenned automatically instead of again writing getProject
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

/////////// and these are our function
export const {
  useGetProjectQuery,
  useCreateProjectMutation,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api;
