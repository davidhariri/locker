'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locker = function () {
    function Locker() {
        _classCallCheck(this, Locker);

        this.items = {};
        this.usingLocalStorage = false;

        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                localStorage.setItem('__LOCKER_TEST_IGNORE', true);
                localStorage.removeItem('__LOCKER_TEST_IGNORE');
                this.usingLocalStorage = true;
            } catch (e) {
                console.warn('window.localStorage is not available. Locker will use it\'s own in-memory storage. Use \'Locker.items\' to view items.');
            }
        }
    }

    _createClass(Locker, [{
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

            if (this.usingLocalStorage) {
                localStorage.setItem(key, value);
            } else {
                this.items[key] = value;
            }

            return true;
        }
    }, {
        key: 'retrieve',
        value: function retrieve(key) {
            var item = null;

            if (this.usingLocalStorage) {
                item = localStorage.getItem(key);
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
            if (this.usingLocalStorage) {
                localStorage.removeItem(key);
            } else {
                delete this.items[key];
            }

            return true;
        }
    }, {
        key: 'empty',
        value: function empty() {
            if (this.usingLocalStorage) {
                localStorage.clear();
            } else {
                this.items = {};
            }

            return true;
        }
    }]);

    return Locker;
}();
