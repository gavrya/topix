"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProp = exports.ofType = exports.ofClass = exports.getActionClass = void 0;
const getActionClass = (action) => {
    return action.type.split('/')[1];
};
exports.getActionClass = getActionClass;
const ofClass = (action, ...actionClasses) => {
    const actionClass = getActionClass(action);
    return actionClasses.includes(actionClass);
};
exports.ofClass = ofClass;
const ofType = (action, ...actionTypes) => {
    return actionTypes.includes(action.type);
};
exports.ofType = ofType;
const hasOwnProp = (object, prop) => {
    return Object.prototype.hasOwnProperty.call(object, prop);
};
exports.hasOwnProp = hasOwnProp;
