import EventEmitter from 'eventemitter3';
import type { Hook, HookEmitter } from './types';
declare enum HookEvents {
    ActionEmitted = "actionEmitted",
    ModulesRegistered = "modulesRegistered"
}
declare class HookService extends EventEmitter<HookEmitter> {
    private hooks;
    constructor(hooks: Hook[]);
    hasHooks(): boolean;
    init(): void;
    destroy(): void;
}
export { HookService, HookEvents };
