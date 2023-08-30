const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.getCustomers = async (event) => {

    try{
        await connectToDatabase();
        const customers = await models.Customer.find();
        if(customers.length === 0){
            return Responses._404({message: 'No customers found'});
        }
        return Responses._200({customers});

    }catch(error){
        console.log(error);
        return Responses._500({message: 'Something went wrong'});
    }
};