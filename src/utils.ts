import type { Action, AnyObject } from './types';

const ofType = (action: Action, ...types: string[]): boolean =>
  types.includes(action.type);

const hasOwnProp = (object: AnyObject, prop: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, prop);

export { ofType, hasOwnProp };
