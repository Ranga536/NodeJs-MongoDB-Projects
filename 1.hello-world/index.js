const arthmetic_ops = require("./arthmetic-ops.js")

const {sum, sub, mult, divide} = arthmetic_ops;

// console.log("Hello Node JS");

// setTimeout(() => {
//     console.log("This Msg 2 seconds late");
// }, 2000);

// console.log("This is the last line of sync code");

console.log(sum(2,4));
console.log(sub(2,4));
console.log(mult(2,4));
console.log(divide(2,4));


//Module Wrapper - it is like a function stores all the modules and thier file and dir location

console.log('file_name', __filename);
console.log('dir_name', __dirname);