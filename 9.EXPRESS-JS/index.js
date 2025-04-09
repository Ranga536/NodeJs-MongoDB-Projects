const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
})

const port = 5001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});