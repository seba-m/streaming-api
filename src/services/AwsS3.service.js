const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

function deleteFile(filePath) {
	fs.unlink(filePath, function (err) {
		if (err) {
			console.error(err);
		}
	});
}

const updateImage = (source, fileName) => {
	var error = null;

	fs.readFile(source, function (err, fileData) {
		if (err) {
			error = 'File not found';
			return;
		}

		const putParams = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: fileName,
			Body: fileData
		};

		s3.putObject(putParams, function (err, data) {
			if (err) {
				error.file = "Can't upload image";
				return;
			}

			deleteFile(source);
		});
	});

	return error;
}

const getImage = (fileName, res) => {
	const getParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName
	};

	s3.getObject(getParams, function (err, data) {
		if (err) {
			return res.status(404).send("Can't find image");
		}
		
		return res.send(data.Body);
	});
}

const deleteImage = (fileName, res) => {
	var error = null;

	const getParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName
	};

	s3.deleteObject(getParams, function (err, data) {
		if (err) {
			error = "Can't delete image";
		}
	});
	
	return error;
}

exports.updateImage = updateImage;
exports.getImage = getImage;
exports.deleteImage = deleteImage;
