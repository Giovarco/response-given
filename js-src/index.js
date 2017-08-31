"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and globals
var typescript_events_1 = require("typescript.events");
var eventEmitter = new typescript_events_1.Event();
var winston = require("winston");
var logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({ colorize: true })
    ]
});
logger.level = 'silly';
// Internal state
var dictionary = undefined;
// Public functions
function setDictionary(_dictionary) {
    if (!isEmpty(_dictionary) && hasCorrectFormat(_dictionary)) {
        dictionary = _dictionary;
        logger.info("Dictionary set correctly");
    }
    else {
        emitError("The input dictionary cannot be an empty JSON");
    }
}
exports.setDictionary = setDictionary;
function getMessage(error) {
    // Check if the dictionary is set
    if (isDictionaryDefined()) {
        // Log
        logger.debug("Looking for the value of '" + error + "'");
        // Look for a correspondence
        for (var key in dictionary) {
            logger.silly("key = " + key);
            if (key === error) {
                logger.info("The value of '" + key + "' is '" + JSON.stringify(dictionary[key], null, 2) + "'");
                return dictionary[key];
            }
        }
        // Emit an error if the key is not found
        emitError("There is no key on the dictionary with the following error: " + error);
        return null;
    }
    else {
        emitError("The dictionary is not set");
    }
}
exports.getMessage = getMessage;
// Private functions
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function hasCorrectFormat(_dictionary) {
    return true;
}
function emitError(error) {
    eventEmitter.emit("error", new Error(error));
    logger.error(error);
}
function isDictionaryDefined() {
    return (dictionary !== undefined);
}
// Main
var input = {
    "Unable to connect to database": {
        "statusCode": 500,
        "message": "Internal Server Error"
    }
};
setDictionary(input);
getMessage("Unable to connect to database");
