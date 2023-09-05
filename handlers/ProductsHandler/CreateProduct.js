const connectToDatabase = require('../../database/db');
const models = require('../../models/models');
const Responses = require('../../API_Responses');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.createProduct = async (event) => {

    const {productName, productDescription, productPrice, productCategory, imageData} = JSON.parse(event.body);
    try{
        await connectToDatabase();
        const category = await models.Category.findById(productCategory);
        if(!category) {
            return Responses._404({message: 'Category not found'});
        }
        if(!productName || !productDescription || !productPrice || !productCategory || !imageData) {
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
        if(productPrice < 0) {
            return Responses._400({message: 'Product price must be positive'});
        }
        if(!imageData.startsWith('data:image/jpeg;base64,')) {
            return Responses._400({message: 'Invalid image format'});
        }

        const uploadParams = {
            Bucket: 'meliora-images-bucket',
            Key: `${Date.now()}.jpg`, // Customize the key as needed
            Body: Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
          };
          console.log(uploadParams);
          await s3.upload(uploadParams).promise();
          const image = `https://meliora-images-bucket.s3.amazonaws.com/${uploadParams.Key}`;

       
        const product = new models.Product({
            productName,
            productDescription,
            productPrice,
            productCategory,
            imageLink: image
        });
        const newProduct = await models.Product.create(product);
        await models.Category.findOneAndUpdate(
            {_id: productCategory},
            {$push: {products: newProduct._id}},
            {new: true}
        );
        return Responses._200({message: 'Product created successfully', newProduct});
    }catch(error) {
        console.log(error);
        return Responses._500({message: 'Something went wrong'});
    }
};