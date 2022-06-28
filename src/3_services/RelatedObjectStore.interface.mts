import { ClassDescriptorInterface, InterfaceDescriptorInterface } from "ior:esm:/tla.EAM.Once[dev]";
import Store from "./Store.interface.mjs";

export type RelatedObjectStoreStoredObject = { classDescriptor: ClassDescriptorInterface };


export default interface RelatedObjectStore extends Store {

    register(aObject: RelatedObjectStoreStoredObject): any

    remove(aObject: RelatedObjectStoreStoredObject, anInterface?: InterfaceDescriptorInterface): void;

    lookup(anInterface: InterfaceDescriptorInterface): any[];

    discover(): Map<InterfaceDescriptorInterface, any[]>;
}