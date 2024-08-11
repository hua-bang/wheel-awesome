class Sandbox {
  private proxyWindow: Window | null = null;
  private proxyDocument: Document | null = null;
  private proxyLocation: Location | null = null;
  private modifiedProps: Map<object, Set<string | symbol>>;
  private active: boolean;
  private originalValues: Map<object, Map<string | symbol, any>>;
  private fakeWindow: Record<string, any> = {};
  private fakeDocument: Record<string, any> = {};
  private fakeLocation: Record<string, any> = {};

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

  private getFakeObj(objectName: string): Record<string, any> {
    if (objectName === "proxyWindow") {
      return this.fakeWindow;
    }
    if (objectName === "proxyDocument") {
      return this.fakeDocument;
    }
    if (objectName === "proxyLocation") {
      return this.fakeLocation;
    }

    return this.fakeWindow;
  }

  private createProxy(target: object, objectName: string) {
    if (!this.modifiedProps.has(target)) {
      this.modifiedProps.set(target, new Set());
    }
    if (!this.originalValues.has(target)) {
      this.originalValues.set(target, new Map());
    }

    return new Proxy(target, {
      get: (target: object, prop: string | symbol) => {
        if (this.active) {
          const modifiedPropsSet = this.modifiedProps.get(target)!;
          if (modifiedPropsSet.has(prop)) {
            const value: Record<string, any> =
              this.getFakeObj(objectName)[prop as string];

            return typeof value === "function" ? value.bind(target) : value;
          }
          const value = (target as any)[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
        return (target as any)[prop];
      },
      set: (target: object, prop: string | symbol, value: any, receiver) => {
        if (this.active) {
          const modifiedPropsSet = this.modifiedProps.get(target)!;
          const originalValuesMap = this.originalValues.get(target)!;
          if (!modifiedPropsSet.has(prop)) {
            originalValuesMap.set(prop, (target as any)[prop]);
            modifiedPropsSet.add(prop);
          }

          return Reflect.set(
            this.getFakeObj(objectName),
            prop,
            value,
            receiver
          );
        }
        (target as any)[prop] = value;
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

  run(code: string): Record<string, any> {
    const exports: Record<string, any> = {};

    this.activate();

    const executionFunction = new Function(
      "window",
      "document",
      "location",
      "exports",
      `
      with(window) {
        ${code};
        return exports;
      }
    `
    );

    const result = executionFunction(window, document, location, exports);

    return result;
  }

  reset() {
    this.deactivate();
    for (const [target, modifiedPropsSet] of this.modifiedProps.entries()) {
      const originalValuesMap = this.originalValues.get(target)!;
      for (const prop of modifiedPropsSet) {
        if (originalValuesMap.has(prop)) {
          (this as any)[this.getProxyName(target)][prop] =
            originalValuesMap.get(prop);
        } else {
          delete (this as any)[this.getProxyName(target)][prop];
        }
      }
      modifiedPropsSet.clear();
      originalValuesMap.clear();
    }
  }

  private getProxyName(target: object): string {
    if (target === window) return "proxyWindow";
    if (target === document) return "proxyDocument";
    if (target === location) return "proxyLocation";
    throw new Error("Unknown target object");
  }
}

export default Sandbox;
