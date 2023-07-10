import EventEmitter from 'eventemitter3';
import { hasOwnProp } from './utils';
import type {
  Module,
  Action,
  State,
  Topic,
  Emit,
  Hook,
  TopixProps,
} from './types';

class Topix<A extends Action = Action, S extends State = State> {
  private isStarted: boolean = false;
  private isDestroyed: boolean = false;
  private state: S;
  private hooks: Hook[] = [];
  private modules: Module[] = [];
  private emitter: EventEmitter;
  private readonly emit: Emit;

  constructor({ modules, hooks = [] }: TopixProps) {
    this.state = <S>{};
    this.hooks.push(...hooks);
    this.modules.push(...modules);
    this.emitter = new EventEmitter();
    this.emit = (action) => {
      this.emitter.emit(action.type, action);
      this.notifyOnActionEmitted(action, this.state);
    };
  }

  start(): void {
    if (this.isStarted) {
      throw Error('Application already started');
    }

    if (this.isDestroyed) {
      throw Error('Unable to start destroyed application');
    }

    this.registerHooks();
    this.registerModules();
    this.isStarted = true;
  }

  destroy(): void {
    if (this.isDestroyed) {
      throw Error('Unable to destroy already destroyed application');
    }

    this.unregisterHooks();
    this.unregisterModules();
    this.isDestroyed = true;
  }

  getState(): S {
    return this.state;
  }

  emitAction(action: A): void {
    this.emit(action);
  }

  private registerHooks() {
    for (const hook of this.hooks) {
      hook.init();
    }
  }

  private unregisterHooks() {
    for (const hook of this.hooks) {
      hook.destroy();
    }

    this.hooks = [];
  }

  private registerModules(): void {
    const state = this.state;

    const emit: Emit = (action) => {
      this.emit(action);
    };

    const registerTopic = (topic: Topic) => {
      const { inputActionTypes } = topic;

      for (const actionType of inputActionTypes) {
        this.emitter.on(actionType, (action: Action) => {
          topic.handler({ action, state, emit });
        });
      }
    };

    const registerModule = (module: Module) => {
      const { namespace, initialState, topics } = module;

      if (hasOwnProp(state, namespace)) {
        throw Error(`Module with namespace "${namespace}" is already exists`);
      }

      // @ts-ignore
      state[namespace] = initialState;

      for (const topic of topics) {
        registerTopic(topic);
      }
    };

    for (const module of this.modules) {
      registerModule(module);
    }

    this.notifyOnModulesRegistered(this.modules);
  }

  private unregisterModules(): void {
    this.emitter.removeAllListeners();
    this.modules = [];
    this.state = <S>{};
  }

  private notifyOnModulesRegistered(modules: Module[]): void {
    for (const hook of this.hooks) {
      hook.onModulesRegistered(modules);
    }
  }

  private notifyOnActionEmitted(action: Action, state: State): void {
    for (const hook of this.hooks) {
      hook.onActionEmitted(action, state);
    }
  }
}

export { Topix };
