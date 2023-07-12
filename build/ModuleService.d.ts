import EventEmitter from 'eventemitter3';
import type { Module, Action, State } from './types';
declare class ModuleService<A extends Action = Action, S extends State = State> extends EventEmitter {
    private state;
    private readonly enableHooks;
    private modules;
    private actionEmitter;
    constructor(modules: Module[], enableHooks: boolean);
    getState(): S;
    emitAction(action: A): void;
    init(): void;
    destroy(): void;
    private triggerHook;
}
export { ModuleService };
