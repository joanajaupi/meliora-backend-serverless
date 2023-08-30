const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
module.exports.deleteProduct = async (event) => {
    try{
        await connectToDatabase();
        const id = event.pathParameters.id;
        const product = await models.Product.findByIdAndDelete(id);
        const categoryId = product.productCategory;
        await models.Category.findOneAndUpdate(
            {_id: categoryId},
            {$pull: {products: id}},
            {new: true}
        );
        if(!product) {
            return Responses._404({message: `Product with id: ${id} not found`})
        }
        return Responses._200({message:`Product with id: ${id} deleted successfully`, product});
        }catch(error) {
            return Responses._500({message: 'Something went wrong'});
        }
};