import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import StringOutputParser from "./parser";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const summaryWebContent = async (url: string) => {
  const systemTemplate = "This is Web Content: ```\n{webContent}\n```";
  const parser = new StringOutputParser();
  const model = new ChatOpenAI({
    model: "gpt-4o",
    configuration: {
      baseURL: process.env.OPENAI_BASE_PATH,
    },
  });

  const loader = new CheerioWebBaseLoader(url);

  const docs = await loader.load();

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);

  const messages = await promptTemplate.invoke({
    webContent: docs[0].pageContent,
    text: "请用中文进行总结。",
  });

  const chain = model.pipe(parser);

  const result = await chain.invoke(messages);

  console.log("result", result);
};

summaryWebContent("https://dify.ai/blog/dify-ai-workflow");
