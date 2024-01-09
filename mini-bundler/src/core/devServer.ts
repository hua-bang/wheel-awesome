import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { runHMR } from "./hmr";
import Context from "./context";

const defaultOptions: DevServerOptions = {
  port: 3000,
  dirName: "dist",
  rootPath: __dirname,
};

class DevServer {
  options: DevServerOptions;
  context: Context;

  constructor(context: Context, options?: DevServerOptions) {
    this.options = {
      ...defaultOptions,
      ...(options || {}),
    };
    this.context = context;
  }

  run() {
    const { port, rootPath = __dirname, dirName = "dist" } = this.options;
    const server = http.createServer((req, res) => {
      let filePath = path.join(rootPath, dirName, req.url as string);

      // 处理根路径请求
      if (req.url === "/") {
        filePath = path.join(rootPath, dirName, "index.html");
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("404 Not Found");
          return;
        }
        res.write(data);
        res.end();
      });
    });

    server.listen(port, () => {
      console.log(`devServer is running on http://localhost:${port}`);
    });

    console.log(this.context.options.entry);

    runHMR(
      {
        entry: this.context.options.entry,
      },
      this.context
    );
  }
}

export interface DevServerOptions {
  port?: number;
  rootPath?: string;
  dirName?: string;
}

export default DevServer;
