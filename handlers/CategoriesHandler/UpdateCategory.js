const connectToDatabase =  require('../../database/db')
const Category = require('../../models/CategoryModel')


module.exports.updateCategory = async (event) => {

    try{
        await connectToDatabase()
        const { categoryName } = JSON.parse(event.body);

        if(!categoryName)
        {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Category name is required'
                })

            }
        }
        if(!/^[a-zA-Z0-9 ]+$/.test(categoryName)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Category name must be alphanumeric'
                })
            }
        }
        const updateCategory = await Category.updateOne(
            {
                _id: event.pathParameters.id
            }, 
            {
                categoryName: categoryName
            }
        )
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify(updateCategory)

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