"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionCreators = exports.actionTypes = void 0;
const ActionGenerator_1 = require("./ActionGenerator");
const namespace = '@topix';
const generator = new ActionGenerator_1.ActionGenerator(namespace);
const [START_COMMAND, startCommand] = generator.createCommandAction('START');
const [STOP_COMMAND, stopCommand] = generator.createCommandAction('STOP');
const actionTypes = {
    START_COMMAND,
    STOP_COMMAND,
};
exports.actionTypes = actionTypes;
const actionCreators = {
    startCommand,
    stopCommand,
};
exports.actionCreators = actionCreators;
