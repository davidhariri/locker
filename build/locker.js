'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locker = function () {
    function Locker() {
        var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local';

        _classCallCheck(this, Locker);

        var storageTypes = ['local', 'session'];

        this.items = {};
        this.usingStorage = false;
        this.storageType = storageType;

        if (!storageTypes.includes(this.storageType)) {
            console.warn('\'' + this.storageType + '\' is not a valid storage type. Falling back to localStorage.');
            storageType = 'local';
        }

        try {
            if (typeof window !== 'undefined' && window.localStorage && window.sessionStorage) {
                // Potential fail point if in sandbox iframe
                window[this.storageType + 'Storage'].setItem('__LOCKER_TEST_IGNORE', true);
                window[this.storageType + 'Storage'].removeItem('__LOCKER_TEST_IGNORE'); // Potential fail point if in private browsing mode in Safari
                this.usingStorage = true;
            }
        } catch (e) {
            // This will fail when Locker is being run inside a sandbox iframe
            console.warn('Storage API is not available. Locker will use it\'s own in-memory storage. Use \'Locker.items\' to view items.');
        }
    }

    _createClass(Locker, [{
        key: '__getStorageAPI',
        value: function __getStorageAPI() {
            return window[this.storageType + 'Storage'];
        }
    }, {
        key: 'store',
        value: function store(key, value) {
            if (typeof key !== 'string') {
                console.warn('Key should be of type string');
                return false;
            }

            try {
                value = JSON.stringify(value);
            } catch (e) {
                console.warn('Attempt to stringify JSON failed: ' + e);
                return false;
            }

            if (this.usingStorage) {
                this.__getStorageAPI().setItem(key, value);
            } else {
                this.items[key] = value;
            }

            return true;
        }
    }, {
        key: 'retrieve',
        value: function retrieve(key) {
            var item = null;

            if (this.usingStorage) {
                item = this.__getStorageAPI().getItem(key);
            } else {
                item = this.items[key];
            }

            if (item) {
                try {
                    item = JSON.parse(item);
                } catch (e) {
                    console.warn('Attempt to parse JSON failed: ' + e);
                    return null;
                }
            }

            return item;
        }
    }, {
        key: 'destroy',
        value: function destroy(key) {
            if (this.usingStorage) {
                this.__getStorageAPI().removeItem(key);
            } else {
                delete this.items[key];
            }

            return true;
        }
    }, {
        key: 'empty',
        value: function empty() {
            if (this.usingStorage) {
                this.__getStorageAPI().clear();
            } else {
                this.items = {};
            }

            return true;
        }
    }]);

    return Locker;
}();

try {
    module.exports = Locker;
} catch (e) {};
