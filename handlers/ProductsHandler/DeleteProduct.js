const connectToDatabase = require('../../database/db')
const Product = require('../../models/ProductModel')
const Category = require('../../models/CategoryModel')

module.exports.deleteProduct = async (event) => {

    	try{

            await connectToDatabase()
            const id = event.pathParameters.id
            const product = await Product.findByIdAndDelete(id)
            const categoryId = product.productCategory
            const updateCategory = await Category.findOneAndUpdate(
                {_id: categoryId},
                {$pull: {products: id}},
                {new: true}
            )
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
                    "Access-Control-Allow-Headers": "*"
                },
                statusCode: 200,
                body: JSON.stringify({
                    message:`Product with id: ${id} deleted successfully`,
                    product
                })
        }
    }catch(error) {
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