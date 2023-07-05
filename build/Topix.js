"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topix = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const utils_1 = require("./utils");
class Topix {
    constructor() {
        this.state = {};
        this.emitter = new eventemitter3_1.default();
        this.emit = (action) => this.emitter.emit(action.type, action);
    }
    registerModules(modules) {
        const state = this.state;
        const emit = (action) => {
            console.log('Emitting an action:', action);
            this.emit(action);
        };
        const registerTopic = (topic) => {
            const { id, inputActionTypes } = topic;
            console.log(`Registering topic with id "${id}"`);
            for (const actionType of inputActionTypes) {
                this.emitter.on(actionType, (action) => topic.handler({ action, state, emit }));
                console.log(`Added action listener for "${actionType}" action type`);
            }
            console.log(`Topic with id "${id}" has been registered`);
        };
        const registerModule = (module) => {
            const { namespace, initialState, topics } = module;
            console.log(`Registering module with namespace "${namespace}"`);
            if ((0, utils_1.hasOwnProp)(state, namespace)) {
                throw Error(`Module with namespace "${namespace}" is already exists`);
            }
            // @ts-ignore
            state[namespace] = initialState;
            for (const topic of topics) {
                registerTopic(topic);
            }
            console.log(`Module with namespace "${namespace}" has been registered`);
        };
        for (const module of modules) {
            registerModule(module);
        }
    }
    getState() {
        return this.state;
    }
    emitAction(action) {
        this.emit(action);
    }
}
exports.Topix = Topix;
