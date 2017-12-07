class Locker {
    constructor(storageType='local') {
        const storageTypes = ['local', 'session'];

        this.items = {};
        this.usingStorage = false;
        this.storageType = storageType;

        if(!storageTypes.includes(this.storageType)) {
            console.warn(`'${this.storageType}' is not a valid storage type. Falling back to localStorage.`);
            storageType = 'local';
        }

        try {
            if(typeof window !== 'undefined' && window.localStorage && window.sessionStorage) { // Potential fail point if in sandbox iframe
                window[`${this.storageType}Storage`].setItem('__LOCKER_TEST_IGNORE', true);
                window[`${this.storageType}Storage`].removeItem('__LOCKER_TEST_IGNORE'); // Potential fail point if in private browsing mode in Safari
                this.usingStorage = true;
            }
        } catch (e) {
            // This will fail when Locker is being run inside a sandbox iframe
            console.warn('Storage API is not available. Locker will use it\'s own in-memory storage. Use \'Locker.items\' to view items.')
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

        if(this.usingStorage) {
            window[`${this.storageType}Storage`].setItem(key, value);
        } else {
            this.items[key] = value;
        }

        return true;
    }

    retrieve(key) {
        let item = null;

        if(this.usingStorage) {
            item = window[`${this.storageType}Storage`].getItem(key);
        } else {
            item = this.items[key];
        }

        if(item) {
            try {
                item = JSON.parse(item);
            } catch (e) {
                console.warn(`Attempt to parse JSON failed: ${e}`);
                return null;
            }
        }

        return item;
    }

    destroy(key) {
        if(this.usingStorage) {
            window[`${this.storageType}Storage`].removeItem(key);
        } else {
            delete this.items[key];
        }

        return true;
    }

    empty() {
        if (this.usingStorage) {
            window[`${this.storageType}Storage`].clear();
        } else {
            this.items = {};
        }

        return true;
    }
}

// export singleton only, not class Locker
module.exports = Locker;
