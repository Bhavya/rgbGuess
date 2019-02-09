class LiteHashMap<K, V> {

    private _keys: K[] = new Array<K>();
    private _values: V[] = new Array<V>();
    private _entrySet: { key: K; value: V; }[] = new Array();
    size: number;

    constructor() {
        let init: { key: K; value: V; }[] = new Array();
        this.size = 0;
    }

    keySet(): K[] {
        return this._keys;
    }

    values(): V[] {
        return this._values;
    }

    entrySet(): { key: K; value: V; }[] {
        return this._entrySet;
    }

    put(key: K, value: V): any {
        this._keys.push(key);
        this._values.push(value);
        this._entrySet.push({ key: key, value: value });
        this.size++;
    }

    get(key: K): V {
        let index = 0;

        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                index = x;
                break;
            }
        }
        return this._values[index];
    }

    clear() {
        this._keys = new Array<K>();
        this._values = new Array<V>();
        this.size = 0;
    }

    delete(key: K) {
        let index = 0;
        let success = false;

        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                index = x;
                success = true;
                break;
            }
        }

        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        this.size--;

        return success;
    }

    has(key: K): boolean {
        let hasKey = false;

        for (var x; x < this._keys.length; x++) {
            if (this._keys[x] == key) {
                hasKey = true;
                break;
            }
        }

        return hasKey;
    }
}