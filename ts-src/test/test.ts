// Imports and Globals
import {IListener} from "typescript.events";
import { expect } from 'chai';
import 'mocha';
import * as assert from "assert"

// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER

describe('Public functions', () => {

  describe('getMessage(error : string) : any', () => {

    let responseGiver;

    beforeEach(function() {

      // Require a fresh version of the module
      delete require.cache[require.resolve('../index')]
      responseGiver = require("../index");

      // Do not log
      responseGiver.setLoggerLevel("none");

    });

    // 1
    it('should throw when the dictionary is not set', (done) => {

      // If an error is thrown, then the test passes
      const handler : IListener = function(error) {
        done()
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.getMessage("inexistantKey");


    });

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
      const handler = function(error) {
        done(error);
      }
      responseGiver.on("error", handler)

      // Cause a throw
      responseGiver.setDictionary({"key" : "value"})
      const result = responseGiver.getMessage("key");

      // Check the result
      if(result === "value") {
        done();
      } else {
        done(new Error("Unexpected result from getMessage()"));
      }

    });

  });
});