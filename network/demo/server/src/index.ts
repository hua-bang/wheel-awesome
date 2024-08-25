import express from "express";
import { CacheMiddleware } from "../middware";

const app = express();

app.use(CacheMiddleware as any);

// 定义一个路由处理 GET 请求
app.get("/", (req, res) => {
  console.log("收到请求");
  res.send("Hello, Express!");
});

app.listen(3050);
