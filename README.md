# response-giver

Response-giver is a typescript/javascript library that allows to get pre-configured response messages given an error string

## Getting Started

After you installed _response-giver_ using `npm`, you should expect to find a _response-giver_ forder into `node_modules` directory.

An example on how to use _response-giver_ in Typescript:

```
import * as responseGiver from "response-giver";

const dictionary : Object = {
    "An error message" : "A possible response"
}

responseGiver.setDictionary(dictionary);

const response : String = responseGiver.getMessage("An error message");

// Output: A possible response
console.log(response);
```

An example on how to use _response-giver_ in Javascript:

```
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var responseGiver = require("response-giver");

var dictionary = {
    "An error message": "A possible response"
};

responseGiver.setDictionary(dictionary);

var response = responseGiver.getMessage("An error message");

// Output: A possible response
console.log(response);
```

For further functionalities, please read the API.

## API

### setDictionary(_dictionary: object): void

This function allows to set a valid dictionary. The dictionary has to be a JSON where the _value_ can belong to any type. For example:

```
const dictionary = {
    "Error 1" : "Response 1",
    "Error 2" : ["A", "B", "C"]
};
```

### getMessage(error: string): any

This function returns a response based on the dictionary.

### setLoggerLevel(level: string): void

This function allows to set the logger level. It can be: "none", "error", "warn", "info", "verbose", "debug" and "silly".

"error" is the default value.

### on(event: string, handler: any): void

If you want to handle good or bad events of _response-giver_, you can use the _on_ function to subscribe.

### removeListener(event: string, handler: any): void

The counterparty of _on_ function.

## Running the tests

To run all unit tests, just type:

```
npm test
```

If you see green, everything is working as expected. If you see red, it means that there is some problem. If you are not trying to make changes to _response-giver_, the library could be corrupted. In this case, installing it again is strongly advised. However, if it keeps not working, please [open an issue](https://github.com/Giovarco/response-giver/issues) or propose a bugfix.


## Versioning

[SemVer](http://semver.org/) is used for versioning.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.