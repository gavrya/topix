import type { Module, Action, AnyAction, State } from './types';
declare class Topix<A extends Action = AnyAction, S extends State = State> {
    private readonly state;
    private readonly emitter;
    private readonly emit;
    constructor();
    registerModules(modules: Module[]): void;
    getState(): S;
    emitAction(action: A): void;
}
export { Topix };
