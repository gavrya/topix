import type { AnyObject, Action, ActionCreator } from './types';

class ActionGenerator<N extends string, S extends AnyObject> {
  constructor(readonly namespace: N) {}

  createEventAction<
    K extends keyof S & string,
    T extends `${N}/event/${K}`,
    P = S[K],
  >(key: K): [T, ActionCreator<Action<T, P>, P>] {
    const type = `${this.namespace}/event/${key}` as T;

    return this.createAction(type);
  }

  createCommandAction<
    K extends keyof S & string,
    T extends `${N}/command/${K}`,
    P = S[K],
  >(key: K): [T, ActionCreator<Action<T, P>, P>] {
    const type = `${this.namespace}/command/${key}` as T;

    return this.createAction(type);
  }

  private createAction<K extends keyof S & string, T extends string, P = S[K]>(
    type: T,
  ): [T, ActionCreator<Action<T, P>, P>] {
    const actionCreator = (payload: P) => ({
      type,
      payload,
    });

    return [type, actionCreator];
  }
}

export { ActionGenerator };
