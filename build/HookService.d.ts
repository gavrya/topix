import EventEmitter from 'eventemitter3';
import type { Hook } from './types';
declare enum HookEvents {
    ActionEmitted = "actionEmitted",
    ModulesRegistered = "modulesRegistered"
}
declare class HookService extends EventEmitter {
    private hooks;
    constructor(hooks?: Hook[]);
    init(): void;
    destroy(): void;
    private notifyHooks;
}
export { HookService, HookEvents };
