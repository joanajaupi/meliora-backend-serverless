const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Responses = require('../../API_Responses');


module.exports.deleteObjectFromS3 = async (event) => {

    try {
        const bucket = 'meliora-images-bucket';
        const key = event.pathParameters.key;
        await s3.deleteObject({
            Bucket: bucket,
            Key: key
        }).promise();
        return Responses._200({message: 'Image deleted successfully'});
    }
    catch (error) {
        console.log(error);
        return Responses._500({ message: 'Something went wrong' })
    }
}