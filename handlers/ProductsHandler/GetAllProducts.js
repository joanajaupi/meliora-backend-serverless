const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.getAllProducts = async (event) => {

    try{
        const queryString = event.queryStringParameters;
        let skipValue = (queryString.page - 1) * 9;
        await connectToDatabase();
        let totalDocuments = await models.Product.countDocuments();
        console.log(totalDocuments);
        const products = await models.Product.find().skip(skipValue).limit(9).populate('productCategory').exec();
        if(!products) {
            return Responses._404({message: 'No products found'});
        }
        return Responses._200({products, totalDocuments});
        
    }catch (error) {
        return Responses._500({message: 'Something went wrong'});
    }
};
