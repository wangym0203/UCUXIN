// Storage
export function StorageService(type) {
    const storage = (type === 'session' ? sessionStorage : localStorage);
    const set = (name, data) => {
        const type = Object.prototype.toString.call(data);
        if (storage[name]) {
            switch (type) {
                case '[object Array]':
                    storage[name] = JSON.stringify(data);
                    break;
                case '[object JSON]':
                    storage[name] = JSON.stringify(Object.assign({}, JSON.parse(storage[name]), data));
                    break;
                case '[object String]':
                case '[object Number]':
                case '[object Null]':
                case '[object Undefined]':
                default:
                    storage[name] = data.toString();
            }
        } else {
            switch (type) {
                case '[object Array]':
                case '[object JSON]':
                    storage[name] = JSON.stringify(data);
                    break;
                case '[object String]':
                case '[object Number]':
                case '[object Null]':
                case '[object Undefined]':
                default:
                    storage[name] = data.toString();
            }
        }
    };
    const del = (name) => storage.removeItem(name);
    const get = (name) => {
        if(storage[name]){
            try {
                return JSON.parse(storage[name]);
            }catch (e){
                return storage[name];
            }
        }
    };
    return {
        set: set,
        get: get,
        del: del
    }
}
