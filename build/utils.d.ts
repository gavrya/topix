import type { Action, AnyObject, ActionSegments } from './types';
declare const getActionSegments: (actionType: string) => ActionSegments;
declare const ofType: (action: Action, ...actionTypes: string[]) => boolean;
declare const hasOwnProp: (object: AnyObject, prop: string) => boolean;
export { getActionSegments, ofType, hasOwnProp };
