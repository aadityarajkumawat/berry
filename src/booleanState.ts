export class BooleanState {
    private boolState: boolean = false;

    constructor(boolState: boolean) {
        this.boolState = boolState;
    }

    getBoolState(): boolean {
        return this.boolState;
    }

    setTrue(): void {
        this.boolState = true;
    }

    setFalse(): void {
        this.boolState = false;
    }
}
