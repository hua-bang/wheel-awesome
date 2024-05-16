import "reflect-metadata";

interface Dependency<T = any> {
  new (...args: any[]): T;
}

export class Container {
  private dependencies: Map<string, Dependency> = new Map();

  register<T>(key: string, dependency: Dependency<T>): void {
    this.dependencies.set(key, dependency);
  }

  resolve<T>(token: string): T {
    const target = this.dependencies.get(token);
    if (!target) {
      throw new Error(`Service not found: ${token}`);
    }

    // 获取目标类的依赖列表
    const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
    const injections = dependencies.map((dep: any) => {
      // 假设依赖是用它们的类名注册的
      return this.resolve(dep.name);
    });

    return new target(...injections);
  }
}

const container = new Container();

export default container;
