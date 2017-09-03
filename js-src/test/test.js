"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports and Globals
var responseGiver = require("../index.js");
require("mocha");
// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER
describe('Public functions', function () {
    describe('getMessage(error : string) : any', function () {
        // Do not log
        responseGiver.setLoggerLevel("none");
        // 1
        it('should throw when the dictionary is not set', function (done) {
            responseGiver.on('error', function () {
                done();
            });
            responseGiver.getMessage("A");
        });
        // 2
        it('should throw when the dictionary is set, but there is not the key we are looking for', function (done) {
            /*responseGiver.on('error',function(){
              done();
            });
          
            responseGiver.getMessage("A");*/
        });
    });
});
