const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

async function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `avatars/${Date.now()}-${file.name}`,
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
