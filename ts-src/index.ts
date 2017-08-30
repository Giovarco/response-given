// Imports and globals
import {Event} from "typescript.events";
let eventEmitter = new Event();

// Internal state
let dictionary : Object = {}

// Public functions
export function setDictionary(_dictionary : Object) : void {
    if(!isEmpty(_dictionary) && hasCorrectFormat(_dictionary)) {
      dictionary = _dictionary;
      console.log("OK");
    } else {
      eventEmitter.emit("error", new Error("The input dictionary cannot be an empty JSON"));
      console.log("ERROR")
    }
}

export function getMessage() {
  
}

// Private functions
function isEmpty(obj : Object) : boolean {

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;

}

function hasCorrectFormat(_dictionary : Object) : boolean {
  return true;
}

const input = {
  "Unable to connect to database" : {
    "statusCode" : 500,
    "message" : "Internal Server Error"
  }
}

setDictionary(input);