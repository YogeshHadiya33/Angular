export interface TodoList {
    id: number | undefined;
    title: string;
    description: string;
    isCompleted: boolean;
}

export interface CreateTodo {
    title: string;
    description: string;
}

export interface UpdateTodo {
    title: string;
    description: string;
    isCompleted: boolean | undefined
}