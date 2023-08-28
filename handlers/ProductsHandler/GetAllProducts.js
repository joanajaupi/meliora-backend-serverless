const connectToDatabase = require('../../database/db')
const Product = require('../../models/ProductModel')


module.exports.getAllProducts = async (event) => {

    try{
        const queryString = event.queryStringParameters
        let skipValue = (queryString.page - 1) * 10
        await connectToDatabase()
        let totalDocuments = await Product.countDocuments()
        console.log(totalDocuments)
        totalPages = Math.ceil(totalDocuments / 10)
        console.log(totalPages)

        const products = await Product.find().skip(skipValue).limit(10)

        if(!products) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'No products found'
                })
            }
        }
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                products
            })
    }
}catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "something went wrong"
                }
            )
        }
    }

}
