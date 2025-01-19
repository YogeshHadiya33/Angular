export class TodoList {
    id: number | undefined;
    title: string='';
    description: string='';
    isCompleted: boolean=false 
}

export class CreateTodo {
    title: string='';
    description: string='';
}

export class UpdateTodo {
    title: string='';
    description: string='';
    isCompleted: boolean | undefined 
}