/**
 * 代表一个模块的接口，包含模块的基本信息和属性。
 *
 * @interface
 * @property {number} id - 模块的唯一标识符。
 * @property {string} filePath - 模块的文件路径。
 * @property {string[]} dependencies - 模块依赖的其他模块列表。
 * @property {string} code - 模块的代码内容。
 */
export interface Module {
  id: number;
  filePath: string;
  dependencies: string[];
  code: string;
  mapping: Record<string, number>;
}
