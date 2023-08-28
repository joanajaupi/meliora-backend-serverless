const connectToDatabase =  require('../../database/db')
const Customer = require('../../models/CustomerModel')


module.exports.deleteCustomer = async (event) => {

    try{
        await connectToDatabase()
        const id = event.pathParameters.id
        const customer = await Customer.findByIdAndRemove(id)
        if(!customer) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Customer not found'
                })
            }
        }
        //also remove products related to this customer.
        return {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Allow": "GET, OPTIONS, POST",
                "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
                "Access-Control-Allow-Headers": "*"
            },
            statusCode: 200,
            body: JSON.stringify({
                message:`Customer with id: ${id} deleted successfully`,
                customer
            }) 
        }
    }catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    message: "something went wrong"
                }
            )
        }
    }
}
