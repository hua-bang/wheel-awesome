const path = require('path');

const entry = [path.resolve(__dirname, './index.js'), path.resolve(__dirname, './b.js')];

module.exports = {
  entry,
}