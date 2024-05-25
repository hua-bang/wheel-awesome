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
    new SystemMessage("Translate the following from English into Chinese."),
    new HumanMessage("Hey, what's your name? Where are you come from?"),
  ];

  const result = await model.invoke(messages);

  console.log("result", result);
};

run();
