import { HookService } from './HookService';
import { ModuleService } from './ModuleService';
import type { Action, State, TopixProps } from './types';

class Topix<A extends Action = Action, S extends State = State> {
  private isStarted: boolean = false;
  private isDestroyed: boolean = false;
  private hookService: HookService;
  private moduleService: ModuleService;

  constructor({ modules, hooks = [] }: TopixProps) {
    this.hookService = new HookService(hooks);
    this.moduleService = new ModuleService<Action, State>(modules);
  }

  start(): void {
    if (this.isStarted) {
      throw Error('Topix application already started');
    }

    if (this.isDestroyed) {
      throw Error('Unable to start destroyed Topix application');
    }

    this.hookService.init();
    this.moduleService.init();
    this.moduleService.on('*', (eventName, payload) => {
      this.hookService.emit(eventName, payload);
    });
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
