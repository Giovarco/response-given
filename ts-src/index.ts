// Imports and globals
import {Event} from "typescript.events";
let eventEmitter = new Event();

import * as winston from 'winston';
const logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({ colorize: true })
  ]
});
logger.level = 'silly';


// Internal state
let dictionary : object = undefined;

// Public functions
export function setDictionary(_dictionary : object) : void {
    if(!isEmpty(_dictionary) && hasCorrectFormat(_dictionary)) {
      dictionary = _dictionary;
      logger.info("Dictionary set correctly");
    } else {
      emitError("The input dictionary cannot be an empty JSON");
    }
}

export function getMessage(error : string) : any {

  // Check if the dictionary is set
  if(isDictionaryDefined()) {

    // Log
    logger.debug("Looking for the value of '"+error+"'");
    
    // Look for a correspondence
    for (let key in dictionary) {
      logger.silly("key = "+key);
      if(key === error) {
        logger.info("The value of '"+key+"' is '"+JSON.stringify(dictionary[key], null, 2)+"'");
        return dictionary[key];
      }
    }
  
    // Emit an error if the key is not found
    emitError("There is no key on the dictionary with the following error: "+error);
    return null;

  } else {
    emitError("The dictionary is not set");    
  }


}

// Private functions
function isEmpty(obj : object) : boolean {

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;

}

function hasCorrectFormat(_dictionary : object) : boolean {
  return true;
}

function emitError(error : string) : void {
  eventEmitter.emit("error", new Error(error));
  logger.error(error);
}

function isDictionaryDefined() : boolean {
  return (dictionary !== undefined)
}

// Main
const input = {
  "Unable to connect to database" : {
    "statusCode" : 500,
    "message" : "Internal Server Error"
  }
}

setDictionary(input);
getMessage("Unable to connect to database");