// Imports and globals
import events = require('events');
const eventEmitter = new events.EventEmitter();

import * as winston from 'winston';
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});
logger.level = 'error';

// Internal state
let dictionary : object = undefined;

// Public functions
export function setDictionary(_dictionary : object) : void {

  // Log
  logger.verbose("Trying to set the dictionary");

  // Validate the input
  if(!isEmpty(_dictionary)) {
    dictionary = _dictionary;
    emitEvent("dictionarySet");
    logger.verbose("Dictionary set correctly");
  } else {
    emitError("The input dictionary cannot be an empty JSON");
  }
}

export function getMessage(error : string) : any {

  // Log
  logger.debug("Looking for the value of '"+error+"'");

  // Check if the dictionary is set
  if(isDictionaryDefined()) {
    
    // Look for a correspondence
    for (let key in dictionary) {
      if(key === error) {
        logger.verbose("The value of '"+key+"' is '"+JSON.stringify(dictionary[key], null, 2)+"'");
        emitEvent("correspondenceFound");
        return dictionary[key];
      }
    }
  
    // Emit an error if the key is not found
    emitError("There is no key on the dictionary with the following name: "+error);
    return null;

  } else {
    emitError("The dictionary cannot be empty");
  }


}

export function setLoggerLevel(level : string) : void {

  // Check if it is a valid level
  const levels : string[] = ["none", "error", "warn", "info", "verbose", "debug", "silly"];
  if(isInArray(level, levels)) {
    logger.level = level;
  } else {
    emitError("Invalid level. It has to be one of these values: "+levels+";");
  }

}

export function on(event : string, handler : any) {
  eventEmitter.on(event, handler);
}

export function removeListener(event : string, handler : any) {
  eventEmitter.removeListener(event, handler);
}

// Private functions
function emitEvent(event : string) : void {
  //console.log("emitEvent -> "+event);
  eventEmitter.emit(event);
}

function isEmpty(obj : object) : boolean {

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;

}

function emitError(errorMessage : string) : void {
  eventEmitter.emit("error", new Error(errorMessage));
  logger.error(errorMessage);
}

function isDictionaryDefined() : boolean {
  return (dictionary !== undefined)
}

function isInArray(value : string, array : string[]) : boolean {
  logger.debug("Checking if '"+value+"' is contained in ["+array+"]");
  return array.indexOf(value) > -1;
}