const express = require('express');
const app = express();

//application level settings
app.set('appName', 'My Express App');
app.set('view engine', 'ejs');

//routing
app.get('/', (req, res) => {
    res.send("Hello World");
})

app.post('api/data', (req, res) => {
    res.json({name: "Ranga", location: "India", message: "Data Received", data : req.body});
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})