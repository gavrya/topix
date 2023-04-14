import type { TopixProps, Action, AnyAction, State } from './types';
declare class Topix<A extends Action = AnyAction, S extends State = State> {
    private emitter;
    private readonly emit;
    private readonly state;
    constructor({ modules }: TopixProps<A, S>);
    emitAction(action: A): void;
    getState(): S;
}
export { Topix };
