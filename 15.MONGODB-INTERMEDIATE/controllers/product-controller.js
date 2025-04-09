const Product = require("../models/Product");

const getProductStats = async(req, res) => {
    try{
        const result = await Product.aggregate([
            {
                //stage1
                $match : {
                    inStock : true,
                    price : {
                        $gte: 100
                    }
                }
            },
            //stage2 : group documents 
            {
                $group: {
                    _id:"$category",
                    avgPrice : {
                        $avg :"$price"
                    }, 
                    count :{
                        $sum : 1,
                    }
                }
            }
        ])

        res.status(200).json({
            success : true,
            data : result
        })
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const getProductAnalysis = async(req, res) => {
    try{

        const result = await Product.aggregate([
            {
                $match : {
                    category : 'Electronics'
                }
            },
            {
                $group : {
                    _id : null,
                    totalRevenue : {
                        $sum : "$price"
                    },
                    avgPrice : {
                        $avg : "$price"
                    },
                    maxProductPrice : {
                        $max : "$price"
                    },
                    minProductPrice : {
                        $min : "$price"
                    }
                },
            },
            {
                $project: {
                    _id : 0,
                    totalRevenue : 1,
                    maxProductPrice : 1,
                    minProductPrice : 1,
                    priceRange : {
                        $subtract : ["$maxProductPrice", "$minProductPrice"]
                    }
                }
            }
        ])

        res.status(200).json({
            success: true,
            data: result
        })

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const insertSampleProducts = async(req, res) => {
    try {

        const sampleProducts = [{}];

        const result = await Product.insertMany(sampleProducts);

        res.status(201).json({
            success: true,
            data : `inserted ${result.length} sample products`
        })

    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

module.exports = {insertSampleProducts, getProductStats, getProductAnalysis};