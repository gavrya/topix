import type { Module, Action, State } from './types';
declare class Topix<A extends Action = Action, S extends State = State> {
    private readonly state;
    private readonly emitter;
    private readonly emit;
    constructor();
    registerModules(modules: Module[]): void;
    getState(): S;
    emitAction(action: A): void;
}
export { Topix };
