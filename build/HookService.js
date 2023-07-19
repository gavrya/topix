"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookEvents = exports.HookService = void 0;
const eventemitter3_1 = __importDefault(require("eventemitter3"));
var HookEvents;
(function (HookEvents) {
    HookEvents["ActionEmitted"] = "actionEmitted";
    HookEvents["ModulesRegistered"] = "modulesRegistered";
})(HookEvents || (HookEvents = {}));
exports.HookEvents = HookEvents;
class HookService extends eventemitter3_1.default {
    constructor(hooks) {
        super();
        this.hooks = [];
        this.hooks.push(...hooks);
    }
    hasHooks() {
        return this.hooks.length > 0;
    }
    init() {
        for (const hook of this.hooks) {
            hook.init();
            this.on(HookEvents.ActionEmitted, ({ action, state }) => {
                hook.onActionEmitted(action, state);
            });
            this.on(HookEvents.ModulesRegistered, ({ modules }) => {
                hook.onModulesRegistered(modules);
            });
        }
    }
    destroy() {
        this.removeAllListeners();
        for (const hook of this.hooks) {
            hook.destroy();
        }
        this.hooks = [];
    }
}
exports.HookService = HookService;
