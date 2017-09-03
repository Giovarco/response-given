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
      responseGiver = require("../index");
      responseGiver.setLoggerLevel("none");
    });

    // 1
    it('should throw when the dictionary is not set', (done) => {
      
      const handler : IListener = async function(e){
        await console.log("CCCCCCCCCCCCCCCCC")
        await responseGiver.removeListener("error", handler);
        await done();
      };

      responseGiver.on('error', handler);
    
      responseGiver.getMessage("A");

    });

    // 2
    it('should throw when the dictionary is set, but there is not the key we are looking for', (done) => {
      
      const handler : IListener = async function(e){
        await responseGiver.removeListener("error", handler);
        await done();
      };

      responseGiver.on('error', handler);
    
      responseGiver.setDictionary( { "A" : "B" } )
      responseGiver.getMessage("C");

    });

  });
});