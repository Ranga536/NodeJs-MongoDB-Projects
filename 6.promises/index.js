const { rejects } = require("assert");
const { log } = require("console");

function delayFunc(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}

console.log("Promise Lecture Starts");

delayFunc(2000).then(() => console.log("Delayed 2 seconds"));

console.log("Promise Lecture Ends");


function divideFunc(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            return reject("Can not divide by zero");
        }
        resolve(num1 / num2);
    })
}

divideFunc(10, 0).then((result) => console.log(result)).catch((err) => console.error(err));