"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var responseGiver;
// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER
describe('Public functions', function () {
    // Before each test
    beforeEach(function () {
        // Require a fresh version of the module
        delete require.cache[require.resolve('../index')];
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
    describe("setDictionary(_dictionary : object) : void", function () {
        // 1
        it('should throw when we try to set an empty dictionary', function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
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
    describe('getMessage(error : string) : any', function () {
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
        it('should throw when the dictionary is set, but there is not the key we are looking for', function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
            // Cause a throw
            responseGiver.setDictionary({ "key": "value" });
            responseGiver.getMessage("inexistantKey");
        });
        // 3
        it('should work when the dictionary is set and we are looking for an existing key', function (done) {
            // If an error is thrown, then the test passes
            var errorHandler = function (error) {
                done(error);
            };
            responseGiver.on("error", errorHandler);
            // If a good event is emitted, then the test is passed
            var dictionarySet = false;
            var goodHandler = function () {
                console.log("dictionarySet = true;");
                dictionarySet = true;
            };
            responseGiver.on("dictionarySet", goodHandler);
            // Cause a throw
            responseGiver.setDictionary({ "key": "value" });
            console.log(1);
            var result = responseGiver.getMessage("key");
            console.log(2);
            // Check the result
            if (result === "value") {
                if (dictionarySet) {
                    done();
                }
                else {
                    done(new Error("Expected to emit event 'dictionarySet'"));
                }
            }
            else {
                done(new Error("Unexpected result from getMessage()"));
            }
        });
    });
});
