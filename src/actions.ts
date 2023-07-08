import { ActionGenerator } from './ActionGenerator';
import { ObjectValuesUnion, ActionsFromActionCreators } from './types';

const namespace = '@topix';

type ActionPayload = {
  START: void;
  STOP: void;
};

const generator = new ActionGenerator<typeof namespace, ActionPayload>(
  namespace,
);

const [START_COMMAND, startCommand] = generator.createCommandAction('START');
const [STOP_COMMAND, stopCommand] = generator.createCommandAction('STOP');

const actionTypes = {
  START_COMMAND,
  STOP_COMMAND,
};

const actionCreators = {
  startCommand,
  stopCommand,
};

export { actionTypes, actionCreators };

type ActionCreators = typeof actionCreators;
type Actions = ActionsFromActionCreators<ActionCreators>;
type TopixAction = ObjectValuesUnion<Actions>;

export type { TopixAction };
