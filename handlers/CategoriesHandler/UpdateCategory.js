const connectToDatabase =  require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.updateCategory = async (event) => {

    try{
        const userRole = event.requestContext.authorizer.claims['custom:role'];
        if (userRole !== 'admin') {
            return Responses._403({ message: 'Access denied. You must be an admin to perform this action.' });
        }
        await connectToDatabase();
        const { categoryName } = JSON.parse(event.body);

        if(!categoryName)
        {
           return Responses._400({message: 'All fields are required'});
        }
        if(!/^[a-zA-Z]+$/.test(categoryName)) {
            return Responses._400({message: 'Category name must be alphanumeric'});
        }
        const updateCategory = await models.Category.updateOne(
            {
                _id: event.pathParameters.id
            },{
                categoryName: categoryName
            }
        );
        return Responses._200({message: 'Category updated successfully', updateCategory});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};