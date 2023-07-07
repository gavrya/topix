import type { Action, AnyObject } from './types';
declare const getActionClass: (action: Action) => string;
declare const ofClass: (action: Action, ...actionClasses: string[]) => boolean;
declare const ofType: (action: Action, ...actionTypes: string[]) => boolean;
declare const hasOwnProp: (object: AnyObject, prop: string) => boolean;
export { getActionClass, ofClass, ofType, hasOwnProp };
