const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Responses = require('../../API_Responses');

module.exports.uploadImage = async (event) => {
  try {

    if (!event.body) {
        return Responses._400({ message: 'missing the image data' });
      }
    // Parse the image data from the event body
    const imageData = JSON.parse(event.body).imageData; // Assuming JSON input
    //check the mmime type
    if(!imageData.startsWith('data:image/jpeg;base64,')) {  
        return Responses._400({ message: 'invalid image format' });
    }

    console.log(imageData);
    console.log("before upload");
    // Upload the image to S3
    const uploadParams = {
      Bucket: 'meliora-images-bucket',
      Key: `${Date.now()}.jpg`, // Customize the key as needed
      Body: Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
    console.log(uploadParams);
    await s3.upload(uploadParams).promise();

    return Responses._200(
      { 
        message: 'image uploaded successfully',
        imageLink: `https://meliora-images-bucket.s3.amazonaws.com/${uploadParams.Key}`
        
      });
  } catch (error) {
    console.log(error);
    return Responses._500({ message: 'Something went wrong'})
  }
};
