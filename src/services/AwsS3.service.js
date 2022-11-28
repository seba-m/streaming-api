const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadImage = (source, fileName) => {
	fs.readFile(source, function (err, fileData) {
		if (err) {
			return "File not found";
		}

		const putParams = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: fileName,
			Body: fileData
		};

		s3.putObject(putParams, function (err, data) {
			if (err) {
				return "Can't upload image";
			}
		});
	});
}

const getImage = (fileName, res) => {

	const getParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName,
		Expires: 900
	};

	s3.getSignedUrl("getObject", getParams, function (err, url) {
		if (err) {
			return res.status(500).json({ message: "Can't find image." });
		}
      	return res.status(200).send({data: url});  
	})

	/*s3.getObject(getParams, function (err, data) {
		if (err) {
			return res.status(500).json({ message: "Can't find image." });
		}

		res.attachment(fileName);
      	res.type(data.ContentType); 
      	return res.send(data.Body);  
	});*/
}

const deleteImage = (fileName) => {
	const getParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName
	};

	s3.deleteObject(getParams, function (err, data) {
		if (err) {
			return "Can't delete image";
		}
	});
}

exports.uploadImage = uploadImage;
exports.getImage = getImage;
exports.deleteImage = deleteImage;
