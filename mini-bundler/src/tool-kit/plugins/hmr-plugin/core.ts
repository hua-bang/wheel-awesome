import * as fs from "fs";
import { WebSocketServer } from "ws";
import Context from "../../../core/context";

const listenFSFileChange = (entry: string, context: Context) => {
  return fs.watch(entry, { recursive: true }, (eventType, filename) => {
    if (filename) {
      context.compiler.hooks.fileUpdate.call();
    }
  });
};

export const runHMR = (options: RunHMROptions, context: Context) => {
  const { entry } = options;

  const wss = new WebSocketServer({ port: 3069 });
  console.log("begin");

  wss.on("connection", (ws) => {
    // 当文件更改时，发送消息给客户端
    const watcher = listenFSFileChange(entry, context);
    // 当 WebSocket 断开连接时，停止监视

    context.compiler.hooks.bundleComplete.tap("devServer", () => {
      const data = {
        type: "update",
      };

      ws.send(JSON.stringify(data));
    });

    ws.on("close", () => {
      watcher.close();
    });
  });
};

export interface RunHMROptions {
  entry: string;
}
