import * as fs from "fs";

/**
 * 检查给定路径的文件是否存在
 *
 * @param {string} filePath 要检查的文件路径
 * @returns {boolean} 如果文件存在则返回 true，否则返回 false
 */
export function fileExists(filePath: string) {
  try {
    // 使用 fs.statSync 获取文件信息。如果文件不存在，它将抛出一个错误。
    const stats = fs.statSync(filePath);
    // 返回该路径是否为文件
    return stats.isFile();
  } catch (error) {
    // 如果出现错误，假设文件不存在
    return false;
  }
}

/**
 * 检查给定路径是否为目录
 *
 * @param {string} dirPath 要检查的目录路径
 * @returns {boolean} 如果路径是目录则返回 true，否则返回 false
 */
export function isDirectory(dirPath: string) {
  try {
    // 使用 fs.statSync 获取目录信息。如果目录不存在，它将抛出一个错误。
    const stats = fs.statSync(dirPath);
    // 返回该路径是否为目录
    return stats.isDirectory();
  } catch (error) {
    // 如果出现错误，假设路径不是目录
    return false;
  }
}
