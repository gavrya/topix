import type { Action, AnyObject, ActionSegments } from './types';

const getActionSegments = (actionType: string): ActionSegments => {
  const [moduleNamespace, actionCategory, actionName] = actionType.split('/');

  return { moduleNamespace, actionCategory, actionName };
};

const ofType = (action: Action, ...actionTypes: string[]): boolean => {
  return actionTypes.includes(action.type);
};

const hasOwnProp = (object: AnyObject, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

export { getActionSegments, ofType, hasOwnProp };
