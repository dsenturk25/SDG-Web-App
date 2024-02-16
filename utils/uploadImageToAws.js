
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});

const s3 = new AWS.S3();


module.exports = async (imageData, bucketName, fileName) => {
    try {
        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: imageData,
          ACL: 'public-read',
          ContentType: 'image/jpeg' 
        };
    
        const data = await s3.upload(params).promise();
        console.log('Image uploaded successfully. Location:', data.Location);
        return data.Location;
      } catch (err) {
        console.error('Error uploading image:', err);
        throw err;
      }
}
