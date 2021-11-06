import Joi from "joi";

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