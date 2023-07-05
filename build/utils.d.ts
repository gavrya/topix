import type { Action, AnyObject } from './types';
declare const ofType: (action: Action, ...types: string[]) => boolean;
declare const hasOwnProp: (object: AnyObject, prop: string) => boolean;
export { ofType, hasOwnProp };
