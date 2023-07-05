"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProp = exports.ofType = void 0;
const ofType = (action, ...types) => types.includes(action.type);
exports.ofType = ofType;
const hasOwnProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop);
exports.hasOwnProp = hasOwnProp;
