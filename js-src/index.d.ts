import { IListener } from "typescript.events";
export declare function setDictionary(_dictionary: object): void;
export declare function getMessage(error: string): any;
export declare function setLoggerLevel(level: string): void;
export declare function on(event: string, handler: IListener): void;
export declare function removeListener(event: string, handler: IListener): void;
