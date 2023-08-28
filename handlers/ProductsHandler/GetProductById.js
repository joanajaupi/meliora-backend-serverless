const connectToDatabase = require('../../database/db')
const Product = require('../../models/ProductModel')


module.exports.getProductById = async (event) => {

    try{

        await connectToDatabase()
        const product = await Product.findById(event.pathParameters.id)

        if(!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Product not found'
                })
            }
        }

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(product)
        }
    } 
    catch(error) {
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