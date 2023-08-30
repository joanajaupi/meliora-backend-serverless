const connectToDatabase =  require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.deleteCustomer = async (event) => {

    try{
        await connectToDatabase();
        const id = event.pathParameters.id;
        const customer = await models.Customer.findByIdAndRemove(id);
        if(!customer) {
            return Responses._404({message: `Customer with id: ${id} not found`})
        }
        return Responses._200({message:`Customer with id: ${id} deleted successfully`, customer});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};
