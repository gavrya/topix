"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topix = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const utils_1 = require("./utils");
class Topix {
    constructor({ modules, hooks = [] }) {
        this.isStarted = false;
        this.isDestroyed = false;
        this.hooks = [];
        this.modules = [];
        this.state = {};
        this.hooks.push(...hooks);
        this.modules.push(...modules);
        this.emitter = new eventemitter3_1.default();
        this.emit = (action) => {
            this.emitter.emit(action.type, action);
            this.notifyOnActionEmitted(action, this.state);
        };
    }
    start() {
        if (this.isStarted) {
            throw Error('Application already started');
        }
        if (this.isDestroyed) {
            throw Error('Unable to start destroyed application');
        }
        this.registerHooks();
        this.registerModules();
        this.isStarted = true;
    }
    destroy() {
        if (this.isDestroyed) {
            throw Error('Unable to destroy already destroyed application');
        }
        this.unregisterHooks();
        this.unregisterModules();
        this.isDestroyed = true;
    }
    getState() {
        return this.state;
    }
    emitAction(action) {
        this.emit(action);
    }
    registerHooks() {
        for (const hook of this.hooks) {
            hook.init();
        }
    }
    unregisterHooks() {
        for (const hook of this.hooks) {
            hook.destroy();
        }
        this.hooks = [];
    }
    registerModules() {
        const state = this.state;
        const emit = (action) => {
            this.emit(action);
        };
        const registerTopic = (topic) => {
            const { inputActionTypes } = topic;
            for (const actionType of inputActionTypes) {
                this.emitter.on(actionType, (action) => {
                    topic.handler({ action, state, emit });
                });
            }
        };
        const registerModule = (module) => {
            const { namespace, initialState, topics } = module;
            if ((0, utils_1.hasOwnProp)(state, namespace)) {
                throw Error(`Module with namespace "${namespace}" is already exists`);
            }
            // @ts-ignore
            state[namespace] = initialState;
            for (const topic of topics) {
                registerTopic(topic);
            }
        };
        for (const module of this.modules) {
            registerModule(module);
        }
        this.notifyOnModulesRegistered(this.modules);
    }
    unregisterModules() {
        this.emitter.removeAllListeners();
        this.modules = [];
        this.state = {};
    }
    notifyOnModulesRegistered(modules) {
        for (const hook of this.hooks) {
            hook.onModulesRegistered(modules);
        }
    }
    notifyOnActionEmitted(action, state) {
        for (const hook of this.hooks) {
            hook.onActionEmitted(action, state);
        }
    }
}
exports.Topix = Topix;
