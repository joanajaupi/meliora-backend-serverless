const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');

module.exports.createCategory = async (event) => {
    try{
    const { categoryName } = JSON.parse(event.body);
        if(!categoryName){
            return Responses._400({message: 'All fields are required'});
        }
        if(!/^[a-zA-Z0-9 ]+$/.test(categoryName)) {
            return Responses._400({message: 'Category name must be alphanumeric'});
        }
        const newCategory = new models.Category({
            "categoryName": categoryName
        });

            await connectToDatabase();
            const category = await models.Category.create(newCategory);
            return Responses._200({category});
        }catch(error) {
            return Responses._500({message: 'Something went wrong'});
        }
};