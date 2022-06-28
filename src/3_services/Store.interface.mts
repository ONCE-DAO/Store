//TODO Add Event Service
//import  { EventServiceConsumer } from "./EventService.interface.mjs";
// extends EventServiceConsumer
export default interface Store {

    register(key: any, value: any): any

    remove(key: any): void;

    lookup(key: any): any;

    discover(): any;

    clear(): void
}

export enum StoreEvents {
    ON_REGISTER = "ON_REGISTER",
    ON_REMOVE = "ON_REMOVE",
    ON_CLEAR = "ON_CLEAR"
}