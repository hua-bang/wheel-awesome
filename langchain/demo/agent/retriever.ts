import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createRetrieverTool } from "langchain/tools/retriever";

export const getRetriever = async () => {
  const loader = new CheerioWebBaseLoader(
    "https://blog-one-jet-81.vercel.app/me/"
  );
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await splitter.splitDocuments(rawDocs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      configuration: {
        baseURL: process.env.OPENAI_BASE_PATH,
      },
    })
  );
  const retriever = vectorstore.asRetriever();

  return retriever;
};

export const getRetrieverTool = async () => {
  const retriever = await getRetriever();
  const retrieverTool = createRetrieverTool(retriever, {
    name: "hua_hua_search",
    description:
      "Search for information about 华铧. For any questions about 华铧, you must use this tool!",
  });

  return retrieverTool;
};

const run = async () => {
  const retriever = await getRetriever();

  const retrieverResult = await retriever.getRelevantDocuments(
    "你知道 华铧么?"
  );
  console.log(retrieverResult[0]);
};

run();
