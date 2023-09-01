const connectToDatabase =  require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.deleteCategory = async (event) => {

    try{
        await connectToDatabase();
        const id = event.pathParameters.id;
        const category = await models.Category.findByIdAndRemove(id);
        if(!category) {
            return Responses._404({message: `Category with id: ${id} not found`})
        }
        //also remove products related to this category.
        await models.Product.deleteMany({productCategory: id});


        return Responses._200({message:`Category with id: ${id} deleted successfully`, category});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};
