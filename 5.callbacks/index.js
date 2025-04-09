
const fs = require('fs');

function person(name, callbackFn) {
    console.log(name);
    callbackFn();
}

function address() {
    console.log("India");
}

person("Ranga", address);

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});