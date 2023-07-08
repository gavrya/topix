import type { Action, AnyObject } from './types';
declare const getActionCategory: (action: Action) => string;
declare const ofCategory: (action: Action, ...actionCategories: string[]) => boolean;
declare const ofType: (action: Action, ...actionTypes: string[]) => boolean;
declare const hasOwnProp: (object: AnyObject, prop: string) => boolean;
export { getActionCategory, ofCategory, ofType, hasOwnProp };
