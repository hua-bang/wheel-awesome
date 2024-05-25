import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import StringOutputParser from "./parser";

const run = async () => {
  const systemTemplate = "Translate the following into {language}:";
  const parser = new StringOutputParser();
  const model = new ChatOpenAI({
    model: "gpt-4o",
    configuration: {
      baseURL: process.env.OPENAI_BASE_PATH,
    },
  });

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);

  const messages = await promptTemplate.invoke({
    language: "italian",
    text: "Hey, where are you come from?",
  });

  const chain = model.pipe(parser);

  const result = await chain.invoke(messages);

  console.log("result", result);
};

run();
