import { makeAutoObservable } from 'mobx';

export interface IListDetails {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export type ListStateType = {
    items: IListDetails[];
    error: Error;
}
export type ListActionType = {
    getList: () => Promise<void>;
    setError: (error: Error) => Promise<void>;
}

export interface IListDetails { }
export class Tasks {
    public data: IListDetails[];
    constructor() {
        this.data = [];
        makeAutoObservable(this);
    }
    pop() {
        return this.data.splice(0, 25);
    }
};

export interface ICardData {
    id: string;
    title: string;
}

export class CardData {
    public data: ICardData[];
    public tasks: IListDetails[];
    private index: number;
    constructor() {
        this.index = 0;
        this.data = [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'First List',
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Second List',
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Third List',
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d73',
                title: 'Fourth List',
            }
        ];
        this.tasks = [];
        makeAutoObservable(this);
    }
    setTasks(data: IListDetails[]) {
        this.tasks = data;
    }
    getTasks() {
        return this.tasks.splice(0, 25);
    }
    async loadTasks() {
        console.log("Loading data....");

        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        this.tasks = data;
        console.log("data loaded...");
    }
}