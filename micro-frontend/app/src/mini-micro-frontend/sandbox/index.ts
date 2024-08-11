class Sandbox {
  private proxyWindow: Window | null = null;
  private proxyDocument: Document | null = null;
  private proxyLocation: Location | null = null;
  private modifiedProps: Map<object, Set<string | symbol>>;
  private active: boolean;
  private originalValues: Map<object, Map<string | symbol, any>>;
  private fakeWindow: Record<string | symbol, any> = {};
  private fakeDocument: Record<string | symbol, any> = {};
  private fakeLocation: Record<string | symbol, any> = {};

  constructor() {
    this.modifiedProps = new Map();
    this.active = false;
    this.originalValues = new Map();
    this.initialProxy();
  }

  private initialProxy() {
    this.proxyWindow = this.createProxy(window, "proxyWindow") as Window;
    this.proxyDocument = this.createProxy(
      document,
      "proxyDocument"
    ) as Document;
    this.proxyLocation = this.createProxy(
      location,
      "proxyLocation"
    ) as Location;
  }

  private createProxy(obj: object) {
    if (!this.modifiedProps.has(obj)) {
      this.modifiedProps.set(obj, new Set());
    }
    if (!this.originalValues.has(obj)) {
      this.originalValues.set(obj, new Map());
    }

    return new Proxy(obj, {
      get: (target, p) => {
        if (p === Symbol.unscopables) {
          return target;
        }
        const val = (target as any)[p as string | symbol];
        if (!this.active) {
          return val;
        }

        const modifiedPropsSet = this.modifiedProps.get(target)!;
        if (modifiedPropsSet.has(p)) {
          const fakeObject = this.getFakeObject(target);
          return fakeObject[p as string];
        }

        if (typeof val === "function") {
          return val.bind(target);
        }
      },
      set: (target: object, prop: string | symbol, value: any) => {
        if (!this.active) {
          (target as any)[prop] = value;
          return true;
        }

        const modifiedPropsSet = this.modifiedProps.get(target)!;
        const originalValuesMap = this.originalValues.get(target)!;
        if (!modifiedPropsSet.has(prop)) {
          originalValuesMap.set(prop, (target as any)[prop]);
          modifiedPropsSet.add(prop);
        }
        const fakeObject = this.getFakeObject(target);
        fakeObject[prop as string] = value;
        return true;
      },
      has: (target: object, prop: string | symbol) => {
        return prop in target || this.modifiedProps.get(target)!.has(prop);
      },
    });
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  run(code: string): Record<string, any> | undefined {
    const exports: Record<string, any> = {};

    this.activate();

    let result: Record<string, any> | undefined = undefined;

    try {
      const executionFunction = new Function(
        "window",
        "document",
        "location",
        "exports",
        `
        with (window) {
          ${code};
          return exports;
        }
      `
      );

      result = executionFunction(
        this.proxyWindow,
        this.proxyDocument,
        this.proxyLocation,
        exports
      );
    } catch (err) {
      console.error(err);
    }

    return result;
  }

  reset() {
    this.deactivate();
    for (const [target, modifiedPropsSet] of this.modifiedProps.entries()) {
      const originalValuesMap = this.originalValues.get(target)!;
      const fakeObject = this.getFakeObject(target);
      for (const prop of modifiedPropsSet) {
        if (originalValuesMap.has(prop)) {
          fakeObject[prop as string] = originalValuesMap.get(prop);
        } else {
          delete fakeObject[prop as string];
        }
      }
      modifiedPropsSet.clear();
      originalValuesMap.clear();
    }
  }

  private getFakeObject(target: object): { [key: string]: any } {
    if (target === window) return this.fakeWindow;
    if (target === document) return this.fakeDocument;
    if (target === location) return this.fakeLocation;
    throw new Error("Unknown target object");
  }
}

export default Sandbox;
