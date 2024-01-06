import { fileExists, isDirectory } from "../utils/file";
import { isRelativeOrAbsolutePath } from "./create-module";
import * as path from "path";

export function resolveModule(importPath: string) {
  const possibleExtensions = [".js", ".jsx", ".ts", ".tsx"];
  let resolvedPath = "";

  if (isRelativeOrAbsolutePath(importPath)) {
    resolvedPath = resolveLocalPath(importPath, possibleExtensions);
  } else {
    resolvedPath = resolveNodeModulesPath(importPath, possibleExtensions);
  }

  if (resolvedPath === "") {
    throw new Error(`Module not found: ${importPath}`);
  }

  return resolvedPath;
}

export function resolveLocalPath(
  importPath: string,
  possibleExtensions: string[]
) {
  let resolvedPath = "";

  // 尝试直接解析路径
  if (fileExists(importPath)) {
    resolvedPath = importPath;
    return resolvedPath;
  } else {
    // 尝试添加不同的扩展名
    for (let ext of possibleExtensions) {
      if (fileExists(importPath + ext)) {
        resolvedPath = importPath + ext;
        break;
      }
    }
  }

  // 处理目录导入的情况
  if (resolvedPath === "" && isDirectory(importPath)) {
    // 这里可以扩展以支持不同的 "index" 文件
    resolvedPath = importPath + "/index.js";
  }

  if (resolvedPath === "") {
    throw new Error(`Module not found: ${importPath}`);
  }

  return resolvedPath;
}

export const resolveNodeModulesPath = (
  moduleName: string,
  possibleExtensions: string[]
) => {
  let nodeModulesPath = findNearestNodeModules(__dirname); // 使用 __dirname 作为起点
  let modulePath = path.join(nodeModulesPath, moduleName);
  let resolvedPath = "";

  for (let ext of possibleExtensions) {
    if (fileExists(modulePath + ext)) {
      resolvedPath = modulePath + ext;
      break;
    }
  }

  if (resolvedPath === "" && isDirectory(modulePath)) {
    resolvedPath = modulePath + "/index.js";
  }

  // 之前的实现...

  return resolvedPath;
};

function findNearestNodeModules(startPath: string): string {
  let currentPath = startPath;
  while (currentPath !== path.parse(currentPath).root) {
    const possibleNodeModulesPath = path.join(currentPath, "node_modules");
    if (isDirectory(possibleNodeModulesPath)) {
      return possibleNodeModulesPath;
    }
    currentPath = path.dirname(currentPath);
  }
  throw new Error("node_modules directory not found");
}
