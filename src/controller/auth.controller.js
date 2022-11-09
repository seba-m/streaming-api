const User = require("../models/User.model");

var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.email,
		pass: process.env.password
	}
});

function sendEmail(email, subject, text) {
	var mailOptions = {
		from: process.env.email,
		to: email,
		subject: subject,
		text: text
	};

	transporter.sendMail(mailOptions);
}

function generateStreamKey() {
	const { scryptSync, randomBytes } = require("crypto");
	const salt = randomBytes(64).toString("hex")
	const getHash = (password) => scryptSync(password, salt, 64).toString("hex");

	return getHash(new Date().getTime().toString());
}

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Username
	User.findOne({
		username: req.body.username
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({ message: "Failed! Username is already in use!" });
			return;
		}
	});

	// Email
	User.findOne({
		email: req.body.email
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({ message: "Failed! Email is already in use!" });
			return;
		}

		next();
	});
};

exports.signup = (req, res) => {

	const user = new User({
		userName: req.body.username,
		email: req.body.email,
		birthDate: req.body.birthDate,
		password: bcrypt.hashSync(req.body.password, 8),
		key: generateStreamKey(),
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		res.send({ message: "User was registered successfully!" });
	});
};

exports.signin = (req, res) => {
	User.findOne({
		username: req.body.username
	})
		.exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			var token = jwt.sign({ id: user.id }, process.env.secret, {
				expiresIn: 86400 // 24 hours
			});

			res.status(200).send({
				id: user._id,
				userName: user.userName,
				email: user.email,
				accessToken: token
			});
		});
};

exports.recoverPassword = function (req, res) {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			return res.status(500).send({ message: err });
		}

		if (!user) {
			return res.status(200).send({ message: "Email sent" });
		}

		sendEmail(user.email, "Password Recovery", "Your password is: " + user.password);
		return res.status(200).send({ message: "Email sent" });
	});
};