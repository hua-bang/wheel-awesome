let num = 1234567.89;
let formattedNum = num.toLocaleString();
console.log(formattedNum); // 输出可能是 "1,234,567.89"

let num = 1234567.89;
let formattedNum = num.toLocaleString("en-US");
console.log(formattedNum); // 输出 "1,234,567.89"
