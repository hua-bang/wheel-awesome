import * as fs from "fs";
import { createDependencyGraph } from "./create-dependency-graph";
import { bundle } from "./bundle";

export const run = (filePath: string, outputPath: string) => {
  const graph = createDependencyGraph(filePath);
  const result = bundle(graph);
  fs.writeFileSync(outputPath, result);
};
