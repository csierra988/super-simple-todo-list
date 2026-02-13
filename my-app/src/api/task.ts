import { api } from "./api";

export type Task = {
    taskId: number;
    task: string;
    completed: boolean;
};


export type TaskRequest = {
    task?: string;
    completed?: boolean;
};

export async function addTask(body: TaskRequest) {
    const res = await api.post<Task>("/api/task/add", body);
    return res.data;
}

export async function getAllTasks() {
    const res = await api.get<Task[]>("/api/task/all");
    return res.data;
}

export async function updateTask(taskId: number, body: TaskRequest) {
    const res = await api.put<Task>(`/api/task/${taskId}`, body);
    return res.data;
}

export async function deleteTask(taskId: number) {
    await api.delete<Task>(`/api/task/${taskId}`);
}
