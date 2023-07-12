import EventEmitter from 'eventemitter3';
import { hasOwnProp } from './utils';
import { HookEvents } from './HookService';
import type { Module, Action, State, Topic, Emit } from './types';

class ModuleService<
  A extends Action = Action,
  S extends State = State,
> extends EventEmitter {
  private state: S;
  private readonly enableHooks: boolean;
  private modules: Module[] = [];
  private actionEmitter: EventEmitter;

  constructor(modules: Module[], enableHooks: boolean) {
    super();
    this.state = {} as S;
    this.enableHooks = enableHooks;
    this.modules.push(...modules);
    this.actionEmitter = new EventEmitter();
  }

  getState(): S {
    return this.state;
  }

  emitAction(action: A): void {
    setTimeout(() => {
      this.actionEmitter.emit(action.type, action);
      this.triggerHook(HookEvents.ActionEmitted, { action, state: this.state });
    }, 0);
  }

  init(): void {
    const state = this.state;
    const emit = this.emitAction.bind(this) as Emit;

    const registerTopic = (topic: Topic) => {
      const { inputActionTypes } = topic;

      for (const actionType of inputActionTypes) {
        this.actionEmitter.on(actionType, (action: Action) => {
          topic.handler({ action, state, emit });
        });
      }
    };

    const registerModule = (module: Module) => {
      const { namespace, initialState, topics } = module;

      if (hasOwnProp(state, namespace)) {
        throw Error(`Module with the namespace "${namespace}" already exists`);
      }

      state[namespace as keyof S] = initialState;

      for (const topic of topics) {
        registerTopic(topic);
      }
    };

    for (const module of this.modules) {
      registerModule(module);
    }

    this.triggerHook(HookEvents.ModulesRegistered, { modules: this.modules });
  }

  destroy(): void {
    this.removeAllListeners();
    this.actionEmitter.removeAllListeners();
    this.modules = [];
    this.state = {} as S;
  }

  private triggerHook(eventName: string, event: any): void {
    if (this.enableHooks) {
      this.emit(eventName, event);
    }
  }
}

export { ModuleService };
