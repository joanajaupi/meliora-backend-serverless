const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.getCustomerById = async (event) => {

    try{
        await connectToDatabase();
        const customer = await models.Customer.findById(event.pathParameters.id);
        if(!customer) {
            return Responses._404({message: 'Customer not found'});
        }
        return Responses._200({customer});
    }catch(error){
        return Responses._500({message: 'Something went wrong'});
    }
};