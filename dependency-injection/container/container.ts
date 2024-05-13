import "reflect-metadata";

interface Dependency<T = any> {
  new (...args: any[]): T;
}

export class Container {
  private dependencies: Map<string, Dependency> = new Map();

  register<T>(key: string, dependency: Dependency<T>): void {
    this.dependencies.set(key, dependency);
  }

  resolve<T>(key: string): T {
    const dependency = this.dependencies.get(key);
    if (!dependency) {
      throw new Error(`Dependency with key "${key}" not found`);
    }

    const dependencyInstance = new dependency();
    return this.injectDependencies(dependencyInstance);
  }

  private injectDependencies<T>(instance: any): T {
    const constructor = instance.constructor;

    const paramTypes = Object.keys(instance)
      .filter((item) => !instance[item])
      .map((item) => ({
        name: item,
      }));

    // const paramTypes =
    //   Reflect.getMetadata("design:paramtypes", constructor) || [];
    const dependencies = paramTypes.map((paramType: any) => ({
      [paramType.name]: this.resolve(paramType.name),
    }));
    return Object.assign(instance, ...dependencies);
  }
}
