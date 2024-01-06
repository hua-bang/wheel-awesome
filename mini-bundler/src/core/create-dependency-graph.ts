import * as path from "path";
import { createModule, isRelativeOrAbsolutePath } from "./create-module";
import { DependencyGraph, Module } from "../typings";
import { Loader } from "../loader";
import { resolveModule } from "./resolve-module";

/**
 * 创建依赖关系图。
 * 此函数根据入口文件路径构建项目的依赖关系图。它递归地遍历每个模块的依赖项，
 * 并将它们添加到依赖关系图中，这个图是一个映射，键为模块ID，值为模块对象。
 *
 * @param {string} entry - 入口文件的路径。
 * @returns {DependencyGraph} - 表示依赖关系的图，这是一个映射，其中键是模块ID，值是模块对象。
 */
export const createDependencyGraph = (
  entry: string,
  loaderMap?: Record<string, Loader[]>
): DependencyGraph => {
  const entryModule = createModule(entry, loaderMap);

  const graph: DependencyGraph = new Map<string, Module>();

  const explore = (module: Module) => {
    if (graph.has(module.id)) {
      return;
    }

    graph.set(module.id, module);

    module.dependencies.forEach((dependency) => {
      const dependencyPath = isRelativeOrAbsolutePath(dependency)
        ? path.resolve(module.filePath, "..", dependency)
        : dependency;

      const absoluteDependencyPath = resolveModule(dependencyPath);
      const dependencyModule = createModule(absoluteDependencyPath, loaderMap);
      explore(dependencyModule);
    });
  };

  explore(entryModule);
  return graph;
};
