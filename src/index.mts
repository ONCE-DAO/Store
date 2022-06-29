import DefaultStore from "./2_systems/DefaultStore.class.mjs";
import RelatedObjectStore from "./2_systems/RelatedObjectStore.class.mjs";
import WeakRefPromiseStore from "./2_systems/WeakRefPromiseStore.class.mjs";
import WeakRefStore from "./2_systems/WeakRefStore.class.mjs";
import Store, { StoreEvents } from "./3_services/Store.interface.mjs";

export default Store;
export { RelatedObjectStore, StoreEvents, DefaultStore, WeakRefPromiseStore, WeakRefStore }