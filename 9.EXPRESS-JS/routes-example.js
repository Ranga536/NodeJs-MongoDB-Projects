const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("welcome to our homepage");
})

//get all products
app.get('/products', (req, res) => {
    const products = [
        {id: 1, name: "laptop", price: 1000},
        {id: 2, name: "mobile", price: 500},
        {id: 3, name: "camera", price: 600}
    ]
    res.json(products);
})

//get a single product by id 
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const products = [
        {id: 1, name: "laptop", price: 1000},
        {id: 2, name: "mobile", price: 500},
        {id: 3, name: "camera", price: 600}
    ]
    
    const getSingleProduct = products.find((product) => product.id === parseInt(id));
    if (getSingleProduct) {
        res.send(getSingleProduct)
    } else {
        res.status(404).send("product not found, please try again later");
    }
})

const port = 5001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});