import { Runnable } from "@langchain/core/runnables";
import { AIMessageChunk } from "@langchain/core/messages";

class StringOutputParser extends Runnable<AIMessageChunk, string> {
  lc_namespace = ["StringOutputParser"];

  invoke(input: AIMessageChunk): Promise<string> {
    const res =
      typeof input.content === "string"
        ? input.content
        : JSON.stringify(input.content);

    return Promise.resolve(res);
  }
}

export default StringOutputParser;
