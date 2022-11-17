const User = require("../models/User.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { sendEmail } = require("../services/email.service");

function randomKey(length) {
	const { scryptSync, randomBytes } = require("crypto");
	const salt = randomBytes(64).toString("hex")
	const getHash = (password) => scryptSync(password, salt, length).toString("hex");

	return getHash(new Date().getTime().toString());
}

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
	User.findOne({
		$or: [
			{ userName: req.body.username },
			{ email: req.body.username }
		]
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({ message: "Failed! Username or Email is already in use!" });
			return;
		}

		next();
	});
};

exports.activateAccount = function (req, res) {

	let key = req.params.key;

	if (!key) {
		return res.status(400).send({ message: "Failed! Invalid key!" });
	}

	User.findOne({
		"activation.key": key
	}).exec((err, user) => {
		if (err) {
			return res.status(500).send({ message: err + key });
		}

		if (!user) {
			return res.status(400).send({ message: "Failed! Invalid key!" });
		}

		user.activation.key = "";
		user.activation.isVerified = true;

		user.save((err) => {
			if (err) {
				return res.status(500).send({ message: err });
			}
			let loginUrl = process.env.clientUrl + "/login";
			res.redirect(loginUrl);
			/*
			res.send(`
				<h1>Account activated!, redirecting to login page...</h1>
				<br>
				<a href='${loginUrl}'>Click here if you are not redirected</a>
				<script>window.location.href='${loginUrl}';</script>
			`);*/
		});
	});
};

exports.signup = (req, res) => {
	const user = new User({
		userName: req.body.username,
		email: req.body.email,
		birthDate: req.body.birthDate,
		password: bcrypt.hashSync(req.body.password, 8),
		key: randomKey(64),
		activation: {
			key: randomKey(10)
		}
	});

	user.save((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: err });
			return;
		}
		sendEmail(user.email, 
			"uStream - Activate Account", 
			`
				<h3> Hello ${user.userName} </h3>
				<p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
				<p>To activate your account please follow this link: <a target="_" href="${process.env.apiUrl}/api/auth/activate/${user.activation.key}">${process.env.apiUrl}/activate </a></p>
				<p>Cheers</p>
				<p>uStream Team</p>
			`);
		res.send({ message: "User was registered successfully!" });
	});
};

exports.signin = (req, res) => {

	User.findOne({
		$or: [
			{ userName: req.body.username },
			{ email: req.body.username }
		]
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

			if (!user.activation.isVerified) {
				return res.status(401).send({
					accessToken: null,
					message: "Account not verified!"
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

exports.resetPassword = (req, res) => {
	let key = req.params.key;
	let password = req.body.password;

	User.findOne({
		email: req.body.email
	}).exec((err, user) => {
		if (err) {
			return res.status(500).send({ message: err });
		}

		if (!user) {
			return res.status(400).send({ message: "Failed! Invalid email!" });
		}

		if (user.activation.key != key) {
			return res.status(400).send({ message: "Failed! Invalid key!" });
		}

		user.password = bcrypt.hashSync(password, 8);
		user.activation.key = "";
		user.save((err) => {
			if (err) {
				return res.status(500).send({ message: err });
			}

			return res.status(200).send({ message: "Password changed!" });
		}
		);
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

		user.resetPasswordToken = randomKey(64);
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

		sendEmail(user.email, 
			"uStream - Password Recovery", 
			`
				<h3> Hello ${user.userName} </h3>
				<p>It seems that you have forgotten your password. No worries, we got you covered! Just follow this link to reset your password: <a target="_" href="${process.env.apiUrl}/api/auth/reset/${user.activation.key}?key=${user.resetPasswordToken}">${process.env.apiUrl}/reset </a></p>
				<p>Cheers</p>
				<p>uStream Team</p>
			`);
		return res.status(200).send({ message: "Email sent" });
	});
};