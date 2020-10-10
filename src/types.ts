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