const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.updateProduct = async (event) => {

    try{
        const userRole = event.requestContext.authorizer.claims['custom:role'];
        if (userRole !== 'admin') {
            return Responses._403({ message: 'Access denied. You must be an admin to perform this action.' });
        }
        const {productName, productPrice, productDescription, productCategory, imageBase64} = JSON.parse(event.body);
        await connectToDatabase();
        const productToUpdate = await models.Product.findOneAndUpdate(
            {
                _id: event.pathParameters.id
            },
            {
                $set: {
                    productName,
                    productPrice,
                    productDescription,
                    productCategory,
                    imageBase64
                }
            }
        );
        console.log(productToUpdate);
        return Responses._200({message: 'Product updated successfully', productToUpdate});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};