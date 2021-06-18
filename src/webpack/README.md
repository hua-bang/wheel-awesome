## 手写简单的webpack

参考来源： [做了一夜动画，让大家十分钟搞懂Webpack](https://juejin.cn/post/6961961165656326152)

感谢[全栈然叔](https://juejin.cn/user/1978776660216136)

### 说明

1. 本文仅是一个简单的小示例。
2. 实现的结果webpack只打包js文件
3. 文章基于 [做了一夜动画，让大家十分钟搞懂Webpack](https://juejin.cn/post/6961961165656326152)，再次感谢然叔。

### 一、什么是webpack

官网：https://webpack.docschina.org/

webpack是基于Javascript的静态资源打包工具，宗旨：一切静态资源皆可打包。

![image-20210618103436985](.\image-20210618103436985.png)

### 二、原理分析

这里我们来举一个例子。

有两个Js模块（暂时不考虑这两个模块所遵循的语法和规范）。

**目的**：将两个模块打包为一个可以加游览器上运行的文件，这个文件相当于webpack中的bundle.js

比如

```js
// index.js
var hello = require("./hello.js").default;
console.log(hello());

// hello.js
exports.default = function() {
    console.log("hello, world")
};
```

游览器中执行代码会有问题，因为这是使用的**exports**和**require**都是基于**node**环境下的，游览器并不支持。

所以我们需要模拟**exports**对象和**require**对象

1. **模拟exports对象**

   首先我们知道弄得nodejs打包的时候我们会使用fs.readfileSync()读取文件，这样的话js文件时一个字符串。运行有Function和eval两种方法。

   这里我们选择eval

   ```js
   var exports = {};
   eval("exports.default = function(a, b) {return a + b}");
   export.default(1, 3)
   ```

   ![image-20210618111525401](.\image-20210618111525401.png)

   上面这段代码运行结果可以将模块中的方法绑定到exports对象中，为了不务扰全局我们使用一个自执行函数来封装。

   ```js
   let exports = {};
   (function(exports, code) {
       eval(code)
   })(exports, `exports.default = function(a, b) { return a + b }`)
   ```

   ![image-20210618111829240](.\image-20210618111829240.png)

2. **模拟require函数**

   **目的**：require函数功能，根据提供的文件名来加载对应的模块

   **实现功能**，我们进行一个拆分。

   首先，我们先看看单个固定模块(这里编写的时伪代码，便于开发，后面将使用文件读取)

   ```js
   function require(file) {
       let exports = {};
       (function(exports, code) {
           eval(code)
       })(exports, `exports.default = function(a, b) { return a + b }`)
       return exports;
   }
   
   var add = require("add.js").default;
   console.log(add(1,2));
   ```

   ![image-20210618112623276](.\image-20210618112623276.png)

   模拟多个文件的加载，使用一张key-value的表来加载不同的代码模块。

   ```js
   (function(list) {
       function require(file) {
           let exports = {};
           (function(exports, code) {
               eval(code)
           })(exports, list[file])
           return exports;
       }
       require("index.js");
   })({
       "index.js": `
           var add = require('add.js').default;
           console.log(add(1, 2));
       `,
       "add.js": `exports.default = function(a, b) {
           return a + b ;
       }`
   });
   ```

   ![image-20210618113532583](.\image-20210618113532583.png)

   理解webpack生成的bundle.js文件还需要增加模块间的依赖关系

   即依赖图（Dependency Graph）;

   类似下方

   ```js
   {
       "./src/index.js": {
           "dep": {
               "./add.js": "./src/add.js"
           },
           "code": "..."    
       },
       "./src/add.js": {
           "deps": {},
           "code": "......"
       }
   }
   ```

   同时，注意你是否需要将ES6转成ES5

   **webpack打包三个步骤**

   1. 分析依赖
   2. ES6转成ES5
   3. 替换exports和require

### 三、功能实现

目标：将两个互相依赖的ES6Module打包成一个可以在游览器运行的js文件。

- 处理模块化
- 多模块合并打包-优化网络请求

1. **分析模块**

   分析模块分成三步骤：

   转成AST抽象语法树，我们借助babel/parser来完成

   > AST （Abstract Syntax Tree）抽象语法树 在计算机科学中，或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。（ [astexplorer.net/）](https://astexplorer.net/）)

   依赖安装

   ```bash
   yarn add @babel/parser
   yarn add @babel/traverse
   yarn add @babel/core
   yarn add @babel/preset-env
   ```

   - 读取文件
   - 收集依赖
   - 编译与AST解析

   ```js
   /**
    * 读取file 输出依赖图
    * @param {*} file 
    * @return {file,deps,code} 
    */
   function getModuleInfo(file) {
       // 同步读取文件数据
       const body = fs.readFileSync(file, "utf8");
   
       // 转化AST语法树
       const ast = parser.parse(body, {
           sourceType: "module"    //表示解析的是ES模块
       });
   
       // 依赖收集
       const deps = {};
       traverse(ast, {
           ImportDeclaration({node}) {
               const dirname = path.dirname(file);
               const abspath = "./" + path.join(dirname, node.source.value);
               deps[node.source.value] = abspath;
           }
       });
   
       // es6 -> es5
       const { code } = babel.transformFromAst(ast, null, {
           presets: ["@babel/preset-env"]
       });
   
       const moduleInfo = {
           file,
           deps,
           code
       };
       console.log(moduleInfo);
       return moduleInfo;
   }
   ```

   ![image-20210618144244876](.\image-20210618144244876.png)

2. **收集依赖**

   上一步开发的函数可以单独解析某一个模块，这一步我们需要开发一个函数从入口模块开始根据依赖关系进行递归解析。最后将依赖关系构成为依赖图（Dependency Graph）

   ```js
   /**
    * 递归获得依赖
    * @param {*} temp 
    * @param {*} {deps} 
    */
   function getDeps(temp, { deps }) {
       Object.keys(deps)
       .forEach((key) => {
           const child = getModuleInfo(deps[key]);
           temp.push(child);
           getDeps(temp, child);
       })
   }
   
   /**
    * 从入口文件进去得到所有的依赖，形成依赖图
    * @param {*} file 
    * @returns depsGraph 依赖图
    */
   function parseModules(file) {
       const entry = getModuleInfo(file);
       const temp = [entry];
       const depsGraph = {};
   
       getDeps(temp, entry);
   
       temp.forEach((moduleInfo) => {
           depsGraph[moduleInfo.file] = {
               deps: moduleInfo.deps,
               code: moduleInfo.code
           }
       })
   
       return depsGraph;
   }
   ```

   递归生成以下的依赖结构

   ```js
   {
       "./index.js": {
           deps: {
               "./xxx.js": "./xxx.js"
           },
           code: `code`
       }
   }
   ```

   

   ![image-20210618145752862](.\image-20210618145752862.png)

3. **生成bundle文件**

   最终将编写的执行函数和依赖图合成起来输出最后的打包文件。

   ```js
   /**
    * 根据文件依赖 生成最终的脚本
    * @param {*} file 
    * @returns content
    */
   function bundle(file) {
       // 得到依赖图并转成字符串
       const depsGraph = JSON.stringify(parseModules(file));
       
       // 模板字符串载入
       return `(function(graph) {
           function require(file) {
               function absRequire(realPath) {
                   return require(graph[file].deps[realPath])
               }
               var exports = {};
               (function(require, exports, code) {
                   eval(code)
               })(absRequire, exports, graph[file].code)  // es6 -> es5后 import和export和对应变成require和exports 游览器没有对应的require函数, 所以编写require函数传递
               return exports;
           }
           require('${file}') // 引入入口
       })(${depsGraph})`;
   }
   ```

   最终效果

   ![image-20210618151919315](.\image-20210618151919315.png)

   **1.分析自执行函数graph**

   ```js
   (function(graph) {
       function require() {
           // code
       }
       require($file);	//这里的file是对应这上面的参数，即入口文件
   })(depsGraph)
   ```

   **2.分析require函数**

   ```js
   // 得到的是每个文件所导出的值
   function require(file) {
       // 用实际的路径引入，因为其他的文件采用的是相对路径，我们需要找到他的依赖，然后确定相对与主文件的定位
       function absRequire(realPath) {
           return require(graph[file].deps[realPath])
       }
       // 定义exports的变量，注意这里的export每经过一个导出的模块都会导出export
       var exports = {};
       // 这里面传入了require和exports 再用eval()运行
       (function(require, exports, code) {
           eval(code)
       })(absRequire, exports, graph[file].code)  // es6 -> es5后 import和export和对应变成require和exports 游览器没有对应的require函数, 所以编写require函数传递
       return exports;
   }
   ```

   **流程**：

   - 生成一个依赖图并转化成字符串

   - 导入模板字符串中，以依赖图作为参数

   - 函数模板字符串中便是一串js代码。

   - 分析得到的js代码

     - 代码示例

       ```js
       (function(graph) {
               function require(file) {
                   function absRequire(realPath) {
                       return require(graph[file].deps[realPath])
                   }
                   var exports = {};
                   (function(require, exports, code) {
                       eval(code)
                   })(absRequire, exports, graph[file].code)  // es6 -> es5后 import和export和对应变成require和exports 游览器没有对应的require函数, 所以编写require函数传递
                   return exports;
               }
               require('./index.js') // 引入入口
           })({"./index.js":{"deps":{"./add.js":"./add.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(9, 19));"},"./add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"}})
       ```

     - 实质上是一个我们自己编写的自执行函数,首先会先调用require("入口js文件");即"index.js";

     - 同时，我们知道依赖图就是其中的参数

     - 我们以上方的例子分析

       - 自动执行函数启动，即require("./index.js")

       - 此时，我们执行require中的自执行函数，即将**absRequire**(获取绝对路径的函数，并用require函数返回值的函数), **graph["index.js"].code**传入，同时将exports变量传入。

         ![image-20210618160427269](.\image-20210618160427269.png)

       - 接着这里执行index的代码，其中包含有一句require("./add.js")，所以此时的require并非上面的require，而是我们传入的absRequire(为了使用绝对路径引入)

       - 同理，这里将add.js引入，add中导出会使用到变量exports

       - 每次在加载其他模块的时候，代码中的exports是不会变的，故即使exports.default的值会随着导入文件的不同而改变也无事。

       - 得到变量后，就可以运行相关的代码。

   **3.测试效果**

   ```js
   const content = bundle("./index.js");
   !fs.existsSync("./dist") && fs.mkdirSync("./dist");
   fs.writeFileSync("./dist/bundle.js", content);
   ```

   下图是效果

   ![image-20210618155114024](.\image-20210618155114024.png)

   ![image-20210618155127356](.\image-20210618155127356.png)

   ![image-20210618155252779](.\image-20210618155252779.png)

本文是基于然叔的 [做了一夜动画，让大家十分钟搞懂Webpack](https://juejin.cn/post/6961961165656326152)文章，以上仅是本人的一些理解

同时，在此再次感谢然叔。