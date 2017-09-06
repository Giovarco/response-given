"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
// SET MESSAGES
// SET  DICTIONARY
// SET LOGGER
describe('Public functions', function () {
    describe('getMessage(error : string) : any', function () {
        var responseGiver;
        beforeEach(function () {
            console.log("AAAAA");
            responseGiver = require("../index");
            responseGiver.setLoggerLevel("none");
            console.log("BBBBB");
        });
        // 1
        it('should throw when the dictionary is not set', function (done) {
            var handler = function (error) {
                console.log("CCCCC");
                responseGiver.removeListener(handler);
                done();
            };
            responseGiver.on("error", handler);
            console.log(1);
            responseGiver.getMessage("A");
            console.log(2);
        });
        // 2
        it('should throw when the dictionary is set, but there is not the key we are looking for', function (done) {
            var handler = function (error) {
                console.log("DDDDD");
                responseGiver.removeListener(handler);
                done();
            };
            responseGiver.on("error", handler);
            console.log(3);
            responseGiver.setDictionary({ "key": "value" });
            console.log(4);
            responseGiver.getMessage("inexistantKey");
            console.log(5);
        });
    });
});
