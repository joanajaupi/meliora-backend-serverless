const Customer = require('../../models/CustomerModel');
const connectToDatabase = require('../../database/db')


module.exports.createCustomer = async (event) => {

    try{
        const {name, email, phone, password} = JSON.parse(event.body);
        if(!name || !email || !phone || !password)
        {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'All fields are required'
                })

            }
        }

        await connectToDatabase()

        const newCustomer = new Customer({
            "name": name,
            "email": email,
            "phone": phone,
            "password": password
        })

        const customer = await Customer.create(newCustomer)
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "*"
            },
            body: JSON.stringify(customer)
        }
        }catch(error) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {

                        message: "something went wrong",
                        error: error
                    }
                )
            }
        }

    }