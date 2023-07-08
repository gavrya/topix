import EventEmitter from 'eventemitter3';
import { hasOwnProp } from './utils';
import type { Module, Action, State, Topic, Emit } from './types';

class Topix<A extends Action = Action, S extends State = State> {
  private readonly state: S;
  private readonly emitter: EventEmitter;
  private readonly emit: Emit;

  constructor() {
    this.state = <S>{};
    this.emitter = new EventEmitter();
    this.emit = (action) => this.emitter.emit(action.type, action);
  }

  registerModules(modules: Module[]): void {
    const state = this.state;

    const emit: Emit = (action) => {
      console.log('Emitting an action:', action);
      this.emit(action);
    };

    const registerTopic = (topic: Topic) => {
      const { id, inputActionTypes } = topic;
      console.log(`Registering topic with id "${id}"`);

      for (const actionType of inputActionTypes) {
        this.emitter.on(actionType, (action: Action) =>
          topic.handler({ action, state, emit }),
        );
        console.log(`Added action listener for "${actionType}" action type`);
      }

      console.log(`Topic with id "${id}" has been registered`);
    };

    const registerModule = (module: Module) => {
      const { namespace, initialState, topics } = module;
      console.log(`Registering module with namespace "${namespace}"`);

      if (hasOwnProp(state, namespace)) {
        throw Error(`Module with namespace "${namespace}" is already exists`);
      }

      // @ts-ignore
      state[namespace] = initialState;

      for (const topic of topics) {
        registerTopic(topic);
      }

      console.log(`Module with namespace "${namespace}" has been registered`);
    };

    for (const module of modules) {
      registerModule(module);
    }
  }

  getState(): S {
    return this.state;
  }

  emitAction(action: A): void {
    this.emit(action);
  }
}

export { Topix };
