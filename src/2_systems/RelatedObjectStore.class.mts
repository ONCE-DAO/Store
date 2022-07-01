import EventService, { DefaultEventService, EventServiceConsumer } from "ior:esm:/tla.EAM.Once.EventService[build]";
import { BaseThing, InterfaceDescriptorInterface } from "ior:esm:/tla.EAM.Once[dev-merge]";
import RelatedObjectStoreInterface, { RelatedObjectStoreStoredObject } from "../3_services/RelatedObjectStore.interface.mjs";
import Store, { StoreEvents } from "../3_services/Store.interface.mjs";

// TODO impl 
export default class RelatedObjectStore extends BaseThing<RelatedObjectStore> implements Store, RelatedObjectStoreInterface, EventServiceConsumer {

    EVENT_NAMES = StoreEvents;

    private registry!: Map<InterfaceDescriptorInterface, RelatedObjectStoreStoredObject[]>;

    constructor() {
        super();
        this.clear();
    }

    clear(): void {
        this.eventSupport.fire(StoreEvents.ON_CLEAR);

        this.registry = new Map<InterfaceDescriptorInterface, RelatedObjectStoreStoredObject[]>();
    }

    register(aObject: RelatedObjectStoreStoredObject): void {
        this.eventSupport.fire(StoreEvents.ON_REGISTER, aObject);

        let interfaces = aObject.classDescriptor.implementedInterfaces;

        for (const anInterface of interfaces) {
            let exists = this.registry.get(anInterface);
            if (exists) {
                exists.push(aObject);
            } else {
                this.registry.set(anInterface, [aObject]);
            }
        }
    }

    remove(aObject: RelatedObjectStoreStoredObject, anInterface?: InterfaceDescriptorInterface): void {
        this.eventSupport.fire(StoreEvents.ON_REMOVE, aObject, anInterface);

        let interfaces = anInterface ? [anInterface] : aObject.classDescriptor.implementedInterfaces;

        for (const interfaceItem of interfaces) {
            let exists = this.registry.get(interfaceItem);
            if (exists) {
                const newArray = exists.filter(x => x !== aObject);
                if (exists.length !== newArray.length) {
                    this.registry.set(interfaceItem, newArray);
                }
            }
        }

    }

    lookup(anInterface: InterfaceDescriptorInterface): RelatedObjectStoreStoredObject[] {
        return this.registry.get(anInterface) || [];
    }

    discover(): Map<InterfaceDescriptorInterface, RelatedObjectStoreStoredObject[]> {
        return this.registry;
    }

    get eventSupport(): EventService<StoreEvents> {
        if (this._eventSupport === undefined) {
            this._eventSupport = new DefaultEventService(this);
        }
        return this._eventSupport;
    }

}
