const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.updateCustomer = async (event) => {

    try{
        await connectToDatabase();
        const {name, email, phone, password} = JSON.parse(event.body);
        if(!/^[a-zA-Z]+$/.test(name)) {
            return Responses._400({message: 'Name must be alphanumeric'});
        }
        if(!/^[a-zA-Z0-9]+$/.test(password) || password.length < 8) {
            return Responses._400({message: 'Invalid password format or length'});
        }
        if(!/^[0-9]+$/.test(phone) || phone.length != 10) {
            return Responses._400({message: 'Invalid phone number'});
        }
        if(!/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/.test(email)) {
            return Responses._400({message: 'Invalid email format'});
        }
        console.log(name, email, phone, password);
        const updatedCusomer = await models.Customer.findOneAndUpdate(
            {
                _id: event.pathParameters.id
            },
            {
                $set: {
                    name,
                    email,
                    phone,
                    password
                }
            }
        );

        return Responses._200({updatedCusomer});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});

    }
};