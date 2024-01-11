import * as fs from "fs";
import Context from "./context";

export const watchFileChange = (entry: string, context: Context) => {
  return fs.watch(entry, { recursive: true }, (eventType, filename) => {
    if (filename) {
      context.compiler.hooks.fileUpdate.call();
    }
  });
};
