import { HookService, HookEvents } from './HookService';
import { ModuleService } from './ModuleService';
import type { Action, State, TopixProps, Module } from './types';

class Topix<A extends Action = Action, S extends State = State> {
  private isStarted: boolean = false;
  private isDestroyed: boolean = false;
  private moduleService: ModuleService;
  private hookService: HookService;

  constructor({ modules, hooks = [] }: TopixProps) {
    this.moduleService = new ModuleService<Action, State>(
      modules,
      hooks.length > 0,
    );
    this.hookService = new HookService(hooks);
  }

  start(): void {
    if (this.isStarted) {
      throw Error('Topix application already started');
    }

    if (this.isDestroyed) {
      throw Error('Unable to start destroyed Topix application');
    }

    this.moduleService.on(
      HookEvents.ModulesRegistered,
      (event: { modules: Module[] }) => {
        this.hookService.emit(HookEvents.ModulesRegistered, event);
      },
    );
    this.moduleService.on(
      HookEvents.ActionEmitted,
      (event: { action: Action; state: State }) => {
        this.hookService.emit(HookEvents.ActionEmitted, event);
      },
    );

    this.hookService.init();
    this.moduleService.init();
    this.isStarted = true;
  }

  destroy(): void {
    if (this.isDestroyed) {
      throw Error('Unable to destroy already destroyed Topix application');
    }

    this.hookService.destroy();
    this.moduleService.destroy();
    this.isDestroyed = true;
  }

  getState(): S {
    return this.moduleService.getState();
  }

  emitAction(action: A): void {
    this.moduleService.emitAction(action);
  }
}

export { Topix };
