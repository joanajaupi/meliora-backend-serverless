const connectToDatabase = require('../../database/db')
const Category = require('../../models/CategoryModel')
const Product = require('../../models/ProductModel')


module.exports.getCategoryById = async (event) => {
    try{
        await connectToDatabase()
        const category = await Category.findById(event.pathParameters.id).populate('products').exec()
        if(!category){
            return{
                statusCode: 404,
                body: JSON.stringify({message: 'Category not found'}),
            }
        }

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            statusCode: 200,
            body: JSON.stringify(category)
        }
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Something went wrong'}),
        }
    }
}