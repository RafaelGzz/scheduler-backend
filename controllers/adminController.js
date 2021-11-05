import {
	registerValidation,
	passwordValidation,
} from "../includes/validation.js";
import response from "../includes/response.js";
import Admin from "../models/admin.model.js";

export const getUser = async (req, res) => {
	try {
		const admin = await Admin.findById(req.username)
		res.send(
			new response({
				data: {
					user: {
						username: admin.username,
						name: admin.name,
						password: admin.password,
						requests: admin.requests,
					},
				},
			})
		)
	} catch (err) {
		res.send(new response({ status: "Error", message: err }))
	}
};

export const editUser = async (req, res) => {
	const data = req.body;
	const { error } = registerValidation(data);

	if (error)
		return res.send(
			new response({
				status: "Error",
				message: error.details[0].message,
			})
		);

	if (data.password !== null) {
		const { error } = passwordValidation({ password: data.password });
		if (error)
			return res.send(
				new response({
					status: "Error",
					message: error.details[0].message,
				})
			);
	}

	try {
		let admin = await Admin.findById(req.username)
		admin.name = data.name ? data.name : admin.name;
		admin.username = data.username ? data.username : admin.username;

		if (data.password !== null && data.password !== admin.password)
			admin.password = await admin.encryptPassword(data.password);

		const response = await admin.save()
		return res.send(
			new response({
				message: "User edited successfully",
			})
		)
	} catch (err){
		return res.send(new response({ status: "Error", message: err }))
	}
};

export const getNurses = async (req, res) => {
	res.send(new response({ message: "none" }))
};

export const changeRequestStatus = async (req, res) => {
	const { status } = req.body;

	try {
		let edited = false
		let admin = await Admin.findById(req.username);
		let requests = admin.requests;
		for (let i = 0; i < requests.lenght; i++) {
			if (parseInt(requests[i].nurse_id) === parseInt(req.params.id)) {
				requests[i].status = status;
				edited = true;
			}
		}

		if (!edited)
			return res.send(
				new response({
					status: "Error",
					message:
						"No task with id:" + req.params.id + " was found",
				})
			);

		admin.requests = requests;
		admin.markModified("requests");
		const response = await admin.save();
		res.send(
			new response({
				message: "Request status updated successfully",
			})
		)

		// TODO: edit from nurse
	} catch (err) {
		res
			.send(new response({ status: "Error", message: err }))
	}

}
