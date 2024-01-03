import { fileExists, isDirectory } from "../utils/file";

export function resolveModule(importPath: string) {
  const possibleExtensions = [".js", ".jsx", ".ts", ".tsx"];
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
