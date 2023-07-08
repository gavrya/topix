import type { Action, AnyObject } from './types';

const getActionCategory = (action: Action): string => {
  return action.type.split('/')[1];
};

const ofCategory = (action: Action, ...actionCategories: string[]): boolean => {
  const actionCategory = getActionCategory(action);

  return actionCategories.includes(actionCategory);
};

const ofType = (action: Action, ...actionTypes: string[]): boolean => {
  return actionTypes.includes(action.type);
};

const hasOwnProp = (object: AnyObject, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

export { getActionCategory, ofCategory, ofType, hasOwnProp };
