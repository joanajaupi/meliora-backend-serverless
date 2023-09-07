const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.createCategory = async (event) => {
    try{
        const userRole = event.requestContext.authorizer.claims['custom:role'];
        if (userRole !== 'admin') {
            return Responses._403({ message: 'Access denied. You must be an admin to perform this action.' });
        }
        const { categoryName } = JSON.parse(event.body);
        if(!categoryName){
            return Responses._400({message: 'All fields are required'});
        }
        if(!/^[a-zA-Z]+$/.test(categoryName)) {
            return Responses._400({message: 'Category name must be alphanumeric'});
        }
        const newCategory = new models.Category({
            "categoryName": categoryName
        });

            await connectToDatabase();
            const category = await models.Category.create(newCategory);
            return Responses._200({category});
        }catch(error) {
            return Responses._500({message: 'Something went wrong'});
        }
};