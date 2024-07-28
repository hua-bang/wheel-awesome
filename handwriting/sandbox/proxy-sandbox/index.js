class ProxySandbox {
  constructor() {
    this.originalWindow = {};
    this.fakeWindow = {};
    this.proxy = null;
  }

  activate() {
    this.backupGlobals();
    this.proxy = this.createProxy();
  }

  backupGlobals() {
    Object.keys(window).forEach((key) => {
      this.originalWindow[key] = window[key];
      this.fakeWindow[key] = window[key];
    });
  }

  createProxy() {
    const rawWindow = window;
    return new Proxy(this.fakeWindow, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }
        const value = rawWindow[prop];
        return typeof value === "function" ? value.bind(rawWindow) : value;
      },
      set(target, prop, value) {
        if (this.originalWindow.hasOwnProperty(prop)) {
          this.fakeWindow[prop] = value;
        } else {
          rawWindow[prop] = value;
        }
        return true;
      },
      has: (target, prop) => {
        return prop in target || prop in rawWindow;
      },
    });
  }

  deactivate() {
    Object.keys(this.fakeWindow).forEach((key) => {
      if (!this.originalWindow.hasOwnProperty(key)) {
        delete this.fakeWindow[key];
      }
    });
    this.proxy = null;
  }

  run(code) {
    if (!this.proxy) {
      this.activate();
    }

    try {
      const executor = new Function("window", `with(window) { ${code} }`);
      return executor(this.proxy);
    } catch (e) {
      console.error(e);
    } finally {
      this.deactivate();
    }
  }
}
