
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

const s3 = new S3Client({

  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.REGION
})

const uploadImageToAws = async (imageData, fileName, fileMimetype) => {
    try {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: imageData,
          ContentType: fileMimetype
        };
    
        const command = new PutObjectCommand(params);
        const data = await s3.send(command);

        return data
      } catch (err) {
        console.error('Error uploading image:', err);
        throw err;
      }
}

const retrieveImageFromImageName = async (imageName) => {
  
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageName
  }

  const command = new GetObjectCommand(params);
  const url = getSignedUrl(s3, command, {expiresIn: 3600});
  return url;
}

module.exports = { uploadImageToAws, retrieveImageFromImageName };
