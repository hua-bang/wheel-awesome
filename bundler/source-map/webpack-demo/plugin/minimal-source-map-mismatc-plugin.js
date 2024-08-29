const { SourceMapSource, RawSource } = require("webpack-sources");
const { SourceMapGenerator, SourceMapConsumer } = require("source-map");

class MinimalSourceMapMismatchPlugin {
  apply(compiler) {
    console.log("MinimalSourceMapMismatchPlugin");
    compiler.hooks.emit.tapAsync(
      "MinimalSourceMapMismatchPlugin",
      async (compilation, callback) => {
        for (const filename in compilation.assets) {
          if (filename.endsWith(".js")) {
            const asset = compilation.assets[filename];
            const { source, map } = asset.sourceAndMap();

            const newSource = source.replace(/const /g, "\n\nlet ");

            // 使用 source-map 库生成新的 sourcemap
            const newMap = await this.generateNewSourceMap(
              source,
              newSource,
              map,
              filename
            );

            compilation.assets[filename] = new SourceMapSource(
              newSource,
              filename,
              newMap, // 新的 source map
              source, // 原始的源代码
              map, // 未更改的 source map
              true // 允许返回列信息以提高精度
            );
          }
        }
        callback();
      }
    );
  }

  async generateNewSourceMap(oldSource, newSource, oldMap, filename) {
    const generator = new SourceMapGenerator({ file: filename });

    // 使用 SourceMapConsumer 读取原来的 source map
    const consumer = await new SourceMapConsumer(oldMap);
    const sourceLines = oldSource.split("\n");

    consumer.eachMapping((mapping) => {
      const {
        source,
        generatedLine,
        generatedColumn,
        originalLine,
        originalColumn,
        name,
      } = mapping;

      if (originalLine != null) {
        // 计算新的行列偏移
        const originalCharIndex =
          sourceLines.slice(0, originalLine - 1).join("\n").length +
          originalColumn;
        const newCharIndex =
          originalCharIndex +
          newSource.slice(originalCharIndex).indexOf("\n\nlet ");

        const newGeneratedLine = newSource
          .slice(0, newCharIndex)
          .split("\n").length;
        const newGeneratedColumn =
          newCharIndex - newSource.slice(0, newCharIndex).lastIndexOf("\n") - 1;

        generator.addMapping({
          source,
          generated: {
            line: newGeneratedLine,
            column: newGeneratedColumn,
          },
          original: {
            line: originalLine,
            column: originalColumn,
          },
          name,
        });
      }
    });

    consumer.destroy();
    generator.setSourceContent(filename, newSource);
    return generator.toJSON();
  }
}

module.exports = MinimalSourceMapMismatchPlugin;
