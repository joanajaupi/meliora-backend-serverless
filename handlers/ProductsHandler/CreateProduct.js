const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.createProduct = async (event) => {

    const {productName, productDescription, productPrice, productCategory, imageBase64} = JSON.parse(event.body);
    try{
        await connectToDatabase();
        const category = await models.Category.findById(productCategory);
        if(!category) {
            return Responses._404({message: 'Category not found'});
        }
        if(!productName || !productDescription || !productPrice || !productCategory || !imageBase64) {
            return Responses._400({message: 'All fields are required'});
        }
        if(!/^[a-zA-Z0-9 ]+$/.test(productName)) {
            return Responses._400({message: 'Product name must be alphanumeric'});
        }
        if(!/^[a-zA-Z0-9 ]+$/.test(productDescription)) {
            return Responses._400({message: 'Product description must be alphanumeric'});
        }
        if(!/^[0-9]+$/.test(productPrice)) {
            return Responses._400({message: 'Product price must be numeric'});
        }
        
        const product = new models.Product({
            productName,
            productDescription,
            productPrice,
            productCategory,
            imageBase64
        });
        const newProduct = await models.Product.create(product);
        await models.Category.findOneAndUpdate(
            {_id: productCategory},
            {$push: {products: newProduct._id}},
            {new: true}
        );
        return Responses._200({message: 'Product created successfully', newProduct});
    }catch(error) {
        return Responses._500({message: 'Something went wrong'});
    }
};