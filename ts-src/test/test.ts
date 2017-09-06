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

    /*
    it("is really hacky, but should work", async function() {
      const x = getSomeEventEmitter()
      const potentialFailure = new Promise(function(resolve, reject) {
        x.on("error", reject)
      })
      await x.doWhatever()
      return potentialFailure
    })
    */

    // 1
    it('should throw when the dictionary is not set', async () => {

      const handler : IListener = async function(e){
        await console.log("CCCCC")
        await responseGiver.removeListener("error", handler);
      };

      const potentialFailure = new Promise(async function(resolve, reject) {
        await responseGiver.on('error', async function(e){

          await console.log("CCCCC")
          await responseGiver.removeListener("error", handler);
          resolve();

        });
      })
    
      await responseGiver.getMessage("A");

      return potentialFailure;

    });

    // 2
    /*
    it('should throw when the dictionary is set, but there is not the key we are looking for', async () => {
      
      const handler : IListener = async function(e){
        await console.log("DDDDD")
        await responseGiver.removeListener("error", handler);
      };

      const potentialFailure = new Promise(function(resolve, reject) {
        responseGiver.on('error', handler);
      })

      await responseGiver.setDictionary( { "A" : "B" } )
      await responseGiver.getMessage("C");

      return potentialFailure;
    });
  */

  });
});