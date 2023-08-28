const connectToDatabase = require('../../database/db')
const Category = require('../../models/CategoryModel')


module.exports.createCategory = async (event) => {
    try{
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
        const newCategory = new Category({
            "categoryName": categoryName
        })

        
            await connectToDatabase()
            const category = await Category.create(newCategory)
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                body: JSON.stringify(category)
            }
        }catch(error) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {

                        message: "something went wrong",
                        error: error
                    }
                )
            }
        }
}