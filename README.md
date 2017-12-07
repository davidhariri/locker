# Locker

![](https://circleci.com/gh/davidhariri/locker.svg?style=shield)

Locker makes data persistence in any browser-based JavaScript application efficient and easy. This means that you don't need to worry about testing for `localStorage`, `sessionStorage` or private browsing mode. Different browsers handle these things differently, so Locker is essentially a fault-tolerant wrapper on the `Window` that figures out if it's contents should be persisted or not based on if the user is in private browsing mode and/or if the user has `Storage` support in their browser.

Want to see something added or have an issue? Put it in the issues and i'll get on it!

## Install
If you want, you can use npm to install Locker:

```bash
npm install locker.js --save
```

and `require` it is as usual

```js
const Locker = require('../source/locker.js');
```

Alternatively, you could just include `/build/locker.min.js` in your project or use the latest version from NPM on [unpkg](https://unpkg.com/locker.js/build/locker.min.js) in your `<head>` and use the class `Locker` directly.

## Methods

### Initialization

First, let's make a new instance of Locker

```js
const myAppStorage = new Locker();
```

This will attempty to use `window.localStorage`, but if it's not there, it will fall back to it's own internal storage. To target `window.sessionStorage` look at this example:

```js
const myAppStorage = new Locker('session');
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
