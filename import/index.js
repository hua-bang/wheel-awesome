const { sub: sub2, obj: obj1 } = require('./add');
const { sub, obj } = require('./sub');

console.log(sub === sub2, obj1 === obj)