"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var responseGiver;
describe('Public functions', function () {
    // Before each test
    beforeEach(function () {
        // Require a fresh version of the module
        delete require.cache[require.resolve('../index')];
        responseGiver = require("../index");
        // Do not log
        responseGiver.setLoggerLevel("none");
    });
    describe("A function that allows to set the internal dictionary", function () {
        // 1
        it('should throw when we try to set an empty dictionary', function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
            // Cause a throw
            responseGiver.setDictionary({});
        });
        // 2
        it('should not throw when we try to set a valid dictionary', function (done) {
            // If an error is thrown, then the test passes
            var errorHandler = function (error) {
                done(error);
            };
            responseGiver.on("error", errorHandler);
            // If a good event is emitted, then the test is passed
            var goodHandler = function () {
                done();
            };
            responseGiver.on("dictionarySet", goodHandler);
            // It should not throw
            responseGiver.setDictionary({ "key": "value" });
        });
    });
    describe('A function that allows to get a message from an error message', function () {
        // 1
        it('should throw when we try to get a message, but the dictionary is not set', function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
            // Cause a throw
            responseGiver.getMessage("inexistantKey");
        });
        // 2
        it('should throw when we try to get a message, the dictionary is set, but there is no correspondence for the error we are looking for', function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
            // Cause a throw
            responseGiver.setDictionary({ "key": "value" });
            responseGiver.getMessage("inexistantKey");
        });
        // 3
        it('should not throw when we try to get a message, the dictionary is set and the error key exists in the dictionary', function (done) {
            // If an error is thrown, then the test passes
            var errorHandler = function (error) {
                done(error);
            };
            responseGiver.on("error", errorHandler);
            // If a good event is emitted, then the test is passed
            var correspondence = false;
            var goodHandler = function () {
                correspondence = true;
            };
            responseGiver.on("correspondenceFound", goodHandler);
            // It should not throw
            responseGiver.setDictionary({ "key": "value" });
            var result = responseGiver.getMessage("key");
            // Check the result
            if (result === "value") {
                if (correspondence) {
                    done();
                }
                else {
                    done(new Error("Expected 'correspondenceFound' event"));
                }
            }
            else {
                done(new Error("Unexpected result from getMessage()"));
            }
        });
    });
    describe("A function that allows to set the internal logger level", function () {
        // 1
        it("should throw when we try to set an invalid level", function (done) {
            // If an error is thrown, then the test passes
            var handler = function (error) {
                done();
            };
            responseGiver.on("error", handler);
            // Cause a throw
            responseGiver.setLoggerLevel("invalidLevel");
        });
        // 2
        it('should not throw when we try to set a valid level', function (done) {
            // If an error is thrown, then the test passes
            var errorHandler = function (error) {
                done(error);
            };
            responseGiver.on("error", errorHandler);
            // If a good event is emitted, then the test is passed
            var goodHandler = function () {
                done();
            };
            responseGiver.on("loggerLevelSet", goodHandler);
            // It should not throw
            responseGiver.setLoggerLevel("none");
        });
    });
});
