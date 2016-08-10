const rewire = require('rewire');
const assert = require('assert');
const locker = rewire('../source/locker.js');
const Locker = locker.__get__('Locker');
const storage = new Locker();

describe('Locker', () => {
    describe('#constructor()', () => {
        it('init with no localStorage support', () => {
            assert.equal(false, storage.usingLocalStorage);
        });
    });

    describe('#store()', () => {
        it('store a number', () => {
            assert.equal(true, storage.store('num', 66.6));
        });

        it('store a string', () => {
            assert.equal(true, storage.store('str', 'hello world'));
        });

        it('store a boolean', () => {
            assert.equal(true, storage.store('bool', false));
        });

        it('store a dict', () => {
            assert.equal(true, storage.store('dict', {foo : 'bar'}));
        });

        it('store a list', () => {
            assert.equal(true, storage.store('list', ['hi']));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(5, Object.keys(storage.items).length);
        });
    });

    describe('#retrieve()', () => {
        it('retrieve a number', () => {
            assert.equal(66.6, storage.retrieve('num'));
        });

        it('retrieve a string', () => {
            assert.equal('hello world', storage.retrieve('str'));
        });

        it('retrieve a bool', () => {
            assert.equal(false, storage.retrieve('bool'));
        });

        it('retrieve a dict', () => {
            assert.equal('bar', storage.retrieve('dict').foo);
        });

        it('retrieve a list', () => {
            assert.equal('hi', storage.retrieve('list')[0]);
        });
    });

    describe('#destroy()', () => {
        it('destroy an item', () => {
            assert.equal(true, storage.destroy('num'));
            assert.equal(null, storage.retrieve('num'));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(4, Object.keys(storage.items).length);
        });
    });

    describe('#empty()', () => {
        it('destroy all items', () => {
            assert.equal(true, storage.empty());
            assert.equal(null, storage.retrieve('dict'));
        });
    });

    describe('#items', () => {
        it('length of items is accurate', () => {
            assert.equal(0, Object.keys(storage.items).length);
        });
    });
});
