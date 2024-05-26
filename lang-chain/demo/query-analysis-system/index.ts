import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getDocs } from "./get-docs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const run = async () => {
  const docs = await getDocs();

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });
  const chunkedDocs = await textSplitter.splitDocuments(docs);
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    configuration: {
      baseURL: process.env.OPENAI_BASE_PATH,
    },
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    chunkedDocs,
    embeddings
  );

  const searchResults = await vectorStore.similaritySearch(
    "how do I build a RAG agent"
  );
  console.log(searchResults[0].metadata.title);
  console.log(searchResults[0].pageContent.slice(0, 500));
};
run();
