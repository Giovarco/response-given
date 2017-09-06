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
      console.log("AAAAA");
      responseGiver = require("../index");
      responseGiver.setLoggerLevel("none");
      console.log("BBBBB");
    });

    // 1
    it('should throw when the dictionary is not set', (done) => {

      const handler : IListener = function(error) {
        console.log("CCCCC")
        responseGiver.removeListener(handler);
        done()
      }

      responseGiver.on("error", handler)
      console.log(1);
      responseGiver.getMessage("A");
      console.log(2);

    });

    // 2
    it('should throw when the dictionary is set, but there is not the key we are looking for', (done) => {
      
      const handler = function(error) {
        console.log("DDDDD")
        responseGiver.removeListener(handler);
        done()
      }

      responseGiver.on("error", handler)
      console.log(3);

      responseGiver.setDictionary({"key" : "value"})
      console.log(4);

      responseGiver.getMessage("inexistantKey");
      console.log(5);


    });

  });
});