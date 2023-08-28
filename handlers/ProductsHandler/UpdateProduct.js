const connectToDatabase = require('../../database/db')
const Product = require('../../models/ProductModel')


module.exports.updateProduct = async (event) => {

    try{

        const {productName, productPrice, productDescription, productCategory, imageBase64} = JSON.parse(event.body)

        await connectToDatabase()
        const productToUpdate = await Product.findOneAndUpdate(
            {
                _id: event.pathParameters.id
            },
            {
                $set: {
                    productName,
                    productPrice, 
                    productDescription, 
                    productCategory,
                    imageBase64
                }
            }
        )
        console.log(productToUpdate)
        return {
            statusCode: 200,
            headers : {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(productToUpdate)
        }
    }catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: "something went wrong"})
        }
    }
}