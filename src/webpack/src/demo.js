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