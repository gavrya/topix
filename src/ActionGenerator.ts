class ActionGenerator<N extends string, S extends Record<string, any>> {
  constructor(readonly namespace: N) {}

  createEventAction<
    K extends keyof S & string,
    T extends `${N}/event/${K}`,
    P = S[K],
  >(key: K): [T, (payload: P) => { type: T; payload: P }] {
    const actionType = `${this.namespace}/event/${key}` as T;

    const actionCreator = (payload: P) => ({
      type: actionType,
      payload,
    });

    return [actionType, actionCreator];
  }
}

export { ActionGenerator };
