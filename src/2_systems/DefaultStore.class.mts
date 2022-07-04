import EventService, { DefaultEventService, EventServiceConsumer } from "ior:esm:/tla.EAM.Once.EventService[build]";
import { BaseThing } from "ior:esm:/tla.EAM.Once[build]";
import Store, { StoreEvents } from "../3_services/Store.interface.mjs";

//TODO , EventServiceConsumer
export default class DefaultStore extends BaseThing<DefaultStore> implements Store, EventServiceConsumer {

    EVENT_NAMES = StoreEvents;

    private registry: { [index: string]: any } = {};

    register(key: string, value: any): void {
        this.eventSupport.fire(StoreEvents.ON_REGISTER, key, value);
        this.registry[key] = value;
    }
    remove(key: string): void {
        this.eventSupport.fire(StoreEvents.ON_REMOVE, key, this.registry[key]);
        delete this.registry[key];
    }
    lookup(key: string) {
        return this.registry[key]
    }
    discover(): any[] {
        return Object.keys(this.registry).map(k => { return { key: k, value: this.registry[k] } });
    }
    clear(): void {
        this.eventSupport.fire(StoreEvents.ON_CLEAR);
        this.registry = {};
    }


    // TODO Add
    get eventSupport(): EventService<StoreEvents> {
        if (this._eventSupport === undefined) {
            this._eventSupport = new DefaultEventService(this);
        }
        return this._eventSupport;
    }
}
