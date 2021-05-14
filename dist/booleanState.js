"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanState = void 0;
class BooleanState {
    constructor(boolState) {
        this.boolState = false;
        this.boolState = boolState;
    }
    getBoolState() {
        return this.boolState;
    }
    setTrue() {
        this.boolState = true;
    }
    setFalse() {
        this.boolState = false;
    }
}
exports.BooleanState = BooleanState;
//# sourceMappingURL=booleanState.js.map