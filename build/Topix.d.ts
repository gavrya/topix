import type { Action, State, TopixProps } from './types';
declare class Topix<A extends Action = Action, S extends State = State> {
    private isStarted;
    private isDestroyed;
    private state;
    private hooks;
    private modules;
    private emitter;
    private readonly emit;
    constructor({ modules, hooks }: TopixProps);
    start(): void;
    destroy(): void;
    getState(): S;
    emitAction(action: A): void;
    private registerHooks;
    private unregisterHooks;
    private registerModules;
    private unregisterModules;
    private notifyOnModulesRegistered;
    private notifyOnActionEmitted;
}
export { Topix };
