const fs = require("fs");   // 文件系统操作
const path = require("path");   // 处理路径
const parser = require("@babel/parser");    
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

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
    return moduleInfo;
}

/**
 * 获得依赖
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

const content = bundle("./index.js");

!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);



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
    require('${file}') // 引入入口
})(depsGraph)