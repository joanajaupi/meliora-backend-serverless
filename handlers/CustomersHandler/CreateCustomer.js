const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.createCustomer = async (event) => {

    try{
        const {name, email, phone, password} = JSON.parse(event.body);
        if(!name || !email || !phone || !password)
        {
            return Responses._400({message: 'All fields are required'});
        }
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
        await connectToDatabase();

        const newCustomer = new models.Customer({
            "name": name,
            "email": email,
            "phone": phone,
            "password": password
        });

        const customer = await models.Customer.create(newCustomer);
        return Responses._200({customer});
        }catch(error) {
            return Responses._500({message: 'Something went wrong'});
        }
};