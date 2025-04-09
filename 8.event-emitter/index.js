const eventEmitter = require('events');

const myFIrstEmitter = new eventEmitter();

//register a listener
myFIrstEmitter.on('greet', (name) => {
    console.log(`Hello ${name}`);
})

//emit an event
myFIrstEmitter.emit('greet', 'Ranga');