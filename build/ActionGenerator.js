"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionGenerator = void 0;
class ActionGenerator {
    constructor(namespace) {
        this.namespace = namespace;
    }
    createEventAction(key) {
        const actionType = `${this.namespace}/event/${key}`;
        const actionCreator = (payload) => ({
            type: actionType,
            payload,
        });
        return [actionType, actionCreator];
    }
}
exports.ActionGenerator = ActionGenerator;
