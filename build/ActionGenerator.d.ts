import type { AnyObject, Action, ActionCreator } from './types';
declare class ActionGenerator<N extends string, S extends AnyObject> {
    readonly namespace: N;
    constructor(namespace: N);
    createEventAction<K extends keyof S & string, T extends `${N}/event/${K}`, P = S[K]>(key: K): [T, ActionCreator<Action<T, P>, P>];
    createCommandAction<K extends keyof S & string, T extends `${N}/command/${K}`, P = S[K]>(key: K): [T, ActionCreator<Action<T, P>, P>];
    private createAction;
}
export { ActionGenerator };
