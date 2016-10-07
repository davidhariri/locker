class Locker {
    constructor() {
        this.items = {};
        this.usingLocalStorage = false;

        if(typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('__LOCKER_TEST_IGNORE', true);
                localStorage.removeItem('__LOCKER_TEST_IGNORE');
                this.usingLocalStorage = true;
            } catch (e) {
                console.warn('window.localStorage is not available. Locker will use it\'s own in-memory storage. Use \'Locker.items\' to view items.');
            }
        }
    }

    store(key, value) {
        if(typeof key !== 'string') {
            console.warn('Key should be of type string');
            return false;
        }

        try {
            value = JSON.stringify(value);
        } catch (e) {
            console.warn(`Attempt to stringify JSON failed: ${e}`);
            return false;
        }

        if(this.usingLocalStorage) {
            localStorage.setItem(key, value);
        } else {
            this.items[key] = value;
        }

        return true;
    }

    retrieve(key) {
        let item = null;

        if(this.usingLocalStorage) {
            item = localStorage.getItem(key);
        } else {
            item = this.items[key];
        }

        if(item) {
            try {
                item = JSON.parse(item);
            } catch (e) {
                console.log(`Attempt to parse JSON failed: ${e}`);
                return null;
            }
        }

        return item;
    }

    destroy(key) {
        if(this.usingLocalStorage) {
            localStorage.removeItem(key);
        } else {
            delete this.items[key];
        }

        return true;
    }

    empty() {
        if (this.usingLocalStorage) {
            localStorage.clear();
        } else {
            this.items = {};
        }

        return true;
    }
}
