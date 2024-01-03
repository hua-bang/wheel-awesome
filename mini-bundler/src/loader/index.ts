import * as path from "path";
export type Loader = (content: string, filePath: string) => string;

export const applyLoaders = (
  content: string,
  filePath: string,
  loaderMap: Record<string, Loader[]>
): string => {
  const extension = path.extname(filePath);
  const loaders = loaderMap[extension] || [];
  return loaders.reduce(
    (content, loader) => loader(content, filePath),
    content
  );
};
