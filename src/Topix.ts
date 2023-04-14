import EventEmitter from 'events';
import type {
  TopixProps,
  Module,
  Action,
  AnyAction,
  State,
  Topic,
} from './types';

class Topix<A extends Action = AnyAction, S extends State = State> {
  private emitter: EventEmitter;
  private readonly emit: (action: A) => void;
  private readonly state: S;

  constructor({ modules }: TopixProps<A, S>) {
    this.emitter = new EventEmitter();

    const emit = (this.emit = (action: A) => {
      console.log('Emitting an action:', action);
      this.emitter.emit(action.type, action);
    });

    const state = (this.state = <S>{});

    const registerTopic = (topic: Topic<A, S>) => {
      const { id, inputActionTypes } = topic;

      console.log(`Registering topic with id "${id}"`);

      inputActionTypes.forEach((actionType) => {
        this.emitter.addListener(actionType, (action: A) =>
          topic.handler({ action, state, emit }),
        );
        console.log(`Added action listener for "${actionType}" action type`);
      });

      console.log(`Topic with id "${id}" has been registered`);
    };

    const registerModule = (module: Module<A, S>) => {
      const { namespace, initialState, topics } = module;

      console.log(`Registering module with namespace "${namespace}"`);

      if (Object.prototype.hasOwnProperty.call(state, namespace)) {
        throw Error(`Module with namespace "${namespace}" is already exists`);
      }

      state[namespace] = initialState;
      topics.forEach(registerTopic);

      console.log(`Module with namespace "${namespace}" has been registered`);
    };

    modules.forEach(registerModule);
  }

  emitAction(action: A) {
    this.emit(action);
  }

  getState() {
    return this.state;
  }
}

export { Topix };
