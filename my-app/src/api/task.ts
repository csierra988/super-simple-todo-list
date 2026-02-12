import { api } from "./api";

export type Task = {
    taskId: number;
    task: string;
    completed: boolean;
};


type AddTaskRequest = {
    task: string;
    completed: boolean;
};

export async function addTask(body: AddTaskRequest) {
    const res = await api.post<Task>("/api/task/add", body);
    return res.data;
}
