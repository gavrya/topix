"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topix = void 0;
const HookService_1 = require("./HookService");
const ModuleService_1 = require("./ModuleService");
class Topix {
    constructor({ modules, hooks = [] }) {
        this.isStarted = false;
        this.isDestroyed = false;
        this.moduleService = new ModuleService_1.ModuleService(modules);
        this.hookService = new HookService_1.HookService(hooks);
    }
    getState() {
        return this.moduleService.getState();
    }
    emitAction(action) {
        this.moduleService.emitAction(action);
    }
    start() {
        if (this.isStarted) {
            throw Error('Topix application already started');
        }
        if (this.isDestroyed) {
            throw Error('Unable to start destroyed Topix application');
        }
        if (this.hookService.hasHooks()) {
            this.moduleService.on(HookService_1.HookEvents.ActionEmitted, (event) => {
                this.hookService.emit(HookService_1.HookEvents.ActionEmitted, event);
            });
            this.moduleService.on(HookService_1.HookEvents.ModulesRegistered, (event) => {
                this.hookService.emit(HookService_1.HookEvents.ModulesRegistered, event);
            });
        }
        this.hookService.init();
        this.moduleService.init();
        this.isStarted = true;
    }
    destroy() {
        if (this.isDestroyed) {
            throw Error('Unable to destroy already destroyed Topix application');
        }
        this.hookService.destroy();
        this.moduleService.destroy();
        this.isDestroyed = true;
    }
}
exports.Topix = Topix;
