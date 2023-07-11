"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProp = exports.ofType = exports.getActionSegments = void 0;
const getActionSegments = (actionType) => {
    const [moduleNamespace, actionCategory, actionName] = actionType.split('/');
    return { moduleNamespace, actionCategory, actionName };
};
exports.getActionSegments = getActionSegments;
const ofType = (action, ...actionTypes) => {
    return actionTypes.includes(action.type);
};
exports.ofType = ofType;
const hasOwnProp = (object, prop) => {
    return Object.prototype.hasOwnProperty.call(object, prop);
};
exports.hasOwnProp = hasOwnProp;
