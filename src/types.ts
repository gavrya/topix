interface AnyObject {
  [props: string]: any;
}

type State = Record<string, any>;

type Action<T extends string = any, P = any> = {
  type: T;
  payload: P;
};

interface AnyAction extends Action {
  [extraProps: string]: any;
}

interface ActionTypes {
  [key: string]: string;
}

interface ActionCreator<A, P> {
  (payload: P): A;
}

interface ActionCreators<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>;
}

type ObjectValuesUnion<T extends AnyObject> = T[keyof T];

type ActionsFromActionCreators<T extends ActionCreators> = {
  [K in keyof T]: ReturnType<T[K]>;
};

interface Emit<A extends Action = AnyAction> {
  (action: A, ...extraArgs: any[]): void;
}

interface TopicHandlerProps<
  A extends Action = AnyAction,
  S extends State = any,
> {
  action: A;
  state: S;
  emit: Emit<A>;
}

interface TopicHandler<A extends Action = AnyAction, S extends State = any> {
  (props: TopicHandlerProps<A, S>): void | Promise<void>;
}

interface Topic<A extends Action = AnyAction, S extends State = any> {
  id: string;
  inputActionTypes: string[];
  outputActionTypes: string[];
  handler: TopicHandler<A, S>;
}

interface Module<
  N extends string = string,
  A extends Action = AnyAction,
  S extends State = any,
  AT extends ActionTypes = ActionTypes,
  AC extends ActionCreators<A> = ActionCreators<A>,
> {
  namespace: N;
  initialState: S[N];
  topics: Topic<A, S>[];
  actionTypes: AT;
  actionCreators: AC;
}

export type {
  AnyObject,
  State,
  Action,
  AnyAction,
  ActionTypes,
  ActionCreator,
  ActionCreators,
  Emit,
  TopicHandlerProps,
  TopicHandler,
  Topic,
  ObjectValuesUnion,
  ActionsFromActionCreators,
  Module,
};
