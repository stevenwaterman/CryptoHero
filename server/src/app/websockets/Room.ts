import {v4} from "uuid";

class Listener<T>{
    readonly func: (payload:T) => void;
    readonly id: string = v4();

    constructor(func: (payload:T) => void) {
        this.func = func;
    }
}

export default class Room<T>{
    private readonly listeners: Array<Listener<T>> = [];

    join(callback: (payload:T) => void): string {
        const listener: Listener<T> = new Listener(callback);
        this.listeners.push(listener);
        return listener.id;
    }

    leave(id: string): void{
        const index = this.listeners.findIndex(it => it.id === id);
        if(index == null){
            throw "Listener ID not recognised";
        }
        this.listeners.splice(index, 1);
    }

    fire(payload: T): void{
        this.listeners.forEach(it => it.func(payload))
    }
}