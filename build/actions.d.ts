import { ObjectValuesUnion, ActionsFromActionCreators } from './types';
declare const actionTypes: {
    START_COMMAND: "@topix/command/START";
    STOP_COMMAND: "@topix/command/STOP";
};
declare const actionCreators: {
    startCommand: import("./types").ActionCreator<import("./types").Action<"@topix/command/START", void>, void>;
    stopCommand: import("./types").ActionCreator<import("./types").Action<"@topix/command/STOP", void>, void>;
};
export { actionTypes, actionCreators };
type ActionCreators = typeof actionCreators;
type Actions = ActionsFromActionCreators<ActionCreators>;
type TopixAction = ObjectValuesUnion<Actions>;
export type { TopixAction };
