"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionGenerator = void 0;
class ActionGenerator {
    constructor(namespace) {
        this.namespace = namespace;
    }
    createEventAction(key) {
        const type = `${this.namespace}/event/${key}`;
        return this.createAction(type);
    }
    createCommandAction(key) {
        const type = `${this.namespace}/command/${key}`;
        return this.createAction(type);
    }
    createAction(type) {
        const actionCreator = (payload) => ({
            type,
            payload,
        });
        return [type, actionCreator];
    }
}
exports.ActionGenerator = ActionGenerator;
