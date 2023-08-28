const customerModel = require('../../models/CustomerModel');
const connectToDatabase = require('../../database/db')


module.exports.getCustomers = async (event) => {

    try{
        await connectToDatabase()
        const customers = await customerModel.find();
        if(customers.length === 0){
            return{
                statusCode: 404,
                body: JSON.stringify({message: 'No customers found'}),
            }
        }

        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",

            },
            statusCode: 200,
            body: JSON.stringify(customers)
        }

    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        }
    }
}