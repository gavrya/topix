import type { Action, State, TopixProps } from './types';
declare class Topix<A extends Action = Action, S extends State = State> {
    private isStarted;
    private isDestroyed;
    private hookService;
    private moduleService;
    constructor({ modules, hooks }: TopixProps);
    start(): void;
    destroy(): void;
    getState(): S;
    emitAction(action: A): void;
}
export { Topix };
