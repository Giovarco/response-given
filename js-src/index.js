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
logger.level = 'error';
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
function setLoggerLevel(level) {
    // Check if it is a valid level
    var levels = ["none", "error", "warn", "info", "verbose", "debug", "silly"];
    if (isInArray(level, levels)) {
        logger.level = level;
    }
    else {
        emitError("Invalid level. It has to be one of these values: " + levels + ";");
    }
}
exports.setLoggerLevel = setLoggerLevel;
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
function isInArray(value, array) {
    logger.debug("Checking if '" + value + "' is contained in [" + array + "]");
    return array.indexOf(value) > -1;
}
// Main
var input = {
    "Unable to connect to database": {
        "statusCode": 500,
        "message": "Internal Server Error"
    }
};
setDictionary(input);
setLoggerLevel("silly");
getMessage("Unable to connect to database");
