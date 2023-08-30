const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.getCategories = async (event) => {
    try{
        await connectToDatabase();
        const categories = await models.Category.find().populate('products').exec();
        if(categories.length === 0){
            return Responses._404({message: 'No categories found'});
        }

        return Responses._200({categories}); 

    }catch(error){
        console.log(error);
        return Responses._500({message: 'Something went wrong'});
    }
};