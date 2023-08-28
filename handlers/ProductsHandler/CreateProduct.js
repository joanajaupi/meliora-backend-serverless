const connectToDatabase = require('../../database/db')
const Product = require('../../models/ProductModel')
const Category = require('../../models/CategoryModel')


module.exports.createProduct = async (event) => {

    const {productName, productDescription, productPrice, productCategory, imageBase64} = JSON.parse(event.body)
    try{
        await connectToDatabase()
        const category = await Category.findById(productCategory)
        if(!category) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Category not found'
                })
            }
        }
        const product = new Product({
            productName,
            productDescription,
            productPrice,
            productCategory,
            imageBase64
        })
        const newProduct = await Product.create(product)
        const categoryProducts = await Category.findOneAndUpdate(
            {_id: productCategory},
            {$push: {products: newProduct._id}},
            {new: true}
        )
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(newProduct)
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