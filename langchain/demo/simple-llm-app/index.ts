import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const run = async () => {
  const model = new ChatOpenAI({
    model: "gpt-4o",
    configuration: {
      baseURL: process.env.OPENAI_BASE_PATH,
    },
  });

  const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
  ];

  const result = await model.invoke(messages);

  console.log("result", result);
};

run();
