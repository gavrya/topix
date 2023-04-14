interface AnyObject {
  [props: string]: any;
}

interface State {
  [props: string]: any;
}

interface Action<T = string> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

interface ActionTypes {
  [key: string]: string;
}

interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A;
}

interface ActionCreators<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>;
}

interface Emit<A extends Action = AnyAction> {
  (action: A, ...extraArgs: any[]): void;
}

interface TopicHandlerProps<A extends Action, S extends State> {
  action: A;
  state: S;
  emit: Emit<A>;
}

interface TopicHandler<A extends Action, S extends State> {
  (props: TopicHandlerProps<A, S>): void | Promise<void>;
}

interface Topic<A extends Action = AnyAction, S extends State = State> {
  id: string;
  inputActionTypes: string[];
  outputActionTypes: string[];
  handler: TopicHandler<A, S>;
}

type ObjectValuesUnion<T extends AnyObject> = T[keyof T];

type ActionsFromActionCreators<T extends ActionCreators> = {
  [K in keyof T]: ReturnType<T[K]>;
};

interface Module<
  A extends Action = AnyAction,
  S extends State = State,
  AT extends ActionTypes = ActionTypes,
  AC extends ActionCreators<A> = ActionCreators<A>,
  N extends string & keyof S = string & keyof S,
> {
  namespace: N;
  initialState: S[N];
  topics: Topic<A, S>[];
  actionTypes: AT;
  actionCreators: AC;
}

type TopixProps<A extends Action, S extends State> = {
  modules: Module<A, S>[];
};

export type {
  AnyObject,
  State,
  Action,
  AnyAction,
  ActionTypes,
  ActionCreators,
  Emit,
  TopicHandlerProps,
  TopicHandler,
  Topic,
  ObjectValuesUnion,
  ActionsFromActionCreators,
  Module,
  TopixProps,
};
