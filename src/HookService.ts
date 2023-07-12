import EventEmitter from 'eventemitter3';
import type { Module, Action, State, Hook } from './types';

enum HookEvents {
  ActionEmitted = 'actionEmitted',
  ModulesRegistered = 'modulesRegistered',
}

class HookService extends EventEmitter {
  private hooks: Hook[] = [];

  constructor(hooks: Hook[]) {
    super();
    this.hooks.push(...hooks);
  }

  init(): void {
    for (const hook of this.hooks) {
      hook.init();
    }

    this.on(
      HookEvents.ActionEmitted,
      ({ action, state }: { action: Action; state: State }) => {
        this.notifyHooks((hook: Hook) => hook.onActionEmitted(action, state));
      },
    );

    this.on(
      HookEvents.ModulesRegistered,
      ({ modules }: { modules: Module[] }) => {
        this.notifyHooks((hook: Hook) => hook.onModulesRegistered(modules));
      },
    );
  }

  destroy(): void {
    this.removeAllListeners();

    for (const hook of this.hooks) {
      hook.destroy();
    }

    this.hooks = [];
  }

  private notifyHooks(notifier: (hook: Hook) => void): void {
    for (const hook of this.hooks) {
      notifier(hook);
    }
  }
}

export { HookService, HookEvents };
