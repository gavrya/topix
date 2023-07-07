import type { Action, AnyObject } from './types';

const getActionClass = (action: Action): string => {
  return action.type.split('/')[1];
};

const ofClass = (action: Action, ...actionClasses: string[]): boolean => {
  const actionClass = getActionClass(action);

  return actionClasses.includes(actionClass);
};

const ofType = (action: Action, ...actionTypes: string[]): boolean => {
  return actionTypes.includes(action.type);
};

const hasOwnProp = (object: AnyObject, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

export { getActionClass, ofClass, ofType, hasOwnProp };
