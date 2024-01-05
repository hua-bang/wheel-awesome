import * as fs from "fs";
import * as path from "path";
import Plugin from "../../../plugin";
import { Compiler } from "../../../core/compiler";

interface HtmlPluginOptions {
  output?: string;
}

function getRelativePathToFile(fromFile: string, toPath: string): string {
  const fromDirectory = path.dirname(fromFile);
  let relativePath = path.relative(fromDirectory, toPath);

  // 确保路径以 './' 开头
  if (!relativePath.startsWith(".")) {
    relativePath = "./" + relativePath;
  }

  return relativePath;
}

class HtmlPlugin implements Plugin {
  options?: HtmlPluginOptions;

  constructor(options?: HtmlPluginOptions) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    compiler.hooks.afterRun.tap("HtmlPlugin", () => {
      const bundleJSPath = compiler.stats.outputPath;

      if (!bundleJSPath) {
        return;
      }
      const output = path.resolve(bundleJSPath, "../index.html");

      const htmlTemplatePath = path.resolve(__dirname, "./template.html");

      let htmlContent = fs.readFileSync(htmlTemplatePath, "utf-8") as string;

      const bundleJSRelativePath = getRelativePathToFile(output, bundleJSPath);

      htmlContent = htmlContent.replace(
        "{{ bundleJSPath }}",
        bundleJSRelativePath
      );

      console.log(`HtmlPlugin begin: output path is ${output}`);
      fs.writeFileSync(output, htmlContent);
      console.log(`HtmlPlugin finished.`);
    });
  }
}

export default HtmlPlugin;
