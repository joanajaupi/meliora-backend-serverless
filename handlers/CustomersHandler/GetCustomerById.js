const connectToDatabase = require('../../database/db')
const Customer = require('../../models/CustomerModel')

module.exports.getCustomerById = async (event) => {

    try{

        await connectToDatabase()
        const customer = await Customer.findById(event.pathParameters.id)
        if(!customer) {
            return {
                statusCode: 404,
                body: JSON.stringify({message: "user not found"})
            }
        }
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify(customer)
        }
    }catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify({message: "something went wrong"})
        }
    }
}