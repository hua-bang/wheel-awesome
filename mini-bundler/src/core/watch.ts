import * as fs from "fs";
import * as path from "path";
import Context from "./context";
import { DependencyGraph } from "../typings";

/**
 * 在项目的根目录上设置一个监听器，以便在文件更改时重新打包。
 * @param {Context} context 依赖图
 */
export function watchFileChange(context: Context, onFileChange: () => void) {
  const { rootPath } = context.options;
  if (!rootPath) {
    return;
  }
  fs.watch(rootPath, { recursive: true }, (eventType, filename) => {
    if (!filename || !context.compiler.dependencyGraph) {
      return;
    }

    const absoluteFilePath = path.resolve(rootPath, filename);

    if (
      eventType === "change" &&
      isFileInDependencyGraph(
        absoluteFilePath,
        context.compiler.dependencyGraph
      )
    ) {
      onFileChange();
    }
  });
}

/**
 * 检查变更的文件是否在依赖图中
 * @param {string} filename 变更的文件名
 * @param {DependencyGraph} dependencyGraph 依赖图
 * @returns {boolean} 是否在依赖图中
 */
function isFileInDependencyGraph(
  filename: string,
  dependencyGraph: DependencyGraph
): boolean {
  for (let module of dependencyGraph.values()) {
    if (path.resolve(module.filePath) === path.resolve(filename)) {
      return true;
    }
  }
  return false;
}
