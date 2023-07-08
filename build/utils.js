"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProp = exports.ofType = exports.ofCategory = exports.getActionCategory = void 0;
const getActionCategory = (action) => {
    return action.type.split('/')[1];
};
exports.getActionCategory = getActionCategory;
const ofCategory = (action, ...actionCategories) => {
    const actionCategory = getActionCategory(action);
    return actionCategories.includes(actionCategory);
};
exports.ofCategory = ofCategory;
const ofType = (action, ...actionTypes) => {
    return actionTypes.includes(action.type);
};
exports.ofType = ofType;
const hasOwnProp = (object, prop) => {
    return Object.prototype.hasOwnProperty.call(object, prop);
};
exports.hasOwnProp = hasOwnProp;
