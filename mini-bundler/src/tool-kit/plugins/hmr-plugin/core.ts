import { WebSocketServer } from "ws";
import Context from "../../../core/context";

export const runHMR = (context: Context) => {
  const wss = new WebSocketServer({ port: 3069 });

  wss.on("connection", (ws) => {
    // 当 WebSocket 断开连接时，停止监视

    context.compiler.hooks.bundleComplete.tap("devServer", () => {
      const data = {
        type: "update",
      };

      ws.send(JSON.stringify(data));
    });
  });
};

export interface RunHMROptions {
  entry: string;
}
