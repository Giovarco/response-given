"use strict";
/*
INPUT: JSON = CONFIGURATION TO OBTAIN MESSAGE RESPONSE
OUTPUT: EMIT EVENTS
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
/// <reference path='../node_modules/node-json-equal/index.d.ts' />
var nodeJsonEqual = require("node-json-equal");
// Configuration
var messages = {};
// Public functions
function setMessages(_messages) {
    console.log(isEmpty(_messages));
}
exports.setMessages = setMessages;
// Private functions
function isEmpty(_messages) {
    var options = { arrayOrder: false };
    console.log(nodeJsonEqual.equal(_messages, {}, options));
    return nodeJsonEqual.equal(_messages, {}, options);
}
setMessages({});
