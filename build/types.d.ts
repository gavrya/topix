interface AnyObject {
    [props: string]: any;
}
type State = Record<any, any>;
interface Action<T extends string = any, P = any> {
    type: T;
    payload: P;
}
interface ActionTypes {
    [key: string]: string;
}
interface ActionCreator<A, P> {
    (payload: P): A;
}
interface ActionCreators<A = any, P = any> {
    [key: string]: ActionCreator<A, P>;
}
type ObjectValuesUnion<T extends AnyObject> = T[keyof T];
type ActionsFromActionCreators<T extends ActionCreators> = {
    [K in keyof T]: ReturnType<T[K]>;
};
interface Emit<A extends Action = Action> {
    (action: A): void;
}
interface TopicHandlerProps<A extends Action = Action, S extends State = State> {
    action: A;
    state: S;
    emit: Emit<A>;
}
interface TopicHandler<A extends Action = Action, S extends State = State> {
    (props: TopicHandlerProps<A, S>): void | Promise<void>;
}
interface Topic<A extends Action = Action, S extends State = State> {
    id: string;
    inputActionTypes: string[];
    outputActionTypes: string[];
    handler: TopicHandler<A, S>;
}
interface Module<N extends string = string, A extends Action = Action, S extends State = State, AT extends ActionTypes = ActionTypes, AC extends ActionCreators<A> = ActionCreators<A>> {
    namespace: N;
    initialState: S[N];
    topics: Topic<A, S>[];
    actionTypes: AT;
    actionCreators: AC;
}
interface Hook {
    init: () => void;
    destroy: () => void;
    onModulesRegistered: (modules: Module[]) => void;
    onActionEmitted: (action: Action, state: State) => void;
}
interface TopixProps {
    modules: Module[];
    hooks?: Hook[];
}
export type { AnyObject, State, Action, ActionTypes, ActionCreator, ActionCreators, Emit, TopicHandlerProps, TopicHandler, Topic, ObjectValuesUnion, ActionsFromActionCreators, Module, Hook, TopixProps, };
