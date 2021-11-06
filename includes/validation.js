import Joi from "joi";
import response from "./response.js";
import { ResponseStatus } from "./status.js";

export const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(25).required(),
		name: Joi.string().min(3).max(50).required(),
		password: Joi.string().min(6).max(255).required(),
	});

	return schema.validate(data);
};

export const editValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(25),
		name: Joi.string().min(3).max(50),
		password: Joi.string().min(6).max(255),
	});

	return schema.validate(data);
};

export const passwordValidation = (data) => {
	const schema = Joi.object({
		password: Joi.string()
			.min(6)
			.required()
			.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	});

	return schema.validate(data);
};

export const loginValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(25).required(),
		password: Joi.string()
			.min(6)
			.required()
	});

	return schema.validate(data);
};

export const ptoEditionValidation = (data) => {
	const schema = Joi.object({
		nurse_id: Joi.string().min(3).max(25).required(),
		date: Joi.date().min(6).required(),
		status: Joi.string().required()
	});

	return schema.validate(data);
};

export const ptoReigisterValidation = (data) => {
	const schema = Joi.object({
		nurse_id: Joi.string().min(3).max(25),
		date: Joi.date().min(6),
		status: Joi.string()
	});

	return schema.validate(data);
};

export function newNurseValidation(req, res, next) {

	const schema = Joi.object({
		nurse_id: Joi.number().required(),
		name: Joi.string().min(3).required(),
		work_schedule: Joi.object({
			start: Joi.date().required(),
			end: Joi.date().required()
		}).required()
	});

	const { error } = schema.validate(req.body);
	if (!error) next();
	else res.send(new response({ status: "Error", message: error.details[0].message }));
}