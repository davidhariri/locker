class Locker {
  constructor(session = false) {
    this.items = {};
    this.usingLocalStorage = false;
    this.storage = session ? sessionStorage : localStorage;

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        // Potential fail point if in sandbox iframe
        this.storage.setItem("__LOCKER_TEST_IGNORE", true);
        this.storage.removeItem("__LOCKER_TEST_IGNORE"); // Potential fail point if in private browsing mode in Safari
        this.usingLocalStorage = true;
      }
    } catch (e) {
      // This will fail when Locker is being run inside a sandbox iframe
      console.warn(
        "window.localStorage is not available. Locker will use it's own in-memory storage. Use 'Locker.items' to view items."
      );
    }
  }

  store(key, value) {
    if (typeof key !== "string") {
      console.warn("Key should be of type string");
      return false;
    }

    try {
      value = JSON.stringify(value);
    } catch (e) {
      console.warn(`Attempt to stringify JSON failed: ${e}`);
      return false;
    }

    if (this.usingLocalStorage) {
      this.storage.setItem(key, value);
    } else {
      this.items[key] = value;
    }

    return true;
  }

  retrieve(key) {
    let item = null;

    if (this.usingLocalStorage) {
      item = this.storage.getItem(key);
    } else {
      item = this.items[key];
    }

    if (item) {
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
    if (this.usingLocalStorage) {
      this.storage.removeItem(key);
    } else {
      delete this.items[key];
    }

    return true;
  }

  empty() {
    if (this.usingLocalStorage) {
      this.storage.clear();
    } else {
      this.items = {};
    }

    return true;
  }
}

module.exports = Locker;