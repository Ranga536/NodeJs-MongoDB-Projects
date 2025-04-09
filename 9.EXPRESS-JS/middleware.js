const express = require('express');

const app = express();

// const myFirstMiddleWare = (req, res, next) => {
//     console.log("this first middleware runs on every request");
//     next();
// }

const requestTimeStampLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    console.log(`${timeStamp} from {${req.method}} ${req.originalUrl}`);
    next();
}

app.use(requestTimeStampLogger);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/about', (req, res) => {
    res.send("About Page");
});

// app.use(myFirstMiddleWare);


app.listen(5001, () => {    
    console.log("Server is running on port 5001");
});