// Imports and Globals
import * as responseGiver from '../index.js';
import { expect } from 'chai';
import 'mocha';
import * as assert from "assert"

// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER

describe('Public functions', () => {
  describe('getMessage(error : string) : any', () => {

    responseGiver.setLoggerLevel("none");

    it('should throw when the dictionary is not set', (done) => {

      responseGiver.on('error',function(){
        console.log("PRESO!")
        done();
      });
    
      responseGiver.getMessage("A");

    });
  });
});