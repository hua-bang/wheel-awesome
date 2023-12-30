import * as fs from 'fs';
import * as path from 'path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

interface Module {
  id: string;
  filePath: string;
  content: string;
  dependencies: string[];
}

function createModule(filePath: string): Module {
  const content = fs.readFileSync(filePath, 'utf-8');

  const dependencies: string[] = [];

  const ast = parser.parse(content, {
    sourceType: 'module',
  });

  traverse(ast, {
    ImportDeclaration({ node }) {
      dependencies.push(node.source.value);
    }
  });

  return {
    id: path.resolve(filePath),
    filePath,
    content,
    dependencies
  };
}

const currModule = createModule('./index.js');

console.log(currModule);