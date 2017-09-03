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

    // Do not log
    responseGiver.setLoggerLevel("none");

    // 1
    it('should throw when the dictionary is not set', (done) => {

      responseGiver.on('error',function(){
        done();
      });
    
      responseGiver.getMessage("A");

    });

    // 2
    it('should throw when the dictionary is set, but there is not the key we are looking for', (done) => {
      
      /*responseGiver.on('error',function(){
        done();
      });
    
      responseGiver.getMessage("A");*/

    });

  });
});