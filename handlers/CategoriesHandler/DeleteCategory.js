const connectToDatabase =  require('../../database/db')
const Category = require('../../models/CategoryModel')


module.exports.deleteCategory = async (event) => {

    try{

        await connectToDatabase()
        const id = event.pathParameters.id
        const category = await Category.findByIdAndRemove(id)
        if(!category) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Category not found'
                })
            }
        }
        //also remove products related to this category.
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                message:`Category with id: ${id} deleted successfully`,
                category
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
