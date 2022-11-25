const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const updateImage = (source, fileName, res) => {
	fs.readFile(source, function (err, fileData) {
		if (!err) {
			const putParams = {
				Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
				Body: fileData
			};
			s3.putObject(putParams, function (err, data) {
				if (err) {
                    return res.status(400).send("Can't upload image");
				}
				else {
					fs.unlink(source);
				}
			});
		}
		else {
            return res.status(400).send("Can't upload image");
		}
	});
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
		else {
			return res.send(data.Body);
		}
	});
}

const deleteImage = (fileName, res) => {
    const getParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
    };

    s3.deleteObject(getParams, function (err, data) {
        if (err) {
            return res.status(400).send("Can't delete image");
        }
    });
}

exports.updateImage = updateImage;
exports.getImage = getImage;
exports.deleteImage = deleteImage;
