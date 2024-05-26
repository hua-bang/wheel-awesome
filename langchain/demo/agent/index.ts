import "dotenv/config";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { Calculator } from "@langchain/community/tools/calculator";

import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";
import { getRetrieverTool } from "./retriever";

const runAgent = async () => {
  const retrieverTool = await getRetrieverTool();
  const searchTool = new TavilySearchResults();
  const calculatorTool = new Calculator();
  const tools = [searchTool, calculatorTool, retrieverTool];

  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    configuration: {
      baseURL: process.env.OPENAI_BASE_PATH,
    },
  });

  const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent"
  );

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const result1 = await agentExecutor.invoke({
    input: "Do you know 华铧?",
  });

  console.log(result1);
};

runAgent();
