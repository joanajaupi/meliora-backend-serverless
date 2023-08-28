const connectToDatabase = require('../../database/db')
const Category = require('../../models/CategoryModel')
const Product = require('../../models/ProductModel')


module.exports.getCategories = async (event) => {
    try{
        await connectToDatabase()
        const categories = await Category.find().populate('products').exec();
        if(categories.length === 0){
            return{
                statusCode: 404,
                body: JSON.stringify({message: 'No categories found'}),
            }
        }

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",

            },
            statusCode: 200,
            body: JSON.stringify(categories)
        }

    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
}