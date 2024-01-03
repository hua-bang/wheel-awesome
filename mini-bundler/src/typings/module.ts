export interface Module {
  id: string;
  filePath: string;
  content: string;
  dependencies: string[];
  mapping?: Record<string, string>;
}
