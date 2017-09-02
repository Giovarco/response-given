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
        responseGiver.setLoggerLevel("none");
        it('should throw when the dictionary is not set', function (done) {
            responseGiver.on('error', function () {
                console.log("PRESO!");
                done();
            });
            responseGiver.getMessage("A");
        });
    });
});
