declare class ActionGenerator<N extends string, S extends Record<string, any>> {
    readonly namespace: N;
    constructor(namespace: N);
    createEventAction<K extends keyof S & string, T extends `${N}/event/${K}`, P = S[K]>(key: K): [T, (payload: P) => {
        type: T;
        payload: P;
    }];
}
export { ActionGenerator };
