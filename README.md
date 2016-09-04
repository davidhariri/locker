# Locker

![](https://circleci.com/gh/davidhariri/locker.svg?style=shield)

Locker makes data persistence in any browser-based JavaScript application efficient and easy. This means that you don't need to worry about testing for `localStorage` or private browsing mode. Different browsers handle these things differently, so Locker is essentially a wrapper on the `window` that figures out if it's contents should be persisted or not based on if the user is in private browsing mode and/or if the user has `localStorage` support in their browser.

Want to see something added or have an issue? Put it in the issues and i'll get on it!

## Install
If you want, you can use npm to install Locker:

```bash
npm install locker.js --save
```

Alternatively, you could just include `./build/locker.min.js` in your project or use [unpkg](https://unpkg.com/locker.js@1.0.0/).

## Methods

### Initialization

First, let's make a new instance of Locker

```js
const myAppStorage = new Locker();
```

### Store
Now, let's store something

```js
myAppStorage.store('foo', 'bar');
// => true
```

Locker supports anything that's JSON serializable, which means it can store dictionaries, lists, strings, numbers and booleans.

### Retrieve
Now let's retrieve that thing we stored

```js
const bar = myAppStorage.retrieve('foo');
// => 'bar'

const doesntExist = myAppStorage.retrieve('bar');
// => null
```

### Delete
Now let's delete that thing we stored

```js
myAppStorage.destroy('foo');
// => true
```

### Empty
Lastly, you can empty all the contents of storage

```js
myAppStorage.empty();
// => true
```

## Build
If you want to hack on Locker, make your changes in `./source/locker.js` and then build it using:

```bash
npm run build
```

Don't forget to add tests in `./test/locker.js` :grinning:

## Test

```bash
npm test
```
