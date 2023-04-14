"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topix = void 0;
const events_1 = __importDefault(require("events"));
class Topix {
    constructor({ modules }) {
        this.emitter = new events_1.default();
        const emit = (this.emit = (action) => {
            console.log('Emitting an action:', action);
            this.emitter.emit(action.type, action);
        });
        const state = (this.state = {});
        const registerTopic = (topic) => {
            const { id, inputActionTypes } = topic;
            console.log(`Registering topic with id "${id}"`);
            inputActionTypes.forEach((actionType) => {
                this.emitter.addListener(actionType, (action) => topic.handler({ action, state, emit }));
                console.log(`Added action listener for "${actionType}" action type`);
            });
            console.log(`Topic with id "${id}" has been registered`);
        };
        const registerModule = (module) => {
            const { namespace, initialState, topics } = module;
            console.log(`Registering module with namespace "${namespace}"`);
            if (Object.prototype.hasOwnProperty.call(state, namespace)) {
                throw Error(`Module with namespace "${namespace}" is already exists`);
            }
            state[namespace] = initialState;
            topics.forEach(registerTopic);
            console.log(`Module with namespace "${namespace}" has been registered`);
        };
        modules.forEach(registerModule);
    }
    emitAction(action) {
        this.emit(action);
    }
    getState() {
        return this.state;
    }
}
exports.Topix = Topix;
