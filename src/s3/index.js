const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

async function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `fileupload/scanskill-${Date.now()}-${file.name}`,
    Body: file.data,
    ACL: "public-read",
  };
  const data = await s3.upload(params).promise();
  return data.Location;
}

module.exports = {
  uploadFile,
  s3,
};
