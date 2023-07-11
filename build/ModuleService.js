"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const utils_1 = require("./utils");
const HookService_1 = require("./HookService");
class ModuleService extends eventemitter3_1.default {
    constructor(modules) {
        super();
        this.modules = [];
        this.state = {};
        this.modules.push(...modules);
        this.actionEmitter = new eventemitter3_1.default();
    }
    getState() {
        return this.state;
    }
    emitAction(action) {
        setTimeout(() => {
            this.actionEmitter.emit(action.type, action);
            this.emit(HookService_1.HookEvents.ActionEmitted, { action, state: this.state });
        }, 0);
    }
    init() {
        const state = this.state;
        const emit = this.emitAction.bind(this);
        const registerTopic = (topic) => {
            const { inputActionTypes } = topic;
            for (const actionType of inputActionTypes) {
                this.actionEmitter.on(actionType, (action) => {
                    topic.handler({ action, state, emit });
                });
            }
        };
        const registerModule = (module) => {
            const { namespace, initialState, topics } = module;
            if ((0, utils_1.hasOwnProp)(state, namespace)) {
                throw Error(`Module with the namespace "${namespace}" already exists`);
            }
            state[namespace] = initialState;
            for (const topic of topics) {
                registerTopic(topic);
            }
        };
        for (const module of this.modules) {
            registerModule(module);
        }
        this.emit(HookService_1.HookEvents.ModulesRegistered, { modules: this.modules });
    }
    destroy() {
        this.removeAllListeners();
        this.actionEmitter.removeAllListeners();
        this.modules = [];
        this.state = {};
    }
}
exports.ModuleService = ModuleService;
