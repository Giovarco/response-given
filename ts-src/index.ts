/*
INPUT: JSON = CONFIGURATION TO OBTAIN MESSAGE RESPONSE
OUTPUT: EMIT EVENTS
*/

// Imports
/// <reference path='../node_modules/node-json-equal/index.d.ts' />
import nodeJsonEqual = require("node-json-equal");

// Configuration
let messages : Object = {}

// Public functions
export function setMessages(_messages : Object) : void {
    console.log(isEmpty(_messages))
}

// Private functions
function isEmpty(_messages : Object) : boolean {
    const options : Object = {arrayOrder : false};
    console.log(nodeJsonEqual.equal(_messages, {}, options));
    return nodeJsonEqual.equal(_messages, {}, options);
}

setMessages({});