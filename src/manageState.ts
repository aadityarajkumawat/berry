export class State<T> {
    private state: T;

    constructor(state: T) {
        this.state = state;
    }

    getState(): T {
        return this.state;
    }

    setState(newState: T): void {
        this.state = newState;
    }
}
