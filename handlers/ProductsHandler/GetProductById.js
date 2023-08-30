const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses')
module.exports.getProductById = async (event) => {
    try{
        await connectToDatabase();
        const product = await models.Product.findById(event.pathParameters.id);
        if(!product) {
            return Responses._404({message: 'Product not found'});
        }
        return Responses._200({product});
     }
    catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};