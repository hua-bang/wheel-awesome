import { Loader } from "../../src/loader";

export const cssLoader: Loader = (content, filePath) => {
  const escaped = content.replace(/\n/g, '').replace(/"/g, '\\"');
  return `const style = document.createElement('style');
          style.innerText = "${escaped}";
          document.head.appendChild(style);`;
};