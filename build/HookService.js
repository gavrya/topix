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
    constructor(hooks = []) {
        super();
        this.hooks = [];
        this.hooks.push(...hooks);
    }
    init() {
        for (const hook of this.hooks) {
            hook.init();
        }
        this.on(HookEvents.ActionEmitted, ({ action, state }) => {
            this.notifyHooks((hook) => hook.onActionEmitted(action, state));
        });
        this.on(HookEvents.ModulesRegistered, ({ modules }) => {
            this.notifyHooks((hook) => hook.onModulesRegistered(modules));
        });
    }
    destroy() {
        for (const hook of this.hooks) {
            hook.destroy();
        }
        this.removeAllListeners();
        this.hooks = [];
    }
    notifyHooks(notifier) {
        for (const hook of this.hooks) {
            notifier(hook);
        }
    }
}
exports.HookService = HookService;
