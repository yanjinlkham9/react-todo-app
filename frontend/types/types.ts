export interface Todo{
    id: number;
    text: string;
    done: boolean;
}

export interface TodoState{
    list: Todo[];
    nextID?: number;
}


//전체적인 state 
export interface ReduxState{
    todo: TodoState;
    
}