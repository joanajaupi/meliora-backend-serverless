const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.getCategoryById = async (event) => {
    try{
        await connectToDatabase();
        const category = await models.Category.findById(event.pathParameters.id).populate('products').exec();
        if(!category){
            return Responses._404({message: 'Category not found'});
        }

        return Responses._200({category});
    }catch(error){
        console.log(error);
        return Responses._500({message: 'Something went wrong'});
    }
};