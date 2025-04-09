const EventEmitter = require('events')

class MyCustomEmitter extends EventEmitter {
    constructor(){
        super();
        this.greeting = "Hi";
    }

    greet(name) {
        this.emit('greeting', `${this.greeting}, ${name}`)
    }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on('greeting', (input) => {
    console.log('Greeting Event: ', input)
});

myCustomEmitter.greet("Ranga");