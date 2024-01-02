import { Loader } from "../../../src/loader";

export const tsLoader: Loader = (content, filePath) => {
  return `console.log('hello, world');`;
};
