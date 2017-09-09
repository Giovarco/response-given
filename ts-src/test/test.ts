// Imports and Globals
import {IListener} from "typescript.events";
import { expect } from 'chai';
import 'mocha';
import * as assert from "assert"
let responseGiver;

// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER

describe('Public functions', () => {

  // Before each test
  beforeEach(function() {
    
    // Require a fresh version of the module
    delete require.cache[require.resolve('../index')]
    responseGiver = require("../index");

    // Do not log
    responseGiver.setLoggerLevel("none");

  });

    /*
  export function setDictionary(_dictionary : object) : void {

    // Log
    logger.verbose("Trying to set the dictionary");

    // Validate the input
    if(!isEmpty(_dictionary)) {
      dictionary = _dictionary;
      logger.verbose("Dictionary set correctly");
    } else {
      emitError("The input dictionary cannot be an empty JSON");
    }
  }
  */

  describe("setDictionary(_dictionary : object) : void", () => {
    
    // 1
    it('should throw when we try to set an empty dictionary', (done) => {
  
      // If an error is thrown, then the test passes
      const handler : IListener = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setDictionary();


    });

    // 2
    /*it('should throw when we try to set an empty dictionary', (done) => {
      
      // If an error is thrown, then the test passes
      const handler : IListener = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setDictionary();


    });*/

  });
  
  describe('getMessage(error : string) : any', () => {

    // 1
    /*
    it('should throw when the dictionary is not set', (done) => {

      // If an error is thrown, then the test passes
      const handler : IListener = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.getMessage("inexistantKey");


    });
    */

    // 2
    it('should throw when the dictionary is set, but there is not the key we are looking for', (done) => {
      
      // If an error is thrown, then the test passes
      const handler = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setDictionary({"key" : "value"})
      responseGiver.getMessage("inexistantKey");

    });

    // 3
    it('should work when the dictionary is set and we are looking for an existing key', (done) => {
      
      // If an error is thrown, then the test passes
      const errorHandler = function(error) {
        done(error);
      }
      responseGiver.on("error", errorHandler)

      // If a good event is emitted, then the test is passed
      let dictionarySet : boolean = false;
      const goodHandler = function() {
        console.log("dictionarySet = true;")
        dictionarySet = true;
      }
      responseGiver.on("dictionarySet", goodHandler)

      // Cause a throw
      responseGiver.setDictionary({"key" : "value"})
      console.log(1)
      const result : string = responseGiver.getMessage("key");
      console.log(2)
      // Check the result
      if(result === "value") {

        if(dictionarySet) {
          done();
        } else {
          done(new Error("Expected to emit event 'dictionarySet'"))
        }

      } else {
        done(new Error("Unexpected result from getMessage()"));
      }

    });

  });
});