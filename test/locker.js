const assert = require('assert');
const Locker = require('../source/locker.js');

const locker = new Locker();

describe('Locker', () => {
    describe('#imports', () => {
        it('should be importable using es6 import syntax', () => {
            assert.equal(false, true);
        });
    });

    describe('#constructor()', () => {
        it('init with no localStorage support', () => {
            assert.equal(false, locker.usingStorage);
        });

        it('defaults to localStorage', () => {
            assert.equal('local', locker.storageType);
        });

        it('defaults to localStorage', () => {
            assert.equal('local', locker.storageType);
        });
    });

    describe('#store()', () => {
        it('store a number', () => {
            assert.equal(true, locker.store('num', 66.6));
        });

        it('store a string', () => {
            assert.equal(true, locker.store('str', 'hello world'));
        });

        it('store a boolean', () => {
            assert.equal(true, locker.store('bool', false));
        });

        it('store a dict', () => {
            assert.equal(true, locker.store('dict', {foo : 'bar'}));
        });

        it('store a list', () => {
            assert.equal(true, locker.store('list', ['hi']));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(5, Object.keys(locker.items).length);
        });
    });

    describe('#retrieve()', () => {
        it('retrieve a number', () => {
            assert.equal(66.6, locker.retrieve('num'));
        });

        it('retrieve a string', () => {
            assert.equal('hello world', locker.retrieve('str'));
        });

        it('retrieve a bool', () => {
            assert.equal(false, locker.retrieve('bool'));
        });

        it('retrieve a dict', () => {
            assert.equal('bar', locker.retrieve('dict').foo);
        });

        it('retrieve a list', () => {
            assert.equal('hi', locker.retrieve('list')[0]);
        });
    });

    describe('#destroy()', () => {
        it('destroy an item', () => {
            assert.equal(true, locker.destroy('num'));
            assert.equal(null, locker.retrieve('num'));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(4, Object.keys(locker.items).length);
        });
    });

    describe('#empty()', () => {
        it('destroy all items', () => {
            assert.equal(true, locker.empty());
            assert.equal(null, locker.retrieve('dict'));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(0, Object.keys(locker.items).length);
        });
    });
});
