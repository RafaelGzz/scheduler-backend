import {
	editValidation
} from "../includes/validation.js";
import response from "../includes/response.js";
import Admin from "../models/admin.model.js";
import { ResponseStatus } from "../includes/status.js";

export const getAdmin = async (req, res) => {
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
		res.send(new response({ status: ResponseStatus.ERROR, message: err }))
	}
};

export const editAdmin = async (req, res) => {
	const data = req.body;
	const { error } = editValidation(data);
	if (error) {
		return res.send(
			new response({
				status: ResponseStatus.ERROR,
				message: error.details[0].message,
			})
		);
	}

	try {
		let admin = await Admin.findById(req.username._id)
		admin.name = data.name ? data.name : admin.name;
		admin.username = data.username ? data.username : admin.username;

		if (data.password && data.password != null)
			admin.password = await admin.encryptPassword(data.password);

		const savedAdmin = await admin.save()
		return res.send(
			new response({
				message: "Admin edited successfully",
			})
		)
	} catch (err) {
		console.log(err)
		return res.send(new response({ status: ResponseStatus.ERROR, message: err }))
	}
};

export const deleteAdmin = async (req, res) => {
	try {
		const deletedAdmin = await Admin.findByIdAndDelete(req.body.id).orFail();
		return res.send(new response({ data: deletedAdmin }))
	} catch (ex) {
		return res.send(new response({ status: ResponseStatus.ERROR, message: "Cannot delete admin", data: ex }))
	}
};
