// Imports and Globals
import { expect } from 'chai';
import 'mocha';
import * as assert from "assert"
let responseGiver;

describe('Public functions', () => {

  // Before each test
  beforeEach(function() {
    
    // Require a fresh version of the module
    delete require.cache[require.resolve('../index')]
    responseGiver = require("../index");

    // Do not log
    responseGiver.setLoggerLevel("none");

  });

  describe("A function that allows to set the internal dictionary", () => {
    
    // 1
    it('should throw when we try to set an empty dictionary', (done) => {
  
      // If an error is thrown, then the test passes
      const handler : any = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setDictionary({});


    });

    // 2
    it('should not throw when we try to set a valid dictionary', (done) => {
      
      // If an error is thrown, then the test passes
      const errorHandler = function(error) {
        done(error);
      }
      responseGiver.on("error", errorHandler)

      // If a good event is emitted, then the test is passed
      const goodHandler = function() {
        done();
      }
      responseGiver.on("dictionarySet", goodHandler)

      // It should not throw
      responseGiver.setDictionary({"key" : "value"});

    });

  });
  
  describe('A function that allows to get a message from an error message', () => {

    // 1
    it('should throw when we try to get a message, but the dictionary is not set', (done) => {

      // If an error is thrown, then the test passes
      const handler : any = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.getMessage("inexistantKey");


    });

    // 2
    it('should throw when we try to get a message, the dictionary is set, but there is no correspondence for the error we are looking for', (done) => {
      
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
    it('should not throw when we try to get a message, the dictionary is set and the error key exists in the dictionary', (done) => {
      
      // If an error is thrown, then the test passes
      const errorHandler = function(error) {
        done(error);
      }
      responseGiver.on("error", errorHandler)

      // If a good event is emitted, then the test is passed
      let correspondence : boolean = false;
      const goodHandler = function() {
        correspondence = true;
      }
      responseGiver.on("correspondenceFound", goodHandler)

      // It should not throw
      responseGiver.setDictionary({"key" : "value"})
      const result : string = responseGiver.getMessage("key");

      // Check the result
      if(result === "value") {

        if(correspondence) {
          done();
        } else {
          done(new Error("Expected 'correspondenceFound' event"))
        }

      } else {
        done(new Error("Unexpected result from getMessage()"));
      }

    });
    
  });

  describe("A function that allows to set the internal logger level", () => {

    // 1
    it("should throw when we try to set an invalid level", (done) => {

      // If an error is thrown, then the test passes
      const handler = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setLoggerLevel("invalidLevel");

    })

    // 2
    it('should not throw when we try to set a valid level', (done) => {
      
      // If an error is thrown, then the test passes
      const errorHandler = function(error) {
        done(error);
      }
      responseGiver.on("error", errorHandler)

      // If a good event is emitted, then the test is passed
      const goodHandler = function() {
        done();
      }
      responseGiver.on("loggerLevelSet", goodHandler)

      // It should not throw
      responseGiver.setLoggerLevel("none");

    });

  });
});