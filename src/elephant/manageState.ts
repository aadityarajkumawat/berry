interface StateData<T> {
    previousState: T | null;
    currentState: T | null;
    initialState: T | null;
}

type UpdateFn<T> = (prev: T) => T;
type SetState<T> = T | ((prev: T) => T);

export class State<T> {
    private state: T;
    private stateData: StateData<T> = {
        currentState: null,
        initialState: null,
        previousState: null,
    };

    constructor(state: T) {
        this.state = state;

        this.stateData.initialState = state;
        this.stateData.currentState = state;
        this.stateData.previousState = null;
    }

    getState(): T {
        return this.state;
    }

    setState(newState: SetState<T>): void {
        if (typeof newState === 'function') {
            this.stateData.previousState = this.state;
            const prevState = this.stateData.previousState;
            this.stateData.currentState = (newState as UpdateFn<T>)(prevState);
        } else {
            this.stateData.previousState = this.state;
            this.stateData.currentState = newState;
        }
        this.state = this.stateData.currentState;
    }
}
