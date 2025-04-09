const products = require("../data/products");

const resolvers = {
    Query : {
        products: () => products,
        product: (_, {id}) => products.find((item) => item.id === id)
    },
    Mutation : {
        createProduct : (_, {title, category, price, inStock}) => {
            const newlyCreatedProduct = {
                id : String(products.length + 1),
                title,
                category,
                price,
                inStock
                        }
            products.push(newlyCreatedProduct);
            return newlyCreatedProduct;
        }

    }
}


module.exports = resolvers;