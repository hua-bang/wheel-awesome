import { DocumentInterface } from "@langchain/core/documents";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { getYear } from "date-fns";

export const getDocs = async () => {
  const urls = [
    "https://www.youtube.com/watch?v=HAn9vnJy6S4",
    "https://www.youtube.com/watch?v=dA1cHGACXCo",
    "https://www.youtube.com/watch?v=ZcEMLz27sL4",
    "https://www.youtube.com/watch?v=hvAPnpSfSGo",
    "https://www.youtube.com/watch?v=EhlPDL4QrWY",
    "https://www.youtube.com/watch?v=mmBo8nlu2j0",
    "https://www.youtube.com/watch?v=rQdibOsL1ps",
    "https://www.youtube.com/watch?v=28lC4fqukoc",
    "https://www.youtube.com/watch?v=es-9MgxB-uc",
    "https://www.youtube.com/watch?v=wLRHwKuKvOE",
    "https://www.youtube.com/watch?v=ObIltMaRJvY",
    "https://www.youtube.com/watch?v=DjuXACWYkkU",
    "https://www.youtube.com/watch?v=o7C9ld6Ln-M",
  ];

  let docs: Array<DocumentInterface> = [];

  for await (const url of urls) {
    const doc = await YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    }).load();
    docs = docs.concat(doc);
  }

  // Add some additional metadata: what year the video was published
  // The JS API does not provide publish date, so we can use a
  // hardcoded array with the dates instead.
  const dates = [
    new Date("Jan 31, 2024"),
    new Date("Jan 26, 2024"),
    new Date("Jan 24, 2024"),
    new Date("Jan 23, 2024"),
    new Date("Jan 16, 2024"),
    new Date("Jan 5, 2024"),
    new Date("Jan 2, 2024"),
    new Date("Dec 20, 2023"),
    new Date("Dec 19, 2023"),
    new Date("Nov 27, 2023"),
    new Date("Nov 22, 2023"),
    new Date("Nov 16, 2023"),
    new Date("Nov 2, 2023"),
  ];
  docs.forEach((doc, idx) => {
    // eslint-disable-next-line no-param-reassign
    doc.metadata.publish_year = getYear(dates[idx]);
    // eslint-disable-next-line no-param-reassign
    doc.metadata.publish_date = dates[idx];
  });

  // Here are the titles of the videos we've loaded:
  return docs;
};
