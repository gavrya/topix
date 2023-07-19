import EventEmitter from 'eventemitter3';
import type { Module, Action, State, HookEmitter } from './types';
declare class ModuleService<A extends Action = Action, S extends State = State> extends EventEmitter<HookEmitter> {
    private state;
    private modules;
    private actionEmitter;
    constructor(modules: Module[]);
    getState(): S;
    emitAction(action: A): void;
    init(): void;
    destroy(): void;
}
export { ModuleService };
