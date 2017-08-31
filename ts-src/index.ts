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
logger.level = 'debug';


// Internal state
let dictionary : object = {}

// Public functions
export function setDictionary(_dictionary : object) : void {
    if(!isEmpty(_dictionary) && hasCorrectFormat(_dictionary)) {
      dictionary = _dictionary;
      logger.debug("OK");
    } else {
      eventEmitter.emit("error", new Error("The input dictionary cannot be an empty JSON"));
      logger.debug("ERROR");
    }
}

export function getMessage() {
  
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

const input = {
  "Unable to connect to database" : {
    "statusCode" : 500,
    "message" : "Internal Server Error"
  }
}

setDictionary(input);