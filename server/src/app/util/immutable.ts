import {Map} from "immutable"

declare module "immutable" {
    interface Map<K, V> {
        mapToMap<X, Y>(keyFunc: (key: K, val: V) => X, valFunc: (key: K, val: V) => Y): Map<X, Y>;
    }
}

function mapToMap<K, V, X, Y>(this: Map<K, V>, keyFunc: (key: K, val: V) => X, valFunc: (key: K, val: V) => Y): Map<X, Y> {
    return Map<X, Y>().withMutations((outMap: Map<X, Y>) => {
        this.forEach((val: V, key: K) => {
            outMap.set(keyFunc(key, val), valFunc(key, val));
        });
    });
}

Map.prototype.mapToMap = mapToMap;