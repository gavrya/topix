import EventEmitter from 'eventemitter3';
import type { Hook, HookEmitter } from './types';

enum HookEvents {
  ActionEmitted = 'actionEmitted',
  ModulesRegistered = 'modulesRegistered',
}

class HookService extends EventEmitter<HookEmitter> {
  private hooks: Hook[] = [];

  constructor(hooks: Hook[]) {
    super();
    this.hooks.push(...hooks);
  }

  hasHooks() {
    return this.hooks.length > 0;
  }

  init(): void {
    for (const hook of this.hooks) {
      hook.init();

      this.on(HookEvents.ActionEmitted, ({ action, state }) => {
        hook.onActionEmitted(action, state);
      });

      this.on(HookEvents.ModulesRegistered, ({ modules }) => {
        hook.onModulesRegistered(modules);
      });
    }
  }

  destroy(): void {
    this.removeAllListeners();

    for (const hook of this.hooks) {
      hook.destroy();
    }

    this.hooks = [];
  }
}

export { HookService, HookEvents };
